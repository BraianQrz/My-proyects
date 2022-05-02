console.log("sync")

let timer = 0
let totalTime = 0
let countTasks = 0
const tasks = []
const tasksOrd0 = []
const tasksOrd1 = []
const tasksOrd2 = []
const tasksOrd3 = []
let reloadTime = setInterval(() => {
  if (tasks.length > 0) {
    statistics__p[3].innerHTML = `${parseInt(totalTime / 60)}min`
  } else {
    statistics__p[3].innerHTML = `0min`
  }

}, 1000)

const tablesTask = document.querySelectorAll(".table_task")
const itTask = document.querySelector(".form_itTask")
const form = document.querySelector(".form")
const list = document.querySelector(".list")
const time = document.querySelector(".time_value")
const taskName = document.querySelector(".time_taskName")
const select_import = document.querySelector(".select-import")
const select_urg = document.querySelector(".select-urg")
const quadrant_data = document.querySelectorAll(".quadrant_data")

const statistics__p = document.querySelectorAll(".statistics__p-principal")


let timeMin = null
renderTime(timer)

function renderTime(t) {
  let minutes = parseInt(t / 60)
  let seconds = parseInt(t % 60)

  time.textContent = `${minutes < 10 ? "0" : ""}${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`
}

form.addEventListener("submit", (e) => {
  e.preventDefault("")
  if (itTask.value != "" && select_import.value != "Importancia" && select_urg.value != "Urgencia") {
    addTask(itTask.value, select_import.value, select_urg.value)
  } else {
    alert("Complete todos los datos")
  }
  itTask.value = ""
  select_import.value = "Importancia"
  select_urg.value = "Urgencia"
  runStatistics()
}
)
function addTask(value, imp, urg) {
  const newTask = {
    tittle: value,
    id: ((Math.random()) * 10 ** 17),
    status: false,
    important: imp,
    urgent: urg,
  }
  tasks.unshift(newTask)
  renderTask()
}


function renderTask() {
  tasksOrd0.splice(0, tasksOrd0.length)
  tasksOrd1.splice(0, tasksOrd1.length)
  tasksOrd2.splice(0, tasksOrd2.length)
  tasksOrd3.splice(0, tasksOrd3.length)
  tasks.forEach((task) => {
    if (task.important == "Es importante" && task.urgent == "Es urgente") {
      tasksOrd0.unshift(task)
    }
    else if (task.important == "Es importante" && task.urgent == "Es menos urgente") {
      tasksOrd1.unshift(task)
    }
    else if (task.important == "Es menos importante" && task.urgent == "Es urgente") {
      tasksOrd2.unshift(task)
    }
    else if (task.important == "Es menos importante" && task.urgent == "Es menos urgente") {
      tasksOrd3.unshift(task)
    }
  })

  const htmlOrd0 = tasksOrd0.map((t) => {
    return toCode(t)
  })
  const htmlOrd1 = tasksOrd1.map((t) => {
    return toCode(t)
  })
  const htmlOrd2 = tasksOrd2.map((t) => {
    return toCode(t)
  })
  const htmlOrd3 = tasksOrd3.map((t) => {
    return toCode(t)
  })
  tablesTask[0].innerHTML = htmlOrd0.join("")
  tablesTask[1].innerHTML = htmlOrd1.join("")
  tablesTask[2].innerHTML = htmlOrd2.join("")
  tablesTask[3].innerHTML = htmlOrd3.join("")

  function toCode(task) {
    return `
                    <div class="tarea">
                        <div class="tarea-titulo">${task.status ? `<p><s>${task.tittle}</s></p>` : task.tittle}</div>
                        <div class="tarea-condicion">
                        ${task.status
        ? '<span class="tarea-span"><i class="fa-solid fa-check"></i></span>'
        : `<button data-id=${task.id} class="button"><i class="fa fa-play"></i></button>`}
                        </div>
                    </div>
                    `}

  handlerButton()

}

