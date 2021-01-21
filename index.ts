const $editor = document.getElementById("edit"), 
      $result = document.getElementById("result");
const $scroll = (<HTMLDivElement>document.getElementsByClassName("scroll")[0]);

/**
 * Updates the numbers on the left side of the editor
 */
function updateLineCount() {
    let lineString = "1.<br>", lineCount = $editor.innerText.split(/\n{1}/g)
    for (let i = 2; i < lineCount.length; i++) {
        lineString += i+".<br>";
    }
    document.getElementById("lines").innerHTML = lineString;
}

/**
 * Renders the parsed markdown to the DOM
 */
function renderMarkdownPreview() {
    let text = $editor.innerText;
    
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        text = text.replace(rule.pattern, rule.replacement)
    }
    
    $result.innerHTML = text;
}

// Listen for changes
$editor.addEventListener("keyup", (event) => {
    renderMarkdownPreview()
    updateLineCount()
})

// initialize editor
updateLineCount()
renderMarkdownPreview()

// Handles the scrolling that the preview is in the same viewport as the editor
$scroll.onscroll = function (event) {
    const src = <HTMLDivElement> event.srcElement
    $result.scrollTop = $result.scrollHeight / (src.scrollHeight / src.scrollTop);
}