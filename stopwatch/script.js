let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

stopBtn.disabled = true;
lapBtn.disabled = true;

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10); // Update every 10ms for hundredths
        running = true;
        
        startBtn.disabled = true;
        stopBtn.disabled = false;
        lapBtn.disabled = false;
        
        // Add active pulse class
        display.style.textShadow = '0 0 20px rgba(56, 189, 248, 0.8)';
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        
        startBtn.disabled = false;
        startBtn.textContent = 'Resume';
        stopBtn.disabled = true;
        
        // Remove active pulse class
        display.style.textShadow = '0 0 10px rgba(56, 189, 248, 0.5)';
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = '00:00:00.00';
    
    startBtn.disabled = false;
    startBtn.textContent = 'Start';
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    
    lapsList.innerHTML = '';
    lapCounter = 1;
    
    display.style.textShadow = '0 0 10px rgba(56, 189, 248, 0.5)';
}

function recordLap() {
    if (running) {
        const li = document.createElement('li');
        
        const spanNumber = document.createElement('span');
        spanNumber.className = 'lap-number';
        spanNumber.textContent = `Lap ${lapCounter}`;
        
        const spanTime = document.createElement('span');
        spanTime.className = 'lap-time';
        spanTime.textContent = display.textContent;
        
        li.appendChild(spanNumber);
        li.appendChild(spanTime);
        
        lapsList.prepend(li);
        lapCounter++;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    let diff = updatedTime - startTime;

    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((diff % 1000) / 10); // get hundredths of a second

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.textContent = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
