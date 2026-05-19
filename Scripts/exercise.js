import {readForm} from "../Scripts/Form/readForm.js"
import {textToListEl} from "../Scripts/Utilities/textToList.js"
import { loadExImage } from "../Scripts/Utilities/loadExImage.js";
import {pastSessionHistory} from "../Scripts/historyStorage.js";
pastSessionHistory.load();
import {createSeriesTable} from "../Scripts/Utilities/seriesTable.js";

// Managing Panel switching during exercises
const panelNavEl = document.querySelectorAll(".panel-nav li");
if (panelNavEl) panelNavEl.forEach((btn) => {

    btn.addEventListener("click",()=>{

        for (const other_btn of panelNavEl){
            other_btn.classList.remove("current_panel")
        }

        btn.classList.add("current_panel");

        const otherPanelEl = document.querySelectorAll(".panel");
        otherPanelEl.forEach((panelEl)=>{panelEl.classList.add("hidden")})

        const panelEl = document.getElementById("panel_"+btn.id);
        panelEl.classList.remove("hidden");
    })
})

const enableSaveOnUnload = (object) =>{
    addEventListener("beforeunload", ()=>{
        object.save();
    })
}

// Getting current session/exercise information
import { currSession } from "/Scripts/sessionsStorage.js";
currSession.load();

let currExercise;
const sessionMode = Boolean(currSession.current); 

if (sessionMode) {
    currExercise = currSession.current.exercise;
    enableSaveOnUnload(currSession);
} else {
    /* solo exercise */
    currExercise = JSON.parse(sessionStorage.getItem("currExercise"));
    addEventListener("beforeunload",()=>{
        if(currExercise.seriesFinished < currExercise.series-1){
            sessionStorage.setItem("currExercise",JSON.stringify(currExercise));
        } else {
            sessionStorage.removeItem("currExercise");
        }
    })
}

// Updating UI with current exercise information

const updateExerciseInformation = (ex) =>{

    if (!ex){
        const mainEl = document.querySelector("main");
        mainEl.innerHTML = "";
        const titleEl = document.querySelector(".exercise-title");
        titleEl.textContent = "No exercise loaded";
        return;
    }

    // Title
    const titleEl = document.querySelector(".exercise-title");
    titleEl.textContent = ex.name;

    // Form elements
    const totalSeriesEl = document.querySelector(".total_series");
    totalSeriesEl.textContent = ex.series;
    const repEl = document.getElementById("repetitions");
    repEl.value = ex.repetitions;
    const weightEl = document.getElementById("weight");
    weightEl.value = ex.weight;
    const weightUnitEl = document.getElementById("weight_unit");
    for (const option of weightUnitEl.options){
        if(option.textContent===ex.weight_unit){
            option.selected=true;
        }
    }

    // Tips and video
    const tipsEl = document.querySelector(".tips");
    tipsEl.appendChild(textToListEl(ex.tips));

    const videoEl = document.querySelector(".video");
    loadExImage(ex.vid_src).then(gifEl => {videoEl.appendChild(gifEl)});
}

const updateExerciseUi = () => {
    if (currExercise.recup && currExercise.recup.isStarted){
        const endTime = currExercise.recup.startTime + currExercise.recup_time*1000;
        const recupTimeLeft = endTime - Date.now() >0 ? Math.round((endTime - Date.now())/1000) : 0;
        showRecup(recupTimeLeft);
    }
    currSerieEl.textContent = currExercise.seriesFinished ? currExercise.seriesFinished+1 : 1;
}

// Managing series switch

// Converting number in ## format
const numToStr = (n) =>{
    if (String(n).length<2){
        return "0" + String(n)
    }
    return String(n);
}

const showTimer = (seconds) =>{

    timerEl.style.display = "Block";
    timerEl.innerHTML = `<span class="minute">${numToStr(Math.floor(seconds/60))}</span>:<span class="second">${numToStr(seconds%60)}</span>`
    serieFormEl.style.display = "None";

    skipTimerBtnEl.style.display = "Block";
    nxtSerieBtnEl.style.display = "none";
    tableContainerEl.style.display = "none";

}

const hideTimer = () => {

    timerEl.style.display = "None";
    serieFormEl.style.display = "Block";

    skipTimerBtnEl.style.display = "None";
    nxtSerieBtnEl.style.display = "Block";
    tableContainerEl.style.display = "Block";
}

let intervalId; // The interval Id must be global so the timer can be stopped from stopRecup function
const startTimer = (seconds) =>{

    const secEl = timerEl.querySelector(".second");
    const minEl = timerEl.querySelector(".minute");

    // Initial timer
    let sec = seconds % 60;
    let min = Math.floor(seconds/60);

    // Each second update
    intervalId = setInterval(()=>{
        
        if (sec === 0 && min ===0){
            clearInterval(intervalId);
            stopRecup();
            return;
        }

        if (sec === 0){
            min-=1;
            sec = 59;
        } else {
            sec-=1;
        }

        // Displaying 
        secEl.textContent = numToStr(sec);
        minEl.textContent = numToStr(min);

    },1000)
}

const serieFormEl = document.querySelector("#serie_form");
const allInputEl = serieFormEl.querySelectorAll("input[type='Number'],input[type='text'],input[type='url'] , select, textarea");
const finishSerie = () => {
    if (sessionMode) {
        const formData = readForm(allInputEl);
        // Check user's entry ?
        const recoveryTime = currExercise.recup.startTime ? (Date.now() - currExercise.recup.startTime)/1000 : 0 //sec
        currSession.add_series(formData.repetitions,formData.weight,recoveryTime)
    }
    currExercise["seriesFinished"] = currExercise["seriesFinished"]? currExercise["seriesFinished"] +1 : 1;
}

const finishExercise = () =>{
    finishSerie();
    if(sessionMode){
        currSession.finish_exercise();
        window.location.href = "session.html"
    } else {
        sessionStorage.removeItem("currExercise");
        window.location.href = "../index.html"
    }
}

const showRecup = (recupTime) => {
    showTimer(recupTime);
    startTimer(recupTime);
}

const launchRecup = () =>{
    currExercise["recup"] = {isStarted : true , startTime : Date.now()};
    showRecup(currExercise.recup_time);
}

const stopRecup = () => {
    clearInterval(intervalId); //Stop the timer
    finishSerie();
    currExercise["recup"] = {isStarted : false , startTime : null};
    hideTimer();
    updateExerciseUi(currExercise);
}

const nxtSerieBtnEl = document.getElementById("next_exercises_btn");
const skipTimerBtnEl = document.getElementById("skip_timer_btn");

const currSerieEl = document.getElementById("curr_serie");
const timerEl = document.getElementById("recup_timer");

nxtSerieBtnEl.addEventListener("click", ()=>{
    if(currExercise.seriesFinished >= currExercise.series-1){
        finishExercise();
    } else {
        launchRecup();
    }
})

skipTimerBtnEl.addEventListener("click", ()=>{
    stopRecup();
    if(currExercise.seriesFinished >= currExercise.series-1){
        nxtSerieBtnEl.textContent = "End";
    }
})


/* Execution */
updateExerciseInformation(currExercise);
if (currExercise) updateExerciseUi(currExercise);

const tableContainerEl = document.querySelector(".previous_series");
if (currExercise) {
    const prev_series = {series : pastSessionHistory.getNthLastSeries(currExercise.id,5)};
    if (prev_series.series.length){
        const tableEl = createSeriesTable(prev_series);
        tableContainerEl.appendChild(tableEl);
    } else {
        tableContainerEl.classList.add("hidden");
    }
}