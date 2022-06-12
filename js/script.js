// Bar Functionality Header section
// accessing dom elements
const hamburger = document.querySelector(".hamburger");
const navlist = document.querySelector(".nav--list");
const listitem = document.querySelector(".bar");

// burger icon functionality
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    navlist.classList.toggle("active");
    listitem.classList.toggle("active");

});

// hide menu on click
document.querySelectorAll(".nav--item").forEach(element => element.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navlist.classList.remove("active");
    listitem.classList.remove("active");
}));


// Change Theme
function themeSelector() {
    // accessing dom elements
    const defaultTheme = document.getElementById("defaultTheme");
    const dark = document.getElementById("dark");
    const themeFileLink = document.getElementById("theme--link");
    const currentTheme = localStorage.getItem("theme") || "defaultTheme";

    function activateTheme(themeName) {
        themeFileLink.setAttribute("href", `./styles/themes/${themeName.id}.css`); // change theme file in link tag
    }

    // activate and save chosen theme
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
        themeFileLink.setAttribute("href", `./styles/themes/${currentTheme}.css`);
    };
}

themeSelector();

// Async-Await for Projects Section
// fetch api + load more functionality
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
        projectPhoto.setAttribute('src', `./images/project${Math.floor(Math.random() * 3 + 1)}.png`)
    }
    
    for (let i of data) {
        if (i.id <= 10) {
            createProjects(i)
        }
    }

    // view more functionality
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
            showLessBtn.style.display = "flex"
        }
        showLessBtn.onclick = function() {
            currentItem = 3;
            for (let i in projectArr) {
                if (i >= currentItem) {
                    projectArr[i].style.display = "none"
                }
            };
            showLessBtn.style.display = "none";
            loadMoreBtn.style.display = "flex"
        }
    })
    
}

fetchData();

// Scroll Behaviour
// scroll to top
const scrollBtn = document.querySelector('.scroll--top');

scrollBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
})

document.addEventListener("scroll", (e) => {
    if (document.documentElement.scrollTop < 200) {
        scrollBtn.style.display = "none";
    } else {
        scrollBtn.style.display = "block"
    }
})
// navigation behaviour on scroll
const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        body.classList.remove("scroll--up")
    }

    if (currentScroll > lastScroll && !body.classList.contains("scroll--down")) {
        body.classList.remove("scroll--up");
        body.classList.add("scroll--down");
    }

    if (currentScroll < lastScroll && body.classList.contains("scroll--down")) {
        body.classList.remove("scroll--down");
        body.classList.add("scroll--up");
    }

    lastScroll = currentScroll;
})

// Form Validation
// accessing dom elements
const form = document.querySelector('form');
const fnameInput = document.querySelector('input[name="fname"]');
const lnameInput = document.querySelector('input[name="lname"]');
const emailInput = document.querySelector('input[name="email"]');
const subjectInput = document.querySelector('input[name="subject"]');
const messageInput = document.querySelector('textarea');
const logo = document.querySelector('.contact--logo')
const validFormResponse = document.querySelector('.valid--form--response')
const formContainer = document.querySelector('.form--conatiner')

// regex for email validation
const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

// declaring validation variables
let isValid = false;
let validationOn = false;

// helper functions
function resetInput(element) {
    element.classList.remove('invalid');
    element.nextElementSibling.classList.add('hidden');
}

function invalidateInput(element) {
    element.nextElementSibling.classList.remove('hidden');
    element.classList.add('invalid');
}

// validate inputs (fname,lname, email, textarea)
let validateInputs = () => {
    isValid = true;
    resetInput(fnameInput);
    resetInput(lnameInput);
    resetInput(emailInput);
    resetInput(messageInput);
    if (!validationOn) return;

    if (!fnameInput.value) {
        isValid = false;
        invalidateInput(fnameInput)
    }

    if (!lnameInput.value) {
        isValid = false;
        invalidateInput(lnameInput)
    }

    if (!isValidEmail(emailInput.value)) {
        isValid = false;
        invalidateInput(emailInput)
    }
    
    if (!messageInput.value) {
        isValid = false;
        invalidateInput(messageInput)
    }
}

// success response
form.addEventListener('submit', (e) => {
    validationOn = true;
    e.preventDefault();
    validateInputs();
    if (isValid) {
        formContainer.remove();
        validFormResponse.classList.remove('hidden');
    }
})

// ----
fnameInput.addEventListener('input', () => {
    validateInputs();
})
lnameInput.addEventListener('input', () => {
    validateInputs();
})
emailInput.addEventListener('input', () => {
    validateInputs();
})
messageInput.addEventListener('input', () => {
    validateInputs();
})

// Slider
const rightArrow = document.getElementById('right--arrow');
const leftArrow = document.getElementById('left--arrow');
const sliderContent1 = document.querySelector('.slider--content1')
const sliderContent2 = document.querySelector('.slider--content2')
const sliderContent3 = document.querySelector('.slider--content3')
const sliderWrapper = document.querySelector('.about--me')

let data = [
    {
        id: 1,
        text: sliderContent1.innerHTML
    },
    {
        id: 2,
        text: sliderContent2.innerHTML
    },
    {
        id: 3,
        text: sliderContent3.innerHTML
    },
]

let sliderIndex = 0;

function nextSlide () {
    sliderIndex++;
    if (sliderIndex > data.length - 1) {
        sliderIndex = 0
    }
    sliderWrapper.innerHTML = ''
    sliderWrapper.innerHTML = data[sliderIndex].text
}

function prevSlide () {
    sliderIndex--;
    if (sliderIndex < 0) {
        sliderIndex = data.length - 1
    }
    sliderWrapper.innerHTML = ''
    sliderWrapper.innerHTML = data[sliderIndex].text
}


rightArrow.addEventListener('click', () => {
    nextSlide();
})
leftArrow.addEventListener('click', () => {
    prevSlide();
})









