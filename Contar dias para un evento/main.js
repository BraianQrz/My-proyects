let events = []
let arr = []

const eventName = document.querySelector("#eventName")
const eventDate = document.querySelector("#eventDate")
const addButton = document.querySelector("#bAdd")
const eventsContainer = document.querySelector(".eventsContainer")
const form = document.querySelector("form")


form.addEventListener("submit", e => {
    e.preventDefault("")
    addEvent()
})


/**
 * This function creates a new event, adds it in an array, and starts the renderization 
 * @returns {none}
 */
function addEvent() {
    if (eventName.value == "" || eventDate.value == "") {
        return
    }
    if (dateDiff(eventDate.value) < 0) {
        return
    }
    const newEvent = {
        id: (Math.random() * 10 ** 17),
        name: eventName.value,
        date: eventDate.value,
    }
    events.unshift(newEvent)
    eventName.value = ""
    renderEvents()
}



/**
 * This function calculates the days left for an event 
 * @param {String} date Is a target date
 * @returns {Number} daysLeft ==> Are the days left for an event
 */
function dateDiff(date) {
    const targetDate = new Date(date)
    const today = new Date()

    const diff = targetDate.getTime() - today.getTime()
    const daysLeft = Math.ceil(diff / 1000 / 3600 / 24)
    console.log(typeof (daysLeft))
    return daysLeft;

}

/**
 * This function transforms array data to code HTML
 * @returns {none}
 */
function renderEvents() {
    const codeHTML = events.map(e => {
        return `
            <div class="container-sm event mb-3">
            <div class="row align-items-center">
                <div class="col-3 d-flex align-items-center days">
                    <span class="days-number ">Faltan ${dateDiff(e.date)}</span>
                    <span class="">Días</span>
                </div>
                <div class="col-3 d-flex align-items-center event-name">${e.name}</div>
                <div class="col-3 d-flex align-items-center event-date">${e.date}</div>
                <div class="col-3 d-flex align-items-center actions">
                    <button class=" btn btn-danger erase-btn rounder" data-id="${e.id}">Eliminar</button>
                <div>
                </div>
            </div>
            `
    })

    eventsContainer.innerHTML = codeHTML.join("")
    const buttonDel = document.querySelectorAll(".erase-btn")

    buttonDel.forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = button.getAttribute("data-id")
            events = events.filter((ev) => ev.id != id)

            renderEvents()
        })
    })
}

