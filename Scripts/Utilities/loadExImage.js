export async function loadExImage(url) {

    return new Promise((resolve)=>{
        const imgEl = document.createElement("img");
        imgEl.onload = () => resolve(imgEl);
        imgEl.onerror = () => {
            const defaultImgEl = document.createElement("img");
            defaultImgEl.src = "../Image/no_image.jpg";
            return resolve(defaultImgEl);
        };

        imgEl.src = url;
    })

}