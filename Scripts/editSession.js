import {displayErrorBox} from "../Scripts/Utilities/popup.js"
import {readForm, formDataToSess} from "../Scripts/Form/readForm.js"
import {fillForm, sessToFormData} from "../Scripts/Form/fillForm.js"
import { addPoolEntry } from "../Scripts/Form/addPoolEntry.js";
import { sessionsList } from "../Scripts/sessionsStorage.js";
sessionsList.load();

const sessionToEdit = JSON.parse(sessionStorage.getItem("sessionToEdit"));
// Clear storage before leaving page 
window.addEventListener("beforeunload",()=>{
    sessionStorage.removeItem("sessionToEdit");
})

const create_pool_forms = (sess) => {
    if (!sess){
        return;
    }
    const createPoolBtnEl = document.querySelector(".new_pool_btn");
    const poolFieldsetEl = document.querySelector(".pools");

    for (const pool of sess.pools){
        addPoolEntry(poolFieldsetEl,createPoolBtnEl);
    }
}

create_pool_forms(sessionToEdit);
const formEl = document.querySelector("#new_session_form");
const formData = sessToFormData(sessionToEdit);
fillForm(formEl, formData);
const editBtnEl = document.querySelector("#Edit");
if (editBtnEl){
    editBtnEl.addEventListener("click",(e)=>{
        e.preventDefault();
        const allInputEl = formEl.querySelectorAll("input[type='Number'],input[type='text'],input[type='url'] , select, textarea");
        const formData = readForm(allInputEl);
        const newSess = formDataToSess(formData)

        if (!newSess.isCorrect() || !newSess){
            displayErrorBox("Something got wrong while creating the session, check inputs!")
            return
        }

        sessionsList.replace(sessionToEdit,newSess);
        sessionsList.save();
        window.location.href = "../index.html";
    });
}


