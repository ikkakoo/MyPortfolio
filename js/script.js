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
        localStorage.setItem("theme", "defaultTheme");
    });

    dark.addEventListener("click", () => {
        activateTheme(dark);
        localStorage.setItem("theme", "dark");
    });


    console.log(localStorage.getItem("theme"));
    () => {
        themeFileLink.setAttribute("href", `/styles/themes/${currentTheme}.css`);
    };
}

themeSelector();

// Async-Await for Projects Section
// fetch api
async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    
    // create project div
    function createProjects(data) {
        projectsWrapper = document.querySelector(".projects--wrapper");
        projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.classList.add(`project${data.id}`);
        projectHeader = document.createElement('h3');
        projectDescription = document.createElement('p');
        projectPhoto = document.createElement('img');
        projectHeader.classList.add("project--header");
        projectDescription.classList.add("project--body");
        descriptionDiv = document.createElement('div')
        descriptionDiv.classList.add('description')
        showHide = document.createElement('span')
        showHide.id = 'show--hide'

        projectsWrapper.appendChild(projectDiv);
        
        projectDiv.appendChild(projectPhoto);
        descriptionDiv.appendChild(projectHeader);
        descriptionDiv.appendChild(projectDescription);
        projectDiv.appendChild(descriptionDiv);

        projectDescription.innerHTML = data.body;
        projectHeader.innerHTML = data.title;
        projectPhoto.setAttribute('src', "./images/project1.png")
    }
    
    for (let i of data) {
        if (i.id <= 10) {
            createProjects(i)
        }
    }

    // View more functionality
    let loadMoreBtn = document.getElementById('load--more--btn');
    let showLessBtn = document.getElementById('show--less--btn');
    let currentItem = 3;

    loadMoreBtn.addEventListener('click', () => {
        let projectArr =[...document.querySelectorAll('.project')];
        for (let i in projectArr) {
            if (i < currentItem + 3) {
                projectArr[i].style.display = "block"
            }
        };
        currentItem += 3;
        if (currentItem >= projectArr.length) {
            loadMoreBtn.style.display = "none"
            showLessBtn.style.display = "block"
        }
        showLessBtn.onclick = function() {
            currentItem = 3;
            for (let i in projectArr) {
                if (i >= currentItem) {
                    projectArr[i].style.display = "none"
                }
            };
            showLessBtn.style.display = "none";
            loadMoreBtn.style.display = "block"
        }
    })
    
}

fetchData();