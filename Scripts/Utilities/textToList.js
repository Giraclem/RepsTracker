// Take a text as argument, split into an html bullet list (<ul><li>)

export const textToListEl = (text) => {

    let list = text.split("-");
    list = list.map(element => element.trim());
    list = list.filter(element => element.length != 0);
    const listEl = document.createElement("ul");
    list.forEach(element => {
        const liEl = document.createElement("li");
        liEl.textContent = element;
        listEl.appendChild(liEl);
    });
    return listEl
}

