import { currSession } from "/Scripts/sessionsStorage.js";
currSession.load();

const playAnchorEl = document.querySelector("#play_btn a");
const playLiEl = document.querySelector("#play_btn");

const getPlayhref = () =>{
    if (currSession.current){
        if(currSession.current.exercise) {
            return "/Pages/exercise.html";
        } else {
            return "/Pages/session.html"
        }
    }
     // IF CURRENT EXERCISE = EXERCISE
     const currExercise = JSON.parse(sessionStorage.getItem("currExercise"));
    if (currExercise) {
        return "/Pages/exercise.html";
    }
}

const url = getPlayhref();
if (url){
    playAnchorEl.href = url;
    playLiEl.classList.remove("hidden");
}
