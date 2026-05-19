import {pastSessionHistory} from "../Scripts/historyStorage.js";
pastSessionHistory.load();
import {createSeriesTable} from "../Scripts/Utilities/seriesTable.js";


const createExerciseCard = (exercise,exerciseNumber) =>{

    const exerciseCard = document.createElement("div");
    exerciseCard.classList.add("session-exercise");

    const exTitleEl = document.createElement("p");
    exTitleEl.classList.add("exercise-name");
    exTitleEl.textContent = `#${exerciseNumber} ${exercise.exerciseName} - ${exercise.series.length} series`;
    
    const tableEl = createSeriesTable(exercise);

    exerciseCard.appendChild(exTitleEl);
    exerciseCard.appendChild(tableEl);

    return exerciseCard;
}

const createSessionCardBody = (session) => {

    const sessionBodyEl = document.createElement("div");
    sessionBodyEl.classList.add("session-body");

    const exercises = session.exerciseDone;
    let exerciseNumber = 1
    exercises.forEach((ex)=>{
        const exerciseCard = createExerciseCard(ex,exerciseNumber);
        sessionBodyEl.appendChild(exerciseCard);
        exerciseNumber+=1
    })

    const deleteBtnEl = document.createElement("button");
    deleteBtnEl.classList.add("delete-btn");
    deleteBtnEl.textContent = "Delete";
    deleteBtnEl.addEventListener("click",()=>{
        pastSessionHistory.delete(session.id);
        pastSessionHistory.save();
        displayPastSession(contEl,pastSessionHistory);
    });

    sessionBodyEl.appendChild(deleteBtnEl);

    return sessionBodyEl;

}

const createSessionCardHead = (session) => {

    const sessionHeadEl = document.createElement("div");
    sessionHeadEl.classList.add("session-head");

    const sessionDateEl = document.createElement("p");
    sessionDateEl.classList.add("sessionDate");
    sessionDateEl.textContent = new Date(session.date).toLocaleDateString('fr-FR');

    const sessionNameEl = document.createElement("p");
    sessionNameEl.classList.add("sessionName");
    sessionNameEl.textContent = session.sessionName;

    sessionHeadEl.appendChild(sessionDateEl);
    sessionHeadEl.appendChild(sessionNameEl);

    return sessionHeadEl;
}

const createSessionCard = (session) => {

    const sessionCardEl = document.createElement("div");
    sessionCardEl.classList.add("session-card");

    const sessionHeadEl = createSessionCardHead(session);
    sessionCardEl.appendChild(sessionHeadEl);

    const sessionBodyEl = createSessionCardBody(session)
    sessionBodyEl.classList.add("hidden");
    sessionCardEl.appendChild(sessionBodyEl);

    sessionHeadEl.addEventListener("click",()=>{
        sessionBodyEl.classList.toggle("hidden");
    })

    return sessionCardEl

}

const displayPastSession = (contEl, pastSessionHistory) => {

    contEl.innerHTML = "";
    
    const pastSessions = pastSessionHistory.sessionsList;

    if (!pastSessions.length){
        const pEl = document.createElement("p");
        pEl.textContent = "Your previous sessions normaly appears here."
        contEl.appendChild(pEl)
    }

    pastSessions.sort((sess1,sess2)=>{return sess2.date-sess1.date});
    pastSessions.forEach(sess => {
        const sessionCardEl = createSessionCard(sess);
        contEl.appendChild(sessionCardEl);
    });

}

const contEl = document.querySelector("main");
displayPastSession(contEl,pastSessionHistory);