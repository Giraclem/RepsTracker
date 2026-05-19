import {displayErrorBox} from "../Scripts/Utilities/popup.js"
import {readForm} from "../Scripts/Form/readForm.js"
import {fillForm, exToFormData} from "../Scripts/Form/fillForm.js"
import {Exercise, exerciseList} from "../Scripts/exerciseStorage.js"
exerciseList.load();

const exerciseToEdit = JSON.parse(sessionStorage.getItem("exerciseToEdit"));
// Clear storage before leaving page
window.addEventListener("beforeunload",()=>{
    sessionStorage.removeItem("exerciseToEdit");
})

const submitEdit = () => {
    // Get form data
    const formData = readForm(allInputEl);
    const updatedEx = new Exercise();
    updatedEx.from(formData)

    // Check if the data are valid
    if (!updatedEx.isCorrect()){
        displayErrorBox("Something got wrong while editing the exercise, check inputs!")
        return
    }

    exerciseList.replace(exerciseToEdit,updatedEx);

    exerciseList.save();

    window.location.href = "../index.html";
}

const formEl = document.querySelector("#edit_exercise_form");
const allInputEl = formEl.querySelectorAll("input[type='Number'],input[type='text'],input[type='url'] , select, textarea");
const formData = exToFormData(exerciseToEdit)
fillForm(formEl, formData);
const editBtnEl = document.querySelector("#submit");
if (editBtnEl){
    editBtnEl.addEventListener("click",(e)=>{
        e.preventDefault();
        submitEdit();
    });
}
