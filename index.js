const $editor = document.getElementById("edit"), $result = document.getElementById("result");
const $scroll = document.getElementsByClassName("scroll")[0];

function updateLineCount() {
    let lineString = "1.<br>", lineCount = $editor.innerText.split(/\n{1}/g)
    for (let i = 2; i < lineCount.length; i++) {
        const element = lineCount[i];
        lineString += i+".<br>";
    }
    document.getElementById("lines").innerHTML = lineString;
}

function renderMarkdownPreview() {
    let text = $editor.innerText;
    
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        text = text.replace(rule.pattern, rule.replacement)
    }
    
    
    $result.innerHTML = text;
}

$editor.addEventListener("keyup", (event) => {

    renderMarkdownPreview()
    updateLineCount()
})

updateLineCount()
renderMarkdownPreview()

$scroll.onscroll = function (event) {
    $result.scrollTop = $result.scrollHeight / (event.srcElement.scrollHeight / event.srcElement.scrollTop);
}