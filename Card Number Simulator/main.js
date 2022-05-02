const inputCard = document.querySelector(".card__inputCard")
const inputDate = document.querySelector(".card__inputDate")
const inputCVV = document.querySelector(".card__inputCVV")

const maskNumber = "####-####-####-####"
const maskDate = "##/##"
const maskCVV = "###"

let current = ""
let cardNumber = []
let dateNumber = []
let cvvNumber = []

inputCard.addEventListener('keydown', (e) => {
    if (e.key == 'Tab') {
        return;
    }
    e.preventDefault()
    handlerInput(maskNumber, e.key, cardNumber)
    inputCard.value = cardNumber.join("");

})

inputDate.addEventListener('keydown', (e) => {
    if (e.key == 'Tab') {
        return;
    }
    e.preventDefault()
    handlerInput(maskDate, e.key, dateNumber)
    inputDate.value = dateNumber.join("");

})

inputCVV.addEventListener('keydown', (e) => {
    if (e.key == 'Tab') {
        return;
    }
    e.preventDefault()
    handlerInput(maskCVV, e.key, cvvNumber)
    inputCVV.value = cvvNumber.join("");

})

function handlerInput(mask, key, arr) {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    if (key == 'Backspace' && arr.length > 0 ) {
        arr.pop()
        return
    }
    if (numbers.includes(key) && arr.length + 1 <= mask.length) {
        if (mask[arr.length] == '-' || mask[arr.length] == '/'){
            arr.push(mask[arr.length], key)
        } else{
            arr.push(key)
        }
    }
}