import {Session, ExercisePool} from "/Scripts/sessionsStorage.js"
import {displayErrorBox} from "/Scripts/Utilities/popup.js"
import { exerciseList } from "/Scripts/exerciseStorage.js";
exerciseList.load();

export const readForm = (allInputEl) => {

    const object = {};

    allInputEl.forEach( (el) => {
        if (el.multiple){
            object[el.name]= []
            for (const opt of el.selectedOptions){
                object[el.name].push(opt.value);
            }
        } else {
            object[el.name] = el.value;
        }
    })
    return object;
}

export const formDataToSess = (formData) => {
    const newSess = new Session();

    const pools = [];
    // Reading all properties
    for (const input in formData){
        // Basic information > store it in the session
        if (["name","categories","img_src"].includes(input)) newSess[input] = formData[input];
        // Start with pool > group pool informations together

        // Read number of the pool
        // If already in pools array > update the properties
        // Else we create a new object and push it in the array

        // Pool name
        if (input.includes("Pool_") && input.includes("_name")){
            const currNumber = input.split("_")[1]; // Work because the name propert is in the form "Pool_X_name"
            const currPool = pools.find(el => el.number == currNumber) ? pools.find(el => el.number == currNumber) : {};
            if (currPool=={}) {
                currPool.name = formData[input];
            } else {
                currPool.number = currNumber;
                currPool.name = formData[input];
                pools.push(currPool)
            }
        }
        // Pool exercises
        if (input.includes("Pool_") && input.includes("_exercises")){
            const currNumber = input.split("_")[1]; // Work because the name propert is in the form "Pool_X_name"
            const currPool = pools.find(el => el.number == currNumber) ? pools.find(el => el.number == currNumber) : {};
            if (currPool) {
                currPool.exercises = formData[input];
            } else {
                currPool.number = currNumber;
                currPool.exercises = formData[input];
                pools.push(currPool)
            }
        }
    }

    // Create pools object and store it in the session

    for (const pool of pools){
        const newPool = new ExercisePool(pool.name);
        for (const exId of pool.exercises){
            const ex = exerciseList.get(exId);
            if (ex){
                newPool.add(ex);
            } else {
                displayErrorBox(exId + " don't exist in storage!")
                return
            }     
        }
        newSess.add(newPool);
    }
    return newSess
}