import {displayErrorBox} from "/Scripts/Utilities/popup.js"
import {exerciseList} from "/Scripts/exerciseStorage.js"
exerciseList.load();
import {sessionsList } from "/Scripts/sessionsStorage.js";
sessionsList.load();
import {highlightSelectedoptions} from "/Scripts/Form/multipleSelection.js"
import { readForm, formDataToSess} from "/Scripts/Form/readForm.js";
import {addPoolEntry} from "/Scripts/Form/addPoolEntry.js"


const addCategoryBtnEl = document.querySelector(".add_category_btn");
const addCategoryInputEl = document.querySelector("#add_category");
const selectCategoryEl = document.querySelector("#categories");
const selectedOptionsEl = document.querySelector(".categories_holder");

addCategoryBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    const newCategory = addCategoryInputEl.value;
    addCategoryInputEl.value = "";
    if (0 < newCategory.length && newCategory.length<20){
        for (const option of selectCategoryEl.selectedOptions){
            if (option.textContent == newCategory) {
                displayErrorBox("Category already exists")
                return
            }
        }
        const optionEl = document.createElement("option");
        optionEl.textContent = newCategory;
        optionEl.setAttribute("value",newCategory);
        optionEl.selected = true;
        selectCategoryEl.appendChild(optionEl);
        highlightSelectedoptions(selectCategoryEl,selectedOptionsEl);
        return 
    }
    if (newCategory.length) {
        displayErrorBox("Category's name is too long")
    } else {
        displayErrorBox("Empty category")
    }
})

const poolFieldsetEl = document.querySelector(".pools");
const createPoolBtnEl = document.querySelector(".new_pool_btn");

if (createPoolBtnEl && poolFieldsetEl) {
    createPoolBtnEl.addEventListener("click", (e)=>{
        e.preventDefault();
        addPoolEntry(poolFieldsetEl,createPoolBtnEl);
    })
}

const submitBtn = document.querySelector("#submit");
const formEl = document.querySelector("#new_session_form");

if (submitBtn){
    submitBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        const allInputEl = formEl.querySelectorAll("input[type='Number'],input[type='text'],input[type='url'] , select, textarea");
        const formData = readForm(allInputEl);

        const newSess = formDataToSess(formData)

        if (!newSess.isCorrect()){
            displayErrorBox("Something got wrong while creating the session, check inputs!")
            return
        }

        sessionsList.add(newSess);
        sessionsList.save();
        window.location.href = "../index.html";
    })
}


