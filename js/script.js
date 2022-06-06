// Bar Functionality Header section
const hamburger = document.querySelector(".hamburger");
const navlist = document.querySelector(".nav--list");
const listitem = document.querySelector(".bar");

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    navlist.classList.toggle("active");
    listitem.classList.toggle("active");

});

document.querySelectorAll(".nav--item").forEach(element => element.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navlist.classList.remove("active");
    listitem.classList.remove("active");
}));

// Change Theme
function themeSelector() {
    const defaultTheme = document.getElementById("defaultTheme");
    const dark = document.getElementById("dark");
    const themeFileLink = document.getElementById("theme--link");
    const currentTheme = localStorage.getItem("theme") || "defaultTheme";

    function activateTheme(themeName) {
        themeFileLink.setAttribute("href", `/styles/themes/${themeName.id}.css`);
    }

    defaultTheme.addEventListener("click", () => {
        activateTheme(defaultTheme);
        localStorage.setItem("theme", defaultTheme.id);
    });

    dark.addEventListener("click", () => {
        activateTheme(dark);
        localStorage.setItem("theme", dark.id);
    });


    // console.log(localStorage.getItem("theme"));
    // console.log(currentTheme);

}

themeSelector();

// Async-Await for Projects Section

