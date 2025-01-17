// Countdown submittion window script

const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEL = document.getElementById('complete')
const completeELInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive
let savedCountdown

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// Set DAte Input Min with Today's Date
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// Populate CountDaown/Complete UI
function updateDOM() {
    
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
        
        // Hide Input
        inputContainer.hidden = true
        
        // if the countdown has ended, show complete
        if (distance <= 0) {
            countdownEl .hidden = true
            clearInterval(countdownActive)
            completeELInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEL.hidden = false
        } else {
            // else show the countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`
            completeEL.hidden = true
            countdownEl.hidden = false
        }
    }, second)
}

// Take Values from form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown))
    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown')
    } else {
        // Get number version of current date, updateDOM
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// Reset All Values
function reset() {
    // Hide Countdowns, show Input
    countdownEl.hidden = true
    completeEL.hidden = true
    inputContainer.hidden = false
    // Stop the Countdown
    clearInterval(countdownActive)
    // Reset values
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown')
}

function restorePreviousCountdown() {
    // Get countdown from local storage if availible
    if (localStorage.getItem('countdown')) {
        
        inputContainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

// On Load, check local storage
restorePreviousCountdown()