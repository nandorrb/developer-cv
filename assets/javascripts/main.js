/* Set picture in url base 64 */

const img = document.getElementById('home-img');

/*fetch('assets/pictures/profile.txt', {
    mode: 'no-cors',
    headers: {
        'Access-Control-Allow-Origin':'*'
    }
})
.then((response) => response.text())
.then((result) => {
    console.log('Success:', result);
    //img.src = result;
})
.catch((error) => {
    console.error('Error:', error);
});*/

/* Show Menu */

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    nav = document.getElementById(navId);

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu');
        });
    }
}

showMenu('nav-toggle', 'nav-menu');

/* Remove menu mobile */

const navLink = document.querySelectorAll('.nav_link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/* Scroll sections active link */

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/* Show scroll top */

function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 200) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollTop);

/* Light/Dark mode */

const themeButton = document.getElementById('theme-button');
let darkTheme = 'dark-theme';
let darkMode = localStorage.getItem("dark-mode");

function enableDarkMode() {
    document.body.classList.add(darkTheme);
    themeButton.classList.add('fa-sun');
    themeButton.classList.remove('fa-moon');
    localStorage.setItem("dark-mode", "enabled");
    document.getElementById('area_cv').className = document.getElementById('area_cv').className + ' sm-dark-back';
};

function disableDarkMode() {
    document.body.classList.remove(darkTheme);
    themeButton.classList.add('fa-moon');
    themeButton.classList.remove('fa-sun');
    localStorage.setItem("dark-mode", "disabled");
    document.getElementById('area_cv').className = document.getElementById('area_cv').className.replace(' sm-dark-back', '');
};

if (darkMode === "enabled") {
    enableDarkMode();
}

themeButton.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "disabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

/* Link PDF Download on Mobile screen depending of the light/dark mode */

const downloadButton = document.getElementById('download-button');

// downloadButton.addEventListener('click', () => {
//     if (document.body.classList.contains(darkTheme)) {
//         downloadButton.href = "assets/pdf/myResumeCV-dark.pdf";
//     } else {
//         downloadButton.href = "assets/pdf/myResumeCV-light.pdf";
//     }
// });

downloadButton.addEventListener('click', () => {

    let filename = document.body.classList.contains(darkTheme)
        ?'myResumeCV-dark.pdf'
        : 'myResumeCV-light.pdf';

    // html2pdf.js options for a continuous PDF without page breaks
    let opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 5,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
        },
        jsPDF: {
            unit: 'in',
            format: "a4",
            orientation: 'portrait',
        },
    };

    // html2pdf().from(areaCV).set(opt).save();
    html2pdf().from(areaCV).set(opt).toPdf().get('pdf').then(function (pdf) {
        // Create a Blob from the PDF
        const blob = pdf.output('blob');
        
        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);
        
        // Open the PDF in a new tab
        window.open(url);
        
        // Optional: Clean up and revoke the object URL after some time
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);
    });
})

/* Reduce the size and print on an A4 sheet */

function addScaleCV() {
    document.body.classList.add("scale-cv");
}

/* Remote the size when the CV is downloaded */

function removeScaleCV() {
    document.body.classList.remove("scale-cv");
}

/* Generate PDF */

// PDF generated area
let areaCV = document.getElementById('area_cv');


// Button
let resumeButton = document.getElementById("resume-button");

function generateResume() {
    let filename = document.body.classList.contains(darkTheme)
        ? 'myResumeCV-dark.pdf'
        : 'myResumeCV-light.pdf';

    // html2pdf.js options for a continuous PDF without page breaks
    let opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 5,
            useCORS: true,
            scrollX: 0,
            scrollY: 0
        },
        jsPDF: {
            unit: 'in',
            format: "a4",
            orientation: 'portrait',
        },
    };

    // html2pdf().from(areaCV).set(opt).save();
    html2pdf().from(areaCV).set(opt).toPdf().get('pdf').then(function (pdf) {
        // Create a Blob from the PDF
        const blob = pdf.output('blob');
        
        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);
        
        // Open the PDF in a new tab
        window.open(url);
        
        // Optional: Clean up and revoke the object URL after some time
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);
    });
}

// Action executed by clicking on the button => generation of the final PDF CV CV
resumeButton.addEventListener("click", () => {
    generateResume();
});
