console.log("sync")

const button_action = document.querySelector(".btn")
const number_container = document.querySelector(".number-container")

button_action.addEventListener("click", ()=>{
    let random_number = generateNumb()

    number_container.innerHTML = random_number
})



/**
 * 
 * @returns {Number} This function returns one number 1-99
 */
function generateNumb(){
    let num = Math.floor(Math.random()*99 + 1)
    return num
}