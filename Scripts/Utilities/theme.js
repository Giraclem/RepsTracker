export const themeList = ["light","dark","purple"]

export const readTheme = () => {
    const theme = localStorage.getItem("theme");
    return theme;
}

const htmlEl = document.querySelector("html");
export const updateThemeDisplay = () => {
    const theme = readTheme();
    htmlEl.setAttribute("data-theme",theme);
}

updateThemeDisplay()