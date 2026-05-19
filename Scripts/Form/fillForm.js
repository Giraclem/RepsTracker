import {highlightSelectedoptions} from "/Scripts/Form/multipleSelection.js";

const fillSelect = (selectEl,selectedOptionEl, list) => {

    if (!selectEl || !selectedOptionEl || !list){
        return
    }

    for (const el of list){
        let alreadyExist = false;
        for (const option of selectEl.options){
            if (option.value === el){
                option.selected = true;
                alreadyExist = true;
                break;
            }
        }
        if (!alreadyExist){
            const optEl = document.createElement("option");
            optEl.value = el;
            optEl.textContent = el;
            optEl.selected = true;
            selectEl.appendChild(optEl);
        }
    }

    highlightSelectedoptions(selectEl,selectedOptionEl);
}

export const fillForm = (contEl, formData) => {
    // Check if an object is to edit
    if (formData.empty){
        contEl.innerHTML = "";
        const pEl = document.createElement("p");
        pEl.textContent = `No ${formData.type} to edit`
        contEl.appendChild(pEl);
        return
    }

    // Fill inputs and select elements
    for (const prop in formData){
        // If the data is string or number, the form element is in an input or a textarea
        // If the data is string or number, the form element is in a select
        if (typeof(formData[prop])=="string" || typeof(formData[prop])=="number"){
            const inputEl = contEl.querySelector(`input[name="${prop}"],textarea[name="${prop}"]`);
            if (inputEl) inputEl.value = formData[prop];
        } else if(Array.isArray(formData[prop])){
            const selectEl = document.querySelector(`select[name="${prop}"]`);
            const selectedOptionEl = document.querySelector(`select[name="${prop}"] + .selected_options`);
            fillSelect(selectEl,selectedOptionEl,formData[prop]);
        }
    }
}

export const exToFormData = (ex) => {
    let formData = {}
    if(ex){
        formData = ex;
    } else {
        formData.empty =true;
    }
    formData.type = "exercise";
    return formData;
}

export const sessToFormData = (sess) => {
    let formData = {}
    if (sess){
        formData = sess;
        let numberOfPools = 0;
        for (const pool of sess.pools){
            numberOfPools +=1;
            formData[`Pool_${numberOfPools}_name`] = pool.name;
            formData[`Pool_${numberOfPools}_exercises`] = pool.exercisesId;
        }
        delete formData.pools;
    } else {
        formData.empty=true;
    }
    formData.type = "session";
    return formData;
}

