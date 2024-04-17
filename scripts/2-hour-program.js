function twoHourProgramDisplayed() {
    // TIMER
    const timerDisplayed = document.querySelector(".selected-program")
    // COUNTDOWN
    const countdownDisplayed = document.querySelector(".countdown")

    if (timerDisplayed.innerText !== "Tu as sélectionné deux heures. Prêt.e ? Pour démarrer la session, appuie sur START." && countdownDisplayed.innerText !== "02:00:00") {
        timerDisplayed.innerText = "Tu as sélectionné deux heures. Prêt.e ? Pour démarrer la session, appuie sur START."
        countdownDisplayed.innerText = "02:00:00"
    } else {
        timerDisplayed.innerText = ""
        countdownDisplayed.innerText = ""
    }
}

const buttonTwoHourProgram = document.getElementById("2-hour-program")
buttonTwoHourProgram.addEventListener("click", (event) => {
    event.preventDefault()
    twoHourProgramDisplayed()
})

function twoHourProgram() {
    // TIMER
    function timerDisplayed() { }
    // COUNTDOWN
    function countdownDisplayed() { }
    // PROGRESS BAR
    const progressBar = document.querySelector(".progress-bar")
}