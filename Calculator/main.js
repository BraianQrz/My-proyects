console.log("sync")

const calculator_key_box = document.querySelector(".caculator-keys")
const screen = document.querySelector(".display")

const calculator_keys = [[["^"], ["R"], ["C"], ["/"]],
[["7"], ["8"], ["9"], ["x"]],
[["4"], ["5"], ["6"], ["-"]],
[["1"], ["2"], ["3"], ["+"]],
[["0"], ["%"], ["="]]

]

renderKeys()

/**
 * Esta funcion renderiza los datos almacenados dentro del array calculator_keys para transformarlo en codigo html 
 * visible en el navegador
 */
function renderKeys() {

    let codeHtml = calculator_keys.map((e) => {
        let secCodeHtml = e.map((key) => {
            if (key != "x" && key != "-" && key != "/" && key != "+" && key != "=" && key != "C" && key !="R") {
                return `<div class="col-3 mt-3 ">
                    <button data-id="${key}" id="key-number" class="btn btn-lg  btn-dark text-center">${key}</button>
                    </div>
                `
            } else if (key == "=") {
                return `<div class="col-6 mt-3 ">
                <button data-id="${key}" id="key-result" class="btn btn-lg  btn-primary w-75 text-center">${key}</button>
                </div>
            `
            }
            else if (key == "R") {
                return `<div class="col-3 mt-3 ">
                <button data-id="${key}" id="key-operator-r" class="btn btn-lg btn-dark w-75 text-center">${key}</button>
                </div>
            `
            }
            else if (key == "C") {
                return `<div class="col-3 mt-3 ">
                <button data-id="${key}" id="key-C" class="btn btn-lg  btn-danger w-75 text-center">${key}</button>
                </div>
            `
            } else {
                return `<div class="col-3 mt-3 ">
                <button data-id="${key}" id="key-operator"  class="btn btn-lg btn-dark text-center">${key}</button>
                </div>
            `
            }
        })
        let row_container = `<div class="row text-center">
        ${secCodeHtml.join("")}</div>`

        return row_container
    }
    )
    calculator_key_box.innerHTML = codeHtml.join("")
    handlerButtons()
}


/**
 * Esta función otorga funcionalidades a cada uno de los botones en nuestra calculadora
 */
function handlerButtons() {
    const btns = document.querySelectorAll("button")
    let primerTermino = null
    let segundoTermino = null
    let operador = null
    let resultado = null


    btns.forEach((e) => {
        e.addEventListener("click", () => {
            if (e.getAttribute("id") == "key-number") {
                if (resultado != null) {
                    clear()
                    resultado = null
                    console.log("-----Nueva operación-----")
                    screen.innerHTML += e.getAttribute("data-id")
                } else {
                    screen.innerHTML += e.getAttribute("data-id")
                }
            }
            else if (e.getAttribute("id") == "key-C") {
                primerTermino = null
                segundoTermino = null
                operador = null
                resultado = null
                clear()
            }
            else if (e.getAttribute("id") == "key-operator-r") {
                primerTermino = Number(screen.textContent)
                console.log(Math.sqrt(4))
                console.log(e.getAttribute("data-id"))
                resultado = resolver(e.getAttribute("data-id"),primerTermino,null )
                screen.innerHTML = resultado 
            }
            else if (e.getAttribute("id") == "key-operator") {
                primerTermino = Number(screen.textContent)
                operador = e.getAttribute("data-id")
                clear()
                console.log("Primer termino: ", primerTermino)
                console.log("Tipo de operacion: ", operador)

            } else if (e.getAttribute("id") == "key-result") {
                if (primerTermino != "" && operador != "") {
                    segundoTermino = Number(screen.textContent)
                    console.log("Segundo termino: ", segundoTermino)
                    resultado = resolver(operador, primerTermino, segundoTermino)
                    screen.innerHTML = resultado
                    console.log("El resultado de la operación es: ", resultado)
                }

            }
        }
        )
    })

}


/**
 * 
 * @param {String} operador Este parametro recibe el operador matemático 
 * @param {Number} par1 Este parametro recibe el primer numero/componente
 * @param {Number or Null} par2 Este parametro recibe el segundo numero/componente o un valor nulo en el caso de que se trate de operaciones especiales como "Raiz"
 * @returns {Number} Retorna el resultado de la operacion
 */
function resolver(operador, par1, par2) {

    switch (operador) {

        case "+":
            return sumar(par1, par2)
            break;
        case "-":
            return restar(par1, par2)
            break;
        case "x":
            return multiplicar(par1, par2)
            break;
        case "^":
            return potenciar(par1, par2)
            break;
        case "/":
            return dividir(par1, par2)
            break;
        case "R":
            return raiz(par1)
            break;

    }


}

/**
 * 
 * @param {Number} a Corresponde al primer sumando
 * @param {Number} b Corresponde al segundo sumando
 * @returns {Number} Retorna el resutado de la suma
 */
function sumar(a, b) {
    return a + b
}

/**
 * 
 * @param {Number} a Corresponde al minuendo
 * @param {Number} b Corresponde al sustraendo
 * @returns {Number} Retorna la diferencia
 */
function restar(a, b) {
    return a - b
}

/**
 * 
 * @param {Number} a Corresponde al multiplicando
 * @param {Number} b Corresponde al multiplicador
 * @returns {Number} Retorna el producto
 */
function multiplicar(a, b) {
    return a * b
}

/**
 * 
 * @param {Number} a Corresponde al dividendo
 * @param {Number} b Corresponde al divisor
 * @returns {Number} Retorna el cociente
 */
function dividir(a, b) {
    if (b != 0) {
        return a / b
    } else {
        return screen.innerHTML = "DIV ERROR"
    }
}

/**
 * 
 * @param {Number} a Corresponde a la base
 * @param {Number} b Corresponde al exponente
 * @returns {Number} Retorna la potencia
 */
function potenciar(a, b) {
    return a * b
}

/**
 * 
 * @param {Number} a Corresponde al radicando
 * @returns {Number} Retorna la raiz cuadrática de radicando
 */
function raiz(a) {
    return Math.sqrt(a)
}

/**
 * Esta funcion permite limpiar la pantalla de interaccion
 */
function clear() {
    screen.innerHTML = ""
}