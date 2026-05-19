import {displayErrorBox} from "/Scripts/Utilities/popup.js"
import {Exercise, exerciseList} from "/Scripts/exerciseStorage.js"
import {exLimitsValue} from "/Scripts/exerciseStorage.js"
import {readForm} from "/Scripts/Form/readForm.js"
exerciseList.load();

// Getting UI elements 

const formEl = document.querySelector("#new_exercise_form");
const allInputEl = formEl.querySelectorAll("input[type='Number'],input[type='text'],input[type='url'] , select, textarea");
const submitBtnEl = document.querySelector("#submit");

// Add Event listner to check name's size

const nameEl = formEl.querySelector("#name");
nameEl.addEventListener("input",()=>{
    const name = nameEl.value;
    if (exLimitsValue.nameLength.max > name.length && name.length>exLimitsValue.nameLength.min){
        nameEl.style.color = "var(--text-color)";
    } else {
        nameEl.style.color = "red";
    }
})

const submitForm = (e) => {
    e.preventDefault();
    // Get form data
    const formData =  readForm(allInputEl)
    const newEx = new Exercise();
    newEx.from(formData)
    // Check if the data are valid
    if (!newEx.isCorrect()){
        displayErrorBox("Something got wrong while creating the exercise, check inputs!");
        return
    }
    
    exerciseList.add(newEx);
    exerciseList.save();
    
    window.location.href = "../index.html";
}


// Binding form submitting to submit button
submitBtnEl.addEventListener("click",submitForm)