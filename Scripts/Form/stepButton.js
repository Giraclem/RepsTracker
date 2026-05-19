// ---- Implementing step btn actions
const numberEntryElList = document.querySelectorAll(".number_entry");

// add event listner to the btn and link it with the corresponding input
const AddStepBtnInteraction = (stepBtnEl,inputEl,sens) => {

    stepBtnEl.addEventListener("click",(e)=>{

        e.preventDefault();

        const currValue = Number(inputEl.value);
        const minValue = Number(inputEl.min);
        const maxValue = Number(inputEl.max);
        const step = Number(inputEl.step)

        const newValue = currValue + sens*step;

        if(maxValue>=newValue && newValue>=minValue){
            inputEl.value = newValue;
        }})};

numberEntryElList.forEach((entry) => {

    const stepBtnElList = entry.querySelectorAll(".step_btn");
    const inputEl = entry.querySelector("input")

    for (const step_btn of stepBtnElList){

        if (step_btn.classList.contains("plus")){
            AddStepBtnInteraction(step_btn,inputEl,1)
        } else if (step_btn.classList.contains("minus")){
            AddStepBtnInteraction(step_btn,inputEl,-1)
        }

    }
})