const buttonTwoHourProgram = document.getElementById("2-hour-program")
const buttonFourHourProgram = document.getElementById("4-hour-program")
const buttonEightHourProgram = document.getElementById("8-hour-program")
const startButton = document.querySelector(".start-button")
const breakButton = document.querySelector(".break-button")
const resumeButton = document.querySelector(".resume-button")

const selectedProgramElement = document.querySelector(".selected-program")
const timerElement = document.querySelector(".timer")
const selectedDurationElement = document.querySelector(".selected-duration")
const countdownElement = document.querySelector(".countdown")
const progressBarElement = document.querySelector(".progress-bar")

const regex = /[a-z]/

let selectedProgram = null

selectedProgramElement.innerText = `Bonjour,\nbienvenue sur Wallacefocus.\nPour commencer, sélectionne un programme.`

function resetProgram() {
    selectedProgramElement.innerText = `Bonjour,\nbienvenue sur Wallacefocus.\nPour commencer, sélectionne un programme.`
    selectedDurationElement.innerText = ``
    selectedProgram = null
}

function setProgram(buttonText, hours) {
    selectedProgramElement.innerText = `Tu as sélectionné\n${buttonText}.\nPour démarrer la session, appuie sur START.`
    selectedDurationElement.innerText = `0${hours}:00:00`
    selectedProgram = buttonText
}

function buttonAdjustment(buttonText, hours) {
    if (!regex.test(selectedProgramElement.innerText)) {
        return null
    } else if (selectedProgram === buttonText) {
        resetProgram()
    } else {
        setProgram(buttonText, hours)
    }
}

buttonTwoHourProgram.addEventListener("click", () => {
    buttonAdjustment("deux heures", 2)
})

buttonFourHourProgram.addEventListener("click", () => {
    buttonAdjustment("quatre heures", 4)
})

buttonEightHourProgram.addEventListener("click", () => {
    buttonAdjustment("huit heures", 8)
})

let timerIsBreak = false
let timerBreakTime = 0
let timerTimeBeforeBreak = 0
let timerStartTime = 0

function timer(duration) {
    return new Promise((resolve) => {
        let startTime = Date.now()
        const interval = setInterval(() => {
            if (timerIsBreak) {
                return null
            }
            const elapsedTime = Date.now() - startTime - timerBreakTime
            const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1000))
            const minutes = Math.floor(remainingTime / 60)
            const seconds = remainingTime % 60
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
            document.title = `Wallacefocus • ${formattedMinutes}:${formattedSeconds}`
            timerElement.innerText = `${formattedMinutes}:${formattedSeconds}`
            if (remainingTime === 0) {
                clearInterval(interval)
                resolve()
            }
        }, 1000)
    })
}

function workTimer() {
    timerBreakTime = 0
    return timer(10)
    // return timer(1500)
}

function breakTimer() {
    timerBreakTime = 0
    return timer(5)
    // return timer(300)
}

async function timerSequence(repetitions) {
    for (let i = 0; i < repetitions; i++) {
        await workTimer()
        await breakTimer()
    }
}

function countdown(duration) {
    return new Promise((resolve) => {
        let startTime = Date.now()
        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime
            const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1000))
            const hours = Math.floor(remainingTime / 3600)
            const minutes = Math.floor((remainingTime % 3600) / 60)
            const seconds = remainingTime % 60
            const formattedHours = hours < 10 ? '0' + hours : hours
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
            countdownElement.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
            if (remainingTime === 0) {
                clearInterval(interval)
                resolve()
            }
        }, 1000)
    })
}

startButton.addEventListener("click", () => {
    if (selectedDurationElement.innerText === "02:00:00") {
        selectedProgramElement.innerText = ``
        selectedDurationElement.innerText = ``
        startButton.style.display = "none"
        breakButton.style.display = "block"
        timerSequence(2)
        countdown(30)
        // timerSequence(4)
        // countdown(7200)
    } else if (selectedDurationElement.innerText === "04:00:00") {
        selectedProgramElement.innerText = ``
        selectedDurationElement.innerText = ``
        startButton.style.display = "none"
        breakButton.style.display = "block"
        timerSequence(8)
        countdown(14400)
    } else if (selectedDurationElement.innerText === "08:00:00") {
        selectedProgramElement.innerText = ``
        selectedDurationElement.innerText = ``
        startButton.style.display = "none"
        breakButton.style.display = "block"
        timerSequence(16)
        countdown(28800)
    } else {
        return null
    }
})

breakButton.addEventListener("click", () => {
    timerIsBreak = true
    timerTimeBeforeBreak = Date.now() - timerStartTime
    breakButton.style.display = "none"
    resumeButton.style.display = "block"
})

resumeButton.addEventListener("click", () => {
    timerIsBreak = false
    timerBreakTime += Date.now() - (timerStartTime + timerTimeBeforeBreak)
    breakButton.style.display = "block"
    resumeButton.style.display = "none"
})