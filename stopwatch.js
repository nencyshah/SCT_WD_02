// Select elements from the DOM
let timerDisplay = document.querySelector(".timer-display"); // Displays the time
let startBtn = document.getElementById("start"); // Start button
let stopBtn = document.getElementById("stop"); // Stop button
let resetBtn = document.getElementById("reset"); // Reset button

// Variables for time management
let startTime; // Stores the timestamp when the stopwatch starts
let elapsedTime = 0; // Keeps track of elapsed time in milliseconds
let timerInterval; // Stores the interval function reference
let isRunning = false; // Flag to check if the stopwatch is running


function formatTime(ms) {
    let milliseconds = Math.floor(ms % 1000); // Extract milliseconds
    let seconds = Math.floor((ms / 1000) % 60); // Extract seconds
    let minutes = Math.floor((ms / (1000 * 60)) % 60); // Extract minutes
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24); // Extract hours

    // Format the time to always display two digits for each unit
    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + ":" +
        (milliseconds < 100 ? (milliseconds < 10 ? "00" : "0") : "") + milliseconds
    );
}

/**
 * Function to start the stopwatch
 */
function startTimer() {
    if (!isRunning) { // Only start if it's not already running
        startTime = Date.now() - elapsedTime; // Adjust start time for paused durations
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime; // Calculate elapsed time
            timerDisplay.textContent = formatTime(elapsedTime); // Update display
        }, 10); // Update every 10 milliseconds
        isRunning = true; // Set running flag to true
    }
}

/**
 * Function to stop (pause) the stopwatch
 */
function stopTimer() {
    clearInterval(timerInterval); // Stop the timer interval
    isRunning = false; // Set running flag to false
}

/**
 * Function to reset the stopwatch
 */
function resetTimer() {
    clearInterval(timerInterval); // Stop the timer interval
    elapsedTime = 0; // Reset elapsed time
    timerDisplay.textContent = "00:00:00:000"; // Reset display to initial state
    isRunning = false; // Set running flag to false
}

// Add event listeners to buttons for user interaction
startBtn.addEventListener("click", startTimer); // Start button click event
stopBtn.addEventListener("click", stopTimer); // Stop button click event
resetBtn.addEventListener("click", resetTimer); // Reset button click event
