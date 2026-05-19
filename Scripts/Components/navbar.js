const bodyEl = document.querySelector("body");

const base = location.pathname.includes("/Pages/") ? "../" : "./";
const navbarPath = `${base}Pages/Components/navbar.html`;

const navbarhtml = fetch(navbarPath)
    .then((response) =>{
        return response.text()
    })
    .then((txt) =>{
        const el = document.createElement("div"); //Converting txt into node

        txt = txt.replaceAll("{{BASE}}", base);

        el.innerHTML = txt;
        for (const node of el.children){
            if (node.nodeName === "SCRIPT") {
                const scriptEl = document.createElement("script");
                for (const attribute of node.attributes){
                    scriptEl.setAttribute(attribute.name, attribute.value);
                }
                bodyEl.insertBefore(scriptEl, bodyEl.firstChild);
            }
            if(!document.querySelector(node.nodeName) || node.nodeName === "SCRIPT"){ // For example, if a header already exist, we don't insert the default one
                bodyEl.insertBefore(node.cloneNode(true),bodyEl.firstChild); //.cloneNode(true) to make a deep copy of the node, else it is removed from el and for loop is broken
            }
        }
    })
    .catch((error)=>{
        console.warn(`Error whiling fetching navbar : ${error}`);
    });