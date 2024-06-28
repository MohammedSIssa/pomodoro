const minutes = document.querySelector('span.minutes')
const seconds = document.querySelector('span.seconds')
const startBtn = document.querySelector('.start-btn')
const mInd = document.querySelector('.ind-m')
const timer = document.querySelector('.timer')
const pomodoroBtn = document.querySelector('.pomodoro-section')
const breakBtn = document.querySelector('.break')
const focusTime = document.querySelector('.focus-time')
const pageIcon = document.querySelector('link.page-icon')

let intervalID
let totalFocusTimer = 0
let secondsFocused = 0
let minutesFocused = 0
let hoursFocused = 0

function startTimer(){
  if(startBtn.textContent == "Start"){
    startBtn.textContent = "Pause"
    intervalID = setInterval(()=>{
      let m = +document.querySelector('.minutes').textContent
      let s = +document.querySelector('.seconds').textContent

      if((m == 0 && s == 0) && pomodoroBtn.classList.contains('active')){
        clearInterval(intervalID)
        startBreak()
        m = 5
        pageIcon.setAttribute('href', 'Paused.png')
      }
      if((m == 0 && s == 0) && breakBtn.classList.contains('active')){
        clearInterval(intervalID)
        startPomodoro()
        m = 25
        pageIcon.setAttribute('href', 'Paused.png')
      }
      if(pomodoroBtn.classList.contains('active')){
        pageIcon.setAttribute('href', 'pomodoroStarted.png')
        ++secondsFocused
        if(secondsFocused >= 60){
          ++minutesFocused
          secondsFocused = 0
        }
        if(minutesFocused >= 60){
          ++hoursFocused
          minutesFocused = 0
        }
        focusTime.textContent = `${hoursFocused}h ${minutesFocused}m ${secondsFocused}s`
        // console.log('Focus Time:', secondsFocused,'s', minutesFocused, 'm', hoursFocused, 'h')
      }
      else{
        pageIcon.setAttribute('href', 'breakStarted.png')
      }

      if(s === 0){
        m--
        s = 60
      }
      s--

      if(s < 10){
        seconds.innerHTML = `0${s}`
      }
      else{
        seconds.innerHTML = s
      }
      if(m < 10){
        minutes.innerHTML = `0${m}`
      }
      else{
        minutes.innerHTML = m
      }
      // console.log(timer.textContent)
      document.title = timer.textContent
    }, 1000)  
  }
  else{
    clearInterval(intervalID)
    pageIcon.setAttribute('href', 'Paused.png')
    startBtn.textContent = "Start"
    document.title = "Paused!" + timer.textContent
  }
}
startBtn.addEventListener('click', startTimer)

pomodoroBtn.addEventListener('click', startPomodoro)

function startPomodoro(){
  pageIcon.setAttribute('href', 'Paused.png')
  clearInterval(intervalID)
  document.title = "Time to Focus!"
  if(!pomodoroBtn.classList.contains('active')){
    pomodoroBtn.classList.add('active')
    breakBtn.classList.remove('active')
    document.querySelector('.minutes').innerHTML = "25"
    document.querySelector('.seconds').innerHTML = "00"
    startBtn.textContent = "Start"
  }
}

breakBtn.addEventListener('click', startBreak)

function startBreak(){
  pageIcon.setAttribute('href', 'Paused.png')
  clearInterval(intervalID)
  document.title = "Take a break"
  if(!breakBtn.classList.contains('active')){
    breakBtn.classList.add('active')
    pomodoroBtn.classList.remove('active')
    minutes.textContent = "05"
    seconds.textContent = "00"
    startBtn.textContent = "Start"
  }
}
