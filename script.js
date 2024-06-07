const buttonTwoHourProgram = document.getElementById("2-hour-program")
const buttonFourHourProgram = document.getElementById("4-hour-program")
const buttonEightHourProgram = document.getElementById("8-hour-program")
const startButton = document.querySelector(".start-button")
const breakButton = document.querySelector(".break-button")
const resumeButton = document.querySelector(".resume-button")
const backButton = document.querySelector(".back-button")

const selectedProgramElement = document.querySelector(".selected-program")
const endingMessageElement = document.querySelector(".ending-message")
const timerElement = document.querySelector(".timer")
const selectedDurationElement = document.querySelector(".selected-duration")
const countdownElement = document.querySelector(".countdown")
const progressBarElement = document.querySelector(".progress-bar")

const regex = /[a-z]/

let selectedProgram = null

selectedProgramElement.innerText = `Bienvenue sur Wallacefocus !\nPour commencer, sélectionne un programme.`

function resetProgram() {
    selectedProgramElement.innerText = `Bienvenue sur Wallacefocus !\nPour commencer, sélectionne un programme.`
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

let countdownIsBreak = false
let countdownBreakTime = 0
let countdownTimeBeforeBreak = 0
let countdownStartTime = 0

let progressBarIsBreak = false
let progressBarBreakTime = 0
let progressBarTimeBeforeBreak = 0
let progressBarStartTime = 0

function timer(duration) {
    return new Promise((resolve) => {
        let startTime = performance.now()
        timerStartTime = startTime
        const interval = setInterval(() => {
            if (timerIsBreak) {
                return null
            }
            const elapsedTime = performance.now() - startTime - timerBreakTime
            const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1000))
            const minutes = Math.floor(remainingTime / 60)
            const seconds = remainingTime % 60
            const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
            const formattedSeconds = seconds < 10 ? "0" + seconds : seconds
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
    return timer(2)
}

function breakTimer() {
    timerBreakTime = 0
    return timer(2)
}

async function timerSequence(repetitions) {
    for (let i = 0; i < repetitions; i++) {
        await workTimer()
        await breakTimer()
    }
    document.title = `Wallacefocus • C'est terminé !`
    timerElement.innerText = ``
    endingMessageElement.innerText = `Tu as terminé\nta session !\nPour revenir à\nl'écran titre,\nappuie sur RETOUR.`
}

function countdown(duration) {
    let startTime = performance.now()
    countdownStartTime = startTime
    const interval = setInterval(() => {
        if (countdownIsBreak) {
            return null
        }
        const elapsedTime = performance.now() - startTime - countdownBreakTime
        const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1000))
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60
        const formattedHours = hours < 10 ? "0" + hours : hours
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds
        countdownElement.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        if (remainingTime === 0) {
            clearInterval(interval)
            countdownBreakTime = 0
            countdownElement.innerText = ``
            breakButton.style.display = "none"
            backButton.style.display = "block"
        }
    }, 1000)
}

function progressBar(duration) {
    let startTime = performance.now()
    progressBarStartTime = startTime
    const interval = setInterval(() => {
        if (progressBarIsBreak) {
            return null
        }
        const elapsedTime = performance.now() - startTime - progressBarBreakTime
        const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1000))
        const progressBarValue = (elapsedTime / (duration * 1000)) * 100
        progressBarElement.style.width = progressBarValue + "%"
        if (remainingTime === 0) {
            clearInterval(interval)
            progressBarBreakTime = 0
            progressBarElement.style.width = "100%"
        }
    }, 1000)
}

function breakCounters() {
    timerIsBreak = true
    countdownIsBreak = true
    progressBarIsBreak = true
    timerTimeBeforeBreak = performance.now() - timerStartTime
    countdownTimeBeforeBreak = performance.now() - countdownStartTime
    progressBarTimeBeforeBreak = performance.now() - progressBarStartTime
}

function resumeCounters() {
    timerIsBreak = false
    countdownIsBreak = false
    progressBarIsBreak = false
    timerBreakTime += performance.now() - (timerStartTime + timerTimeBeforeBreak)
    countdownBreakTime += performance.now() - (countdownStartTime + countdownTimeBeforeBreak)
    progressBarBreakTime += performance.now() - (progressBarStartTime + progressBarTimeBeforeBreak)
}

startButton.addEventListener("click", () => {
    let timerValue = 0
    let countdownValue = 0
    let progressBarValue = 0
    if (selectedDurationElement.innerText === "02:00:00") {
        timerValue = 1
        countdownValue = 4
        progressBarValue = 8
    } else if (selectedDurationElement.innerText === "04:00:00") {
        timerValue = 8
        countdownValue = 14400
        progressBarValue = 14400
    } else if (selectedDurationElement.innerText === "08:00:00") {
        timerValue = 16
        countdownValue = 28800
        progressBarValue = 28800
    } else {
        return null
    }
    selectedProgram = null
    selectedProgramElement.innerText = ``
    selectedDurationElement.innerText = ``
    startButton.style.display = "none"
    breakButton.style.display = "block"
    timerSequence(timerValue)
    countdown(countdownValue)
    progressBar(progressBarValue)
})

breakButton.addEventListener("click", () => {
    breakCounters()
    breakButton.style.display = "none"
    resumeButton.style.display = "block"
})

resumeButton.addEventListener("click", () => {
    resumeCounters()
    resumeButton.style.display = "none"
    breakButton.style.display = "block"
})

backButton.addEventListener("click", () => {
    if (timerElement.innerText === `` && countdownElement.innerText === `` && progressBarElement.style.width === "100%") {
        document.title = `Wallacefocus`
        endingMessageElement.innerText = ``
        selectedProgramElement.innerText = `Bienvenue sur Wallacefocus !\nPour commencer, sélectionne un programme.`
        progressBarElement.style.width = "0%"
        backButton.style.display = "none"
        startButton.style.display = "block"
    } else {
        return null
    }
})