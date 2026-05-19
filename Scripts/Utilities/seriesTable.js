const createSerieRow = (serie) => {

    const rowEl = document.createElement("tr");

    const seriestdEl = document.createElement("td");
    seriestdEl.textContent = serie.repetitions;

    const weighttdEl = document.createElement("td");
    weighttdEl.textContent = serie.weight;

    const recoverytdEl = document.createElement("td");
    recoverytdEl.textContent =  Math.floor(serie.recoveryTime);

    rowEl.appendChild(seriestdEl);
    rowEl.appendChild(weighttdEl);
    rowEl.appendChild(recoverytdEl);

    return rowEl;

}

export const createSeriesTable = (exercise) => {

    const tableEl = document.createElement("table");
    tableEl.classList.add("series");

    const theadEl = document.createElement("thead");

    const trEl = document.createElement("tr");

    const seriestdEl = document.createElement("td");
    seriestdEl.textContent = "REP";

    const weighttdEl = document.createElement("td");
    weighttdEl.textContent = `${exercise.weightUnit}`.toUpperCase();

    const recoverytdEl = document.createElement("td");
    recoverytdEl.textContent = "SEC";

    trEl.appendChild(seriestdEl);
    trEl.appendChild(weighttdEl);
    trEl.appendChild(recoverytdEl);

    theadEl.appendChild(trEl);

    tableEl.appendChild(theadEl);

    const tbodyEl = document.createElement("tbody");

    const series = exercise.series;
    series.forEach((serie)=>{
        const rowEl = createSerieRow(serie);
        tbodyEl.appendChild(rowEl);
    })
    
    tableEl.appendChild(tbodyEl);

    return tableEl;

}
