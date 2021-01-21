var filename = "Louis's PDF Editor";
var converter = new showdown.Converter({
  tables: true,
  strikethrough: true,
  emoji: true,
  tasklists: true,
  simplifiedAutoLink: true,
  ghMentionsLink: "https://github.com/{u}",
  blockquotes: true,
  ghCodeBlocks: true,
  ghMentions: true,
});
var Range = ace.require('ace/range').Range
console.log(new Range(0, 1, 0, 5))
var editor = ace.edit("text-input");
editor.setTheme("ace/theme/github");
editor.session.setMode("ace/mode/markdown");

function update() {
  const text = editor.getValue(),
    html = converter.makeHtml(text);
  document.getElementById("result").innerHTML = html;
}
update()

document.getElementById('text-input').addEventListener('input', update)

function updateName() {
  const el = document.getElementById("filename-input");
  let newValue = el.innerText;
  if (el.innerText.endsWith(".md")) {
    newValue = el.innerText.substring(0, el.innerText.length - 3);
  }
  if (newValue === "") {
    el.innerHTML =
      "Filename" + '<span class="text-muted user-select-none">.md</span>';
    newValue = "Filename";
  }
  filename = newValue;
  document.getElementById("filename-output").innerHTML =
    newValue + '<span class="text-muted user-select-none">.html</span>';
}

var zip = new JSZip();

function downloadHTML() {
  const a = document.createElement("a");
  a.setAttribute(
    "download",
    document.getElementById("filename-output").innerText
  );
  a.setAttribute(
    "href",
    `data:text/html,${document.getElementById("result").innerHTML}`
  );
  a.setAttribute("target", "_blank");
  a.click();
}

function downloadPDF() {
  const doc = new jsPDF();
  doc.fromHTML(document.getElementById("result"), 15, 15);
  doc.save(`${filename}.pdf`);
}

function downloadMD() {
  const a = document.createElement("a");
  a.setAttribute(
    "download",
    document.getElementById("filename-input").innerText
  );
  a.setAttribute("href", `data:text/plain,${editor.getValue()}`);
  a.setAttribute("target", "_blank");
  a.click();
}

function downloadAll() {
  zip.file(`${filename}.md`, `${editor.getValue()}`);

  const doc = new jsPDF();
  doc.fromHTML(document.getElementById("result"), 15, 15);

  zip.file(`${filename}.pdf`, doc.output("blob"));

  zip.file(
    `${filename}-unstyled.html`,
    `${document.getElementById("result").innerHTML}`
  );

  zip.generateAsync({ type: "blob" }).then(function (content) {
    // see FileSaver.js
    saveAs(content, `${filename}.zip`);
  });
}

function lintMD() {
  let errorPoints = 0,
    warningPoints = 0;
  const textToLint = editor.getValue();
  const lintingResults = markdownlint.sync({ strings: { textToLint } });
  const values = lintingResults.textToLint;
  document.getElementById("toasts").innerHTML = "";
  annotations = []
  editor.session.addMarker(new ace.require('ace/range').Range(0, 1, 0, 5), 'classname', 'type')
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length; j++) {
      const error = values[j];
      console.log(error);
      error.errorContext ? errorPoints++ : warningPoints++;
      annotations.push({
          row: error.lineNumber - 1,
          column: error.errorRange ? error.errorRange : 0,
          text: error.ruleDescription,
          type: 'error'
      })
      document.getElementById("toasts").insertAdjacentHTML(
        "beforeend",
        `
            <div class="toast" data-autohide="false" data-animation="false">
                    <div class="toast-header">
                    <strong class="mr-auto"> 
                        ${
                          error.errorContext
                            ? '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>'
                            : '<svg width="1.0625em" height="1em" viewBox="0 0 17 16" class="bi bi-exclamation-triangle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/><path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg>'
                        }
                        ${error.ruleDescription}
                        <small>[<a title="${
                          error.ruleNames[1]
                        }" data-toggle="tooltip" target="_blank" href="${
          error.ruleInformation
        }">${error.ruleNames[0]}</a>]</small>
                    </strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    ${error.errorDetail ? '<div class="toast-body">' : ""}
                        ${error.errorDetail ? error.errorDetail : ""}
                    ${error.errorDetail ? "</div>" : ""}
                </div>
            `
      );
    }
  }
  editor.getSession().setAnnotations(annotations)
  $(".toast").toast(show ? "show" : "hide");
  $('[data-toggle="tooltip"]').tooltip();
  document.getElementById("bell-thing").innerHTML =
    errorPoints + warningPoints === 0
      ? '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bell" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"/><path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/></svg>'
      : '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/></svg>';

  const nothing =
    errorPoints + warningPoints > 0
      ? document
          .querySelectorAll(".download-button")
          .forEach((el) => el.classList.replace("btn-success", "btn-primary"))
      : document
          .querySelectorAll(".download-button")
          .forEach((el) => el.classList.replace("btn-primary", "btn-success"));
  document.getElementById("errors").innerText = errorPoints;
  document.getElementById("warnings").innerText = warningPoints;
}

/* Init */

$(document).ready(function () {
  $(".toast").toast("show");
  $('[data-toggle="tooltip"]').tooltip();
});

var sidebarVisible = true;
$('.sidebarToggle').on('click', (evt) => {
  
  switch (evt.target.id) {
    case 'sidebarClick':
      sidebarVisible = !sidebarVisible;
      document.getElementById('sidebar').style.display = (sidebarVisible ? 'block' : 'none')
      break;
    case 'examplesClick':
      sidebarVisible = true;
      console.log('click')
      $('#v-pills-messages').tab('show')
      break;
    default:
      break;
  }
})