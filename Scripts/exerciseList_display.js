
import {exerciseList} from "../Scripts/exerciseStorage.js";
import {loadExImage} from "../Scripts/Utilities/loadExImage.js";
import {currSession} from "../Scripts/sessionsStorage.js";
import {displayErrorBox} from "../Scripts/Utilities/popup.js"
currSession.load();
exerciseList.load();

let scrollPos = window.scrollY;

const startExercise = (ex) => {
    if (currSession.id){
        displayErrorBox("Stop the current session before playing an exercise!");
        return 
    }

    sessionStorage.setItem("currExercise",JSON.stringify(ex));
    window.location.href = "exercise.html";

}

const containerEl = document.querySelector(".list_container");

const createBtnEl = (btn_class, icon_class, btn_icon, btn_action) => {

    const btnEl = document.createElement("button");
    btnEl.classList.add(btn_class);
    
    const iconImgEl = document.createElement("img");
    iconImgEl.classList.add(icon_class);
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
        "edit_btn",
        "icon",
        "../Image/edit.png",
        (e)=>{
            sessionStorage.setItem("exerciseToEdit",JSON.stringify(ex));
            window.location.href = "editExercise.html"

            e.preventDefault(); // Prevent anchor default behavior
            e.stopPropagation();
        }
    );

    const deleteBtnEl = createBtnEl(
        "delete_btn",
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
        "down_btn",
        "icon",
        "../Image/down.png",
        (e)=>{
            e.preventDefault();
            e.stopPropagation();
            exerciseList.swap_with_next(ex.id);
            scrollPos = window.scrollY;
            displayExList(contEl);
        }
    );

    const goUpBtnEl = createBtnEl(
        "up_btn",
        "icon",
        "../Image/up.png",
        (e)=>{
            e.preventDefault();
            e.stopPropagation();
            exerciseList.swap_with_previous(ex.id);
            displayExList(contEl);
        }
    );

    const move_btn_cont_El = document.createElement("div");
    move_btn_cont_El.classList.add("move_btn_cont");
    if (exerciseList.getIndex(ex.id)!=0) move_btn_cont_El.appendChild(goUpBtnEl);
    if (exerciseList.getIndex(ex.id)!=exerciseList.length-1) move_btn_cont_El.appendChild(goDownBtnEl);

    thumbnailBtm.appendChild(h1El);
    thumbnailBtm.appendChild(move_btn_cont_El);
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

const  displayExList = async (contEl) => {

    contEl.innerHTML ="";
    if (!exerciseList.list.length){
        const pEl = document.createElement("p");
        pEl.textContent = "No exercise created yet!"
        contEl.appendChild(pEl);
        return
    }

    exerciseList.list.forEach(ex => {
        const exTbEl = createExTbEl(contEl,ex);
        exTbEl.classList.add("hidden"); //Hiding elements for firing animation when display will be set to grid
        contEl.appendChild(exTbEl);
    });

    // Start animation
    for (const node of contEl.childNodes){
        node.classList.add("show");
    }

    // Get back to the position
    window.scrollTo(0, scrollPos);

}

displayExList(containerEl);