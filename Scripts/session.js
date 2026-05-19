import {displayErrorBox} from "../Scripts/Utilities/popup.js"
import {loadExImage} from "../Scripts/Utilities/loadExImage.js";
import {currSession} from "../Scripts/sessionsStorage.js";
import {exerciseList} from "../Scripts/exerciseStorage.js";
import {pastSessionHistory} from "../Scripts/historyStorage.js";
exerciseList.load();
currSession.load();
pastSessionHistory.load();

const stopSession = () => {
    currSession.finish_session();
    // Add message pop up to say sessions finished
    window.location.href = "../index.html"
}

const createExCard = (exId) => {

    const ex = exerciseList.get(exId);
    
    if(!ex) return;

    // Exercise name
    const nameEl = document.createElement("p");
    nameEl.classList.add("exercise_name");
    nameEl.textContent = ex.name;

    // Exercise img

    const exerciseImgEl = document.createElement("div");
    exerciseImgEl.classList.add("exercise_img");

    loadExImage(ex.img_src)
        .then((imgEl)=>{
            exerciseImgEl.appendChild(imgEl);
        })

    // Exercise card

    const exCardEl = document.createElement("div");
    exCardEl.classList.add("exercise");
    exCardEl.appendChild(nameEl);
    exCardEl.appendChild(exerciseImgEl);
    return exCardEl;
}

const startExercise = (exId, poolId) => {
    if (currSession.current.exercise != null){
        displayErrorBox("An other exercise is already selected")
        return;
    }
    currSession.select(poolId,exId);
    currSession.save();

    window.location.href = "exercise.html";
}

const createPoolCard = (pool) =>{

    // Title & Checkbox

    const checkImgEl = document.createElement("img");
    checkImgEl.src="../Image/Interface/check.png"
    const checkSpanEl = document.createElement("span");
    checkSpanEl.classList.add("checkbox");
    checkSpanEl.appendChild(checkImgEl);

    const poolTitleEl = document.createElement("h2");
    poolTitleEl.textContent = pool.name;
    poolTitleEl.append(checkSpanEl);

    // Separator

    const sepEl = document.createElement("div");
    sepEl.classList.add("separator");

    // Pool card

    const poolCardEl = document.createElement("div");
    poolCardEl.classList.add("pool");
    if (pool.statut=="COMPLETED") poolCardEl.classList.add("completed");
    poolCardEl.appendChild(poolTitleEl);
    poolCardEl.appendChild(sepEl);

    // Exercise card

    for (const exId of pool.exercises){
        const exEl = createExCard(exId);
        if(exEl) {
            poolCardEl.appendChild(exEl)
            exEl.addEventListener("click",()=>{
                startExercise(exId,pool.id);
            })
        };
    }

    return poolCardEl;
}

const displayPools = (contEl, currSess) => {

    if(!contEl) return;
    contEl.innerHTML = ""

    if(!currSess || !currSess.pools){
        const pEl = document.createElement("p");
        pEl.textContent = "No content to display";
        contEl.appendChild(pEl);
        return;
    }

    currSession.pools.forEach(pool => {
        const poolCardEl = createPoolCard(pool);
        contEl.appendChild(poolCardEl);
    });

    const stopSessionBtnEl = document.createElement("button");
    stopSessionBtnEl.textContent = "Stop session";
    stopSessionBtnEl.classList.add("stop_session");
    stopSessionBtnEl.addEventListener("click",stopSession);
    contEl.appendChild(stopSessionBtnEl);

}

const contEl = document.querySelector(".pool_container");
displayPools(contEl, currSession);

if (currSession.isSessionFinished()){
    stopSession();
}


