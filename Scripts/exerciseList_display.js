
import {exerciseList} from "/Scripts/exerciseStorage.js";
import {loadExImage} from "/Scripts/Utilities/loadExImage.js";
import {currSession} from "/Scripts/sessionsStorage.js";
import {displayErrorBox} from "/Scripts/Utilities/popup.js"
currSession.load();
exerciseList.load();

const startExercise = (ex) => {
    if (currSession.id){
        displayErrorBox("Stop the current session before playing an exercise!");
        return 
    }

    sessionStorage.setItem("currExercise",JSON.stringify(ex));
    window.location.href = "exercise.html";

}

const containerEl = document.querySelector(".list_container");

const createBtnEl = (btn_class, btn_icon, btn_action) => {

    const btnEl = document.createElement("button");
    btnEl.classList.add("edit_btn");
    
    const iconImgEl = document.createElement("img");
    iconImgEl.classList.add(btn_class);
    iconImgEl.src=btn_icon;
    btnEl.append(iconImgEl);

    btnEl.addEventListener("click",btn_action)

    return btnEl;

}

const createExTbBtmEl = (contEl, ex) => {

    const thumbnailBtm = document.createElement("div");
    thumbnailBtm.classList.add("thumbnail-bottom");

    const h1El = document.createElement("h1");
    h1El.textContent = ex.name;
    
    const editBtnEl = createBtnEl(
        "icon",
        "../Image/edit.png",
        (e)=>{
            sessionStorage.setItem("exerciseToEdit",JSON.stringify(ex));
            window.location.href = "editexercise.html"

            e.preventDefault(); // Prevent anchor default behavior
            e.stopPropagation();
        }
    );

    const deleteBtnEl = createBtnEl(
        "icon",
        "../Image/delete.png",
        (e)=>{
            exerciseList.remove(ex);
            exerciseList.save();

            e.preventDefault(); // Prevent anchor default behavior
            e.stopPropagation();

            displayExList(contEl); //Update display
        }
    );

    const goDownBtnEl = createBtnEl(
        "icon",
        "../Image/down.png",
        (e)=>{
            exerciseList.swap(ex.id,"default_ex_15")
            e.preventDefault();
            e.stopPropagation();
            displayExList(contEl);
        }
    );

    thumbnailBtm.appendChild(h1El);
    thumbnailBtm.appendChild(goDownBtnEl);
    thumbnailBtm.appendChild(editBtnEl);
    thumbnailBtm.appendChild(deleteBtnEl);

    return thumbnailBtm;

}

const createExTbEl = (contEl, ex) => {

    const exTimgEl = document.createElement("div");
    exTimgEl.classList.add("exercise_thumbnail_img");

    const imgEl = loadExImage(ex.img_src)
        .then((imgEl) => exTimgEl.appendChild(imgEl))

    const thumbnailBtm = createExTbBtmEl(contEl, ex);

    const aEl = document.createElement("a");
    aEl.appendChild(exTimgEl);
    aEl.appendChild(thumbnailBtm);
    aEl.addEventListener("click",(e)=>{
        startExercise(ex);
    });

    const exTbEl = document.createElement("div");
    exTbEl.classList.add("exercise_thumbnail");
    exTbEl.appendChild(aEl);

    return exTbEl;

}

const  displayExList = (contEl) => {

    contEl.innerHTML ="";
    if (!exerciseList.list.length){
        const pEl = document.createElement("p");
        pEl.textContent = "No exercise created yet!"
        contEl.appendChild(pEl);
        return
    }

    exerciseList.list.forEach(ex => {
        const exTbEl = createExTbEl(contEl,ex);
        contEl.appendChild(exTbEl);
    });

}

displayExList(containerEl);