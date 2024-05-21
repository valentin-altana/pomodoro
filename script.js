const buttonTwoHourProgram = document.getElementById("2-hour-program")
const buttonFourHourProgram = document.getElementById("4-hour-program")
const buttonEightHourProgram = document.getElementById("8-hour-program")
const startButton = document.querySelector(".start-button")

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