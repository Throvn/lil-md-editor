const rules = [
    {
        name: "Block quote",
        pattern: /> ?((\w|\d|=| |>|<|-{0,2}|{|}|\[|\]|\(|\)|"|'|\/|=|\.|:|;){0,})\n/g,
        replacement: "<div class='quote'>$1</div>"
    },
    {
        name: "H6",
        pattern: /#{6} ((\w|\d|=| |-{0,2}|>|<|{|}|\[|\]|\(|\)|"|'|\/|=|\.|:|\\|`)+)\n/g,
        replacement: "<h6>$1</h6>"
    },
    {
        name: "H5",
        pattern: /#{5} ((\w|\d|=| |-{0,2}|>|<|{|}|\[|\]|\(|\)|"|'|\/|=|\.|:|\\|`)+)\n/g,
        replacement:  "<h5>$1</h5>"
    },
    {
        name: "H4",
        pattern: /#{4} ((\w|\d|=| |-{0,2}|>|<|{|}|\[|\]|\(|\)|"|'|\/|=|\.|:|\\|`)+)\n/g,
        replacement: "<h4>$1</h4>"
    },
    {
        name: "H3",
        pattern: /#{3} ((\w|\d|=| |-{0,2}|>|<|{|}|\[|\]|\(|\)|"|'|\/|=|\.|:|\\|`)+)\n/g,
        replacement: "<h3>$1</h3>"
    },
    {
        name: "H2",
        pattern: /#{2} ((\w|\d|=| |-{0,2}|>|<|{|}|\[|\]|\(|\)|"|'|\/|=|\.|:|\\|`)+)\n/g,
        replacement: "<h2>$1</h2>"
    },
    {
        name: "H1",
        pattern: /# ((\w|\d|=| |-{0,2}|>|<|{|}|\[|\]|\(|\)|"|'|\/|=|\.|:|\\|`)+)\n/g,
        replacement: "<h1>$1</h1>"
    },
    {
        name: "Line breaks",
        pattern: /\n+/g,
        replacement: "<br>"
    },
    {
        name: "Images with title",
        pattern: /\!\[((\w| )+)\]\((https?\:\/{2}(\w|\.|\/|\d|-|#|&|\?|=)+) +"(([0-9a-zA-Z]| |!|\?|#|=)+)" {0,}\)/g,
        replacement:  "<img src='$3' title='$5' alt='$1' height='30%'>"
    },
    {
        name: "Images",
        pattern: /\!\[((\w| )+)\]\((https?\:\/{2}(\w|\.|\/|\d|-|#|&|\?|=)+)\)/g,
        replacement: "<img src='$3' alt='$1' height='30%'>"
    },
    {
        name: "Links",
        pattern: /\[\\?((\w| )+)\]\((https?\:\/{2}(\w|\.|\/|\d|-|#|\?|=|&)+)\)/g,
        replacement: "<a href='$3'>$1</a>"
    },
    {
        name: "Links with title",
        pattern: /\[((\w| )+)\]\((https?\:\/{2}(\w|\.|\/|\d|-|#|&)+) +"(([0-9a-zA-Z]| |!|\?|=)+)" {0,}\)/g,
        replacement: "<a href='$3'>$5</a>"
    },
    {
        name: "Horizontal line",
        pattern: /(-{3,}|_{3,}|\*{3,})<br>/g,
        replacement:  "<hr>"
    },
    {
        name: "Bold",
        pattern: /(\_{2}|\*{2})((\w| |\(|\)|\[|\]|\/|\.|\,|\:|<|>|=|"|'|#)+)(\_{2}|\*{2})/g,
        replacement: "<b>$2</b>"
    },
    {
        name: "Italic",
        pattern: /(\_{1}|\*{1})((\w| |\(|\)|\[|\]|\/|\.|\,|\:|#)+)(\_{1}|\*{1})/g,
        replacement: "<em>$2</em>"
    },
    {
        name: "Strikethrough",
        pattern: /\~{2}((\w| |\(|\)|\[|\]|\/|\.|\,|\:|#)+)\~{2}/g,
        replacement: "<strike>$1</strike>"
    },
    {
        name: "Marked",
        pattern: /==((\w|\d|=| |-{0,2}|>|<|{|}|\[|\]|\(|\)|"|'|\/|=|\.|:)+)==/g,
        replacement: "<mark>$1</mark>"
    },
    {
        name: "Insert",
        pattern: /\+{2}((\w|\d|=| |-{0,2}|>|<|{|}|\[|\]|\(|\)|"|'|\/|=|\.|:)+)\+{2}<br>/,
        replacement: "<ins>$1</ins><br>"
    },
    {
        name: "Code block",
        pattern: /`{3}(\w| ){0,}<br>(.*?)`{3}/g,
        replacement: "<pre class='code-block'><code>$2</code></pre>"
    },
    {
        name: "Inline code",
        pattern: /`(.*?)`/g,
        replacement: "<span class='code-inline'>$1</span>"
    },
    {
        name: "Copyright",
        pattern: /\((c|C)\)/g,
        replacement: "©"
    },
    {
        name: "R thing",
        pattern: /\((r|R)\)/g,
        replacement:  "®"
    },
    {
        name: "Trademark",
        pattern: /\((tm|TM)\)/g,
        replacement: "™"
    },
    {
        name: "Paragraph",
        pattern: /\((p|P)\)/g,
        replacement: "§"
    },
    {
        name: "Plus minus",
        pattern: /\+-/g,
        replacement: "±"
    },
    {
        name: "---",
        pattern: /---/g,
        replacement: "—"
    },
    {
        name: "--",
        pattern: /--/g,
        replacement: "–"
    },
    {
        name: ",",
        pattern: /,,/g,
        replacement: ","
    },
    {
        name: "???",
        pattern: /\?{3,}/g,
        replacement: "???"
    },
    {
        name: "!!!",
        pattern: /!{3,}/g,
        replacement: "!!!"
    },
    {
        name: "?..",
        pattern: /\?\.{3,}/g,
        replacement: "?.."
    },
    {
        name: "!..",
        pattern: /\!\.{3,}/g,
        replacement: "!.."
    },
    {
        name: "...",
        pattern: /\.{2,}/g,
        replacement: "…"
    },
    {
        name: "Autoconvert link",
        pattern: /(https?:\/\/(\w|\d|\.|-|\/|#|\?|=|&)+) /g,
        replacement: "<a href='$1'>$1</a> "
    },
    {
        name: "Autoconvert link with linebreak",
        pattern: /(https?:\/\/(\w|\d|\.|-|\/|#|\?|=|&)+)<br>/g,
        replacement: "<a href='$1'>$1</a><br>"
    },
]