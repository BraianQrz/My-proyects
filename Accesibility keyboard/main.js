console.log("sync")


const keys = [
    [["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "&"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], ["'", "?"], ["¿", "¡"]], //row 1
    [["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["´", "¨"], ["+", "*"]], //row 2
    [["MAYUS", "MAYUS"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["ñ", "Ñ"], ["{", "["], ["}", "]"]], //row 3
    [["SHIFT", "SHIFT"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"]], //row 4
    [["SPACE", "SPACE"]] //row 5
]

let mayus = false
let shift = false
let current = null

renderKeyboard()

function renderKeyboard() {
    const keyboard = document.querySelector(".keyboard")
    let empty = `<div class="empty"></div>`
    const layers = keys.map((layer, i) => {
        return layer.map((key) => {
            if (key[0] === "SHIFT") {
                return `<button class="key btn btn-dark mb-3 me-3 mt-3 key-shift">${key[0]}</button>`
            }
            if (key[0] === "MAYUS") {
                return `<button class="key btn btn-dark mb-3 me-3 mt-3 key key-bloqMayus">${key[0]}</button>`
            }
            if (key[0] === "SPACE") {
                return `<button class="key btn btn-dark mb-3 mt-3 key-space">${key[0]}</button>`
            }
            return `<button class="key btn btn-dark mb-3 mt-3 me-3">
                    ${shift
                    ? key[1]
                    : mayus &&
                        key[0].toLowerCase().charCodeAt(0) >= 97 &&
                        key[0].toLowerCase().charCodeAt(0) <= 122
                        ? key[1]
                        : key[0]
                }
                </button>`
        })
    })

    layers[0].push(empty)
    layers[1].unshift(empty)

    const htmlLayers = layers.map((layer) => {
        return layer.join("")
    })

    keyboard.innerHTML = ""

    htmlLayers.forEach((layer) => {
        keyboard.innerHTML += `<div class="layer">${layer}</div>`
    })


    const allKeys = document.querySelectorAll(".key")

    allKeys.forEach((key) => {
        key.addEventListener("click", () => {
            if (current) {
                if (key.textContent === "SHIFT") {
                    shift = !shift
                    renderKeyboard()
                } else if (key.textContent === "MAYUS") {
                    mayus = !mayus
                    renderKeyboard()
                } else if (key.textContent === "SPACE") {
                    current.value += " "
                } else {
                    current.value += key.textContent.trim()
                    if (shift) {
                        shift = false
                        renderKeyboard()
                    }
                }
                current.focus()
            }
        })
    })
    const keyboardScreen = document.querySelectorAll("input")

    keyboardScreen.forEach((input) => {
        input.addEventListener("focusin", (e) => {
            current = e.target;
        })
    })
}