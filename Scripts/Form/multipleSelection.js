// ---- Implementing mutli-selection interaction


export const highlightSelectedoptions = (selectEl,selectionContainerEl) =>{
    selectionContainerEl.innerHTML = "";
    for (const option of selectEl.selectedOptions){
        const liEl = document.createElement("li");
        liEl.innerHTML = option.textContent + "<span class='close_cross'> ✖</span>";
        liEl.classList.add("option");
        liEl.addEventListener("click",()=>{
            liEl.remove();
            option.selected = false;
        });
        selectionContainerEl.appendChild(liEl);
    }
}

export const addSelectionInteractions = (selectEl,selectionContainerEl) => {
    selectEl.addEventListener("change",(e)=>{
        highlightSelectedoptions(selectEl,selectionContainerEl);
    });
}

const selectEl = document.querySelector(".selection_entry");
const selectionContainerEl = document.querySelector(".selected_options");

if (selectEl && selectionContainerEl){
    addSelectionInteractions(selectEl,selectionContainerEl);
}