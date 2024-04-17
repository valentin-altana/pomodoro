function twoHourProgramDisplayed() {
    const timerDisplayed = document.querySelector(".selected-program")
    const countdownDisplayed = document.querySelector(".countdown")
    if (countdownDisplayed.innerText !== "02:00:00") {
        timerDisplayed.innerText = "Tu as sélectionné deux heures. Prêt.e ? Pour démarrer la session, appuie sur START."
        countdownDisplayed.innerText = "02:00:00"
    } else {
        timerDisplayed.innerText = ""
        countdownDisplayed.innerText = ""
    }
}

const buttonTwoHourProgram = document.getElementById("2-hour-program")
buttonTwoHourProgram.addEventListener("click", () => {
    twoHourProgramDisplayed()
})

function twoHourProgramTimer() { }

function twoHourProgramCountdown() {
    const globalTime = 2 * 60 * 60
    let time = globalTime
    const countdownElement = document.querySelector(".countdown")
    const interval = setInterval(() => {
        let hours = parseInt(time / 3600, 10)
        let minutes = parseInt((time % 3600) / 60, 10)
        let seconds = time % 60
        hours = hours < 10 ? "0" + hours : hours
        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds
        countdownElement.innerText = `${hours}:${minutes}:${seconds}`
        time = time <= 0 ? 0 : time - 1
        if (time === 0) {
            clearInterval(interval)
        }
    }, 1000)
}

const startButton = document.querySelector(".start-button")
startButton.addEventListener("click", () => {
    const countdownDisplayed = document.querySelector(".countdown")
    if (countdownDisplayed.innerText === "02:00:00") {
        twoHourProgramCountdown()
    }
})