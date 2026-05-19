//Themes

import {themeList, updateThemeDisplay, readTheme} from "../Scripts/Utilities/theme.js"

const themeSelectEl = document.querySelector("#theme");
const currentTheme = readTheme()

themeList.forEach((theme)=>{
    const optionEl = document.createElement("option");
    if (theme===currentTheme){
        optionEl.selected = true;
    }
    optionEl.value = theme;
    optionEl.textContent = theme[0].toUpperCase() + theme.slice(1,theme.length); // Setting upper case to the first character
    themeSelectEl.appendChild(optionEl);
})

themeSelectEl.addEventListener("change",()=>{
    const theme = themeSelectEl.value;
    changeTheme(theme);
})

const saveTheme = (theme) => {
    if (!themeList.includes(theme)) {return}
    localStorage.setItem("theme",theme);
}

const changeTheme = (theme) => {
    saveTheme(theme)
    updateThemeDisplay()
}

// Import samples

import {loadDefaultExercise} from "../Scripts/loadSamples.js"
import {displaySucceedBox,displayErrorBox} from "../Scripts/Utilities/popup.js"

const handleLoadExerciseClick = async () => {
    const succeed = await loadDefaultExercise();
    if (succeed){
        displaySucceedBox("Default exercices successfully imported");
    } else {
        displayErrorBox("Error occurs while importing exercises")
    }
}

const loadExerciseBtnEl = document.querySelector("#load_default_exercises");
loadExerciseBtnEl.addEventListener("click", handleLoadExerciseClick)


import {loadDefaultSessions} from "../Scripts/loadSamples.js"

const handleLoadSessionClick = async () => {
    const succeed = await loadDefaultSessions();
    if (succeed){
        displaySucceedBox("Default sessions successfully imported");
    } else {
        displayErrorBox("Error occurs while importing sessions")
    }
}

const loadSessionsBtnEl = document.querySelector("#load_default_sessions");
loadSessionsBtnEl.addEventListener("click",handleLoadSessionClick)