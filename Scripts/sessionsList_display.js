import {loadExImage} from "../Scripts/Utilities/loadExImage.js";
import {exerciseList} from "../Scripts/exerciseStorage.js"
exerciseList.load();
import {sessionsList, CurrentSession} from "../Scripts/sessionsStorage.js"
sessionsList.load();

const containerEl = document.querySelector(".list_container");

const poolToText = (pool) =>{
    let text = "";
    for (const id of pool.exercisesId){
        text += exerciseList.get(id) ? exerciseList.get(id).name : "X";
        text += " ; "
    }
    return text;
}

const startSession = (sess) => {
    const currSess = new CurrentSession(sess);
    currSess.save();
    window.location.href = "session.html";
}

const  displaySessList = (contEl) => {

    contEl.innerHTML ="";
    if (!sessionsList.list.length){
        const pEl = document.createElement("p");
        pEl.textContent = "No sessions created yet!"
        contEl.appendChild(pEl);
        return
    }

    sessionsList.list.forEach(sess => {
        // 1 - Image
        const exTimgEl = document.createElement("div");
        exTimgEl.classList.add("session_thumbnail_img");

        const imgEl = loadExImage(sess.img_src)
            .then((imgEl) => exTimgEl.appendChild(imgEl))


        // 2 - Thumbnail bottom
        const thumbnailBtm = document.createElement("div");
        thumbnailBtm.classList.add("thumbnail-bottom");

        const h1El = document.createElement("h1");
        const arrowEl = document.createElement("span");
        arrowEl.textContent = "►  " // ▼

        h1El.appendChild(arrowEl);
        h1El.append(sess.name);
        
        thumbnailBtm.appendChild(h1El);

        // 3 - Expand part
        const thumbnailExpandEl = document.createElement("div");
        thumbnailExpandEl.classList.add("thumbnail-expand");
        thumbnailExpandEl.classList.add("hidden");

        thumbnailBtm.addEventListener("click",(e)=>{
            arrowEl.textContent = arrowEl.textContent=="►  " ? "▼  " : "►  ";
            thumbnailExpandEl.classList.toggle("hidden");
            //exTimgEl.classList.toggle("hidden");
            e.preventDefault();
            e.stopPropagation();
        })

        // 3.1 - Buttons

        const thumbnailBtnEl = document.createElement("div");
        thumbnailBtnEl.classList.add("thumbnail-btn");
        //PLay button
        const playBtnEl = document.createElement("button");
        playBtnEl.classList.add("play_btn");
        playBtnEl.textContent = "Play";
        playBtnEl.addEventListener("click",(e)=>{
            e.preventDefault(); // Prevent anchor default behavior
            e.stopPropagation();
            startSession(sess);
        })

        //Edit button
        const editBtnEl = document.createElement("button");
        editBtnEl.classList.add("edit_btn");

        const editImgEl = document.createElement("img");
        editImgEl.src="../Image/edit.png";
        editImgEl.classList.add("icon");
        editBtnEl.append(editImgEl);

        editBtnEl.addEventListener("click",(e)=>{
            sessionStorage.setItem("sessionToEdit",JSON.stringify(sess));
            window.location.href = "editSession.html"

            e.preventDefault(); // Prevent anchor default behavior
            e.stopPropagation();
        })

        //Delete button
        const deleteBtnEl = document.createElement("button");
        deleteBtnEl.classList.add("delete_btn");
       
        const deleteImgEl = document.createElement("img");
        deleteImgEl.src="../Image/delete.png";
        deleteImgEl.classList.add("icon");
        deleteBtnEl.append(deleteImgEl);

        deleteBtnEl.addEventListener("click",(e)=>{
            sessionsList.remove(sess);
            sessionsList.save();

            e.preventDefault(); // Prevent anchor default behavior
            e.stopPropagation();
            displaySessList(contEl); //Update display
        })

        thumbnailBtnEl.appendChild(playBtnEl);
        thumbnailBtnEl.appendChild(editBtnEl);
        thumbnailBtnEl.appendChild(deleteBtnEl);

        // 3.2 - Pools list

        const poolListEl = document.createElement("div");
        poolListEl.classList.add("pool_list");
        const ulEl = document.createElement("ul");
        
        for (const pool of sess.pools){
            const liEl = document.createElement("li");
            liEl.classList.add("pool");
            liEl.append(pool.name);

            const pEl = document.createElement("p");
            pEl.classList.add("ex_list");
            pEl.textContent = poolToText(pool);

            liEl.appendChild(pEl);

            ulEl.appendChild(liEl);
        }

        poolListEl.appendChild(ulEl);

        thumbnailExpandEl.appendChild(thumbnailBtnEl);
        thumbnailExpandEl.appendChild(poolListEl);

        // 4 - Anchor and thumbnail container

        const aEl = document.createElement("a");
        aEl.appendChild(exTimgEl);
        aEl.appendChild(thumbnailBtm);
        aEl.appendChild(thumbnailExpandEl);

        const exTbEl = document.createElement("div");
        exTbEl.classList.add("session_thumbnail");
        exTbEl.appendChild(aEl);

        contEl.appendChild(exTbEl);
    });

}

displaySessList(containerEl);