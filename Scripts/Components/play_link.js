import { currSession } from "../../Scripts/sessionsStorage.js";
currSession.load();

const base = location.pathname.includes("/Pages/") ? "../" : "./";

const playAnchorEl = document.querySelector("#play_btn a");
const playLiEl = document.querySelector("#play_btn");

const getPlayhref = () =>{
    if (currSession.current){
        if(currSession.current.exercise) {
            return `${base}Pages/exercise.html`;
        } else {
            return `${base}Pages/session.html`;
        }
    }

    const currExercise = JSON.parse(sessionStorage.getItem("currExercise"));
    if (currExercise) {
        return `${base}Pages/exercise.html`;
    }
}

const url = getPlayhref();
if (url){
    playAnchorEl.href = url;
    playLiEl.classList.remove("hidden");
}