function handlerButton() {
  let btns = document.querySelectorAll(".button")
  btns.forEach((i) => {
    i.addEventListener("click", () => {
      const id = i.getAttribute("data-id")
      const index = tasks.findIndex((id) => tasks.id = id)
      if (timeMin == null) {
        taskName.innerHTML = tasks[index].tittle
        i.innerText = "⌛"
        startTask(id)
      } else { "" }
    })
  }
  )
}
function startTask(id) {
  timer = 5
  timeMin = setInterval(() => {
    if (timer > 0) {
      renderTime(timer)
      timer--
      totalTime++
    } else {
      renderTime(timer)
      completedTask()
      renderTask()
      runStatistics()
      startBreak()

    }
  }
    , 1000)
}
function startBreak() {
  if (countTasks % 4 == 0 && countTasks > 0) {
    timer = 25
  } else {
    timer = 5
  }
  clearInterval(timeMin)
  taskName.innerHTML = "Break"
  timeMin = setInterval(() => {
    if (timer > 0) {
      renderTime(timer)
      timer--
      totalTime++
    } else {
      renderTime(timer)
      taskName.innerHTML = ""
      clearInterval(timeMin)
      timeMin = null
      countTasks++
    }
  }, 1000)
}
function completedTask(id) {
  const index = tasks.findIndex((id) => tasks.id == id)
  tasks[index].status = true
}


/* -------------------- Statistics -------------------- */

function runStatistics() {
  statistics__p[0].innerHTML = tasks.length
  let tasks_Completed = 0
  let tasks_Uncompleted = 0
  tasks.forEach((e) => {
    if (e.status == true) {
      tasks_Completed++
    } else {
      tasks_Uncompleted++
    }
  })
  statistics__p[0].innerHTML = tasks.length
  statistics__p[1].innerHTML = `${(tasks_Completed * 100 / tasks.length).toFixed(2)}%`
  statistics__p[2].innerHTML = tasks_Completed
  warningAndMessages(tasks_Uncompleted, tasks_Completed)
  runAreaStatistics()

}

function runAreaStatistics() {
  quadrant_data[0].innerHTML = tasksOrd0.length
  quadrant_data[1].innerHTML = tasksOrd1.length
  quadrant_data[2].innerHTML = tasksOrd2.length
  quadrant_data[3].innerHTML = tasksOrd3.length

  effArea(tasksOrd0, 4)
  effArea(tasksOrd1, 5)
  effArea(tasksOrd2, 6)
  effArea(tasksOrd3, 7)

  completedArea(tasksOrd0, 8)
  completedArea(tasksOrd1, 9)
  completedArea(tasksOrd2, 10)
  completedArea(tasksOrd3, 11)
}
function effArea(taskArr, orderQuadrant_data) {
  let complete = 0
  taskArr.forEach((e) => {
    if (e.status == true) {
      complete++
    }
  })

  if (taskArr.length > 0) {
    quadrant_data[orderQuadrant_data].innerHTML = `${(complete * 100 / taskArr.length).toFixed(2)}%`
  }
  else {
    quadrant_data[orderQuadrant_data].innerHTML = "0.00%"
  }
}
function completedArea(taskArr, orderQuadrant_data) {
  let complete = 0
  taskArr.forEach((e) => {
    if (e.status == true) {
      complete++
    }
  })

  if (taskArr.length > 0) {
    quadrant_data[orderQuadrant_data].innerHTML = complete
  }
  else {
    quadrant_data[orderQuadrant_data].innerHTML = "0"
  }
}
function warningAndMessages(t_Uncom, t_Com) {

  let percentage = t_Com * 100 / (t_Com + t_Uncom)

  if (percentage <= 30) {
    statistics__p[4].innerHTML = `Tu efectividad del ${percentage}% es baja, todavia tienes algunas tareas por completar`
  } else if (percentage > 30 && percentage <= 60) {
    statistics__p[4].innerHTML = `¡Bien! ¡Has progresado! ¡Continua Así!`
  }
  else if (percentage > 60 && percentage < 70) {
    statistics__p[4].innerHTML = `Estas muy cerca de lograr una efectividad mayor o igual al 70% la cual es la media para evaluar efectividad positiva`
  }
  else if (percentage >= 70 && percentage !=100) {
    statistics__p[4].innerHTML = `¡ Exelecte Trabajo ! estas en la media de productividad positiva `
  }
  else if (percentage = 100) {
    statistics__p[4].innerHTML = `Trabajo bestial! Tienes una efectividad del ${percentage}%`
  }
}
