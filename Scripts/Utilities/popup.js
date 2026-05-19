
const displayPopUp = (  msg,
                        {
                            font_color="black",
                            bg_color="rgba(255, 163, 168, 0.95)",
                            border_color="red",
                            img_src = "",
                            apparition_time_sec = 0.1,
                            show_time_sec = 2,
                            disparition_time_sec = 3
                        } = {}
                    ) => {

    const errorMsgEl = document.createElement("span");
    errorMsgEl.classList.add("popup_msg");
    errorMsgEl.textContent = msg;

    const pEl = document.createElement("p");
    pEl.append(errorMsgEl);

    const imgEl = document.createElement("img");
    if(img_src) imgEl.src  = img_src;

    const popupBoxEl = document.createElement("div");
    popupBoxEl.classList.add("popup_box");
    popupBoxEl.style.color = font_color;
    popupBoxEl.style.borderColor = border_color ;
    popupBoxEl.style.backgroundColor = bg_color ;
    popupBoxEl.appendChild(imgEl);
    popupBoxEl.appendChild(pEl);

    const bodyEl = document.querySelector("body");
    let container = document.querySelector(".popup_container");
    if(!container){
        container = document.createElement("div");
        container.classList.add("popup_container");
        bodyEl.appendChild(container);
    }
    container.insertBefore(popupBoxEl,container.firstChild);

    popupBoxEl.style.opacity = 0;
    popupBoxEl.style.transition = `opacity ${apparition_time_sec}s`;
    setTimeout(()=>{
        popupBoxEl.style.opacity = 1;
    },1);
    setTimeout(()=>{
        popupBoxEl.style.transition = `opacity ${disparition_time_sec}s`;
        popupBoxEl.style.opacity = 0;
    },show_time_sec*1000);
    setTimeout(()=>{
        bodyEl.removeChild(container)
    },(show_time_sec+disparition_time_sec)*1000);
}


export const displayErrorBox = (msg) => {
    displayPopUp(   msg,
                    {
                        font_color:"black",
                        bg_color:"rgba(255, 163, 168, 0.95)",
                        border_color:"red",
                        img_src : "../Image/Interface/cross.png"                              
                    }
                );
}

export const displaySucceedBox = (msg) => {
    displayPopUp(   msg,
                    {
                        font_color:"black",
                        bg_color:"rgba(178, 255, 163, 0.95)",
                        border_color:"green",
                        img_src : "../Image/Interface/check.png"                              
                    }
                );
}
