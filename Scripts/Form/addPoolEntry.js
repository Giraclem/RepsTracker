import { exerciseList } from "/Scripts/exerciseStorage.js";
import {addSelectionInteractions} from "/Scripts/Form/multipleSelection.js"

let numberOfPools = 0;
export const addPoolEntry = (contEl,createPoolBtnEl) => {
    numberOfPools +=1 ;
    const poolId = `Pool_${numberOfPools}`;

    const newPoolEl = document.createElement("div");
    newPoolEl.classList.add("large_field");
    newPoolEl.classList.add("pool_field");

    const entryEl = document.createElement("div");
    entryEl.classList.add("field");

    const nameLabelEl = document.createElement("label");
    nameLabelEl.setAttribute("for",poolId +"_name");
    nameLabelEl.textContent = `Pool ${numberOfPools}`;
    entryEl.append(nameLabelEl);

    const nameInputEl = document.createElement("input");
    nameInputEl.setAttribute("type","text");
    nameInputEl.setAttribute("placeholder","name");
    nameInputEl.setAttribute("name",poolId +"_name");
    nameInputEl.setAttribute("id",poolId +"_name");
    entryEl.append(nameInputEl);

    newPoolEl.append(entryEl);

    const labelEl = document.createElement("label");
    labelEl.setAttribute("for",poolId + "_exercises");
    labelEl.textContent = `Exercises`;
    newPoolEl.append(labelEl);

    const selectEl = document.createElement("select");
    selectEl.classList.add("selection_entry");
    selectEl.setAttribute("name",poolId+ "_exercises");
    selectEl.setAttribute("id",poolId + "_exercises");
    selectEl.setAttribute("multiple",true);

    for (const ex of exerciseList.list){
        const optionEl = document.createElement("option")
        optionEl.textContent = ex.name;
        optionEl.setAttribute("value",ex.id)

        selectEl.append(optionEl);
    }

    newPoolEl.append(selectEl);

    const ulEl = document.createElement("ul");
    ulEl.classList.add("selected_options");
    newPoolEl.append(ulEl);

    const separatorEl = document.createElement("div");
    separatorEl.classList.add("separator")

    addSelectionInteractions(selectEl,ulEl);
  
    contEl.insertBefore(newPoolEl,createPoolBtnEl);
    if (numberOfPools > 1) contEl.insertBefore(separatorEl,newPoolEl);
    
}