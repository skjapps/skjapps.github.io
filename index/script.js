// Get document Body
const body = document.body;

// Page elements
const navbarElement = document.querySelector('nav');
const navbarLogo = document.querySelector('.logo');
const navButtons = document.querySelectorAll('nav button');
const appbarElement = document.querySelector('appbar');
const appbarButtons = document.querySelectorAll('appbar button');

// Current showings
const mainList = document.querySelectorAll('.main > div');
const totalElements = mainList.length;
let currentIndex = 0;

// Load other htmls
function navigateTo(url) {
    window.location.href = url;
}

// Load into this page
function loadContent(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('content').innerHTML = this.responseText;
        }
    };
    xhr.send();
}

// Function to handle animation of panels
function animatePanels(currentIndex) {
    const nextIndex = (currentIndex + 1) % totalElements;
    const nextPanel = mainList[nextIndex];
    const currentPanel = mainList[currentIndex];

    firstDelay = 0;
    if (currentIndex==0) {
        firstDelay = 5000;
    }
    
    // Current panel fades out to the left
    setTimeout(() => {
        currentPanel.classList.add('animate__fadeOutLeft');
    }, 5000 + firstDelay);

    // After the fade-out animation completes, hide the current panel
    setTimeout(() => {
        currentPanel.classList.add('hidden-display');
        currentPanel.classList.remove('animate__fadeOutLeft');
        // Next panel fades in from the right
        nextPanel.classList.remove('hidden-display');
        nextPanel.classList.add('animate__fadeInRight');
    }, 5500 + firstDelay);

    // Reset the animation class from the next panel after the animation completes
    setTimeout(() => {
        nextPanel.classList.remove('animate__fadeInRight');
    }, 6000 + firstDelay);
}


// Function to set parallax effect
function setParallax(xPos, yPos) {
    const xOffset = (-200 * xPos) + 'px'; // Max movement in X
    const yOffset = (-50  * yPos) + 'px'; // Max movement in Y

    // Adding zoom effect
    const zoom = 120; // 110% of the original size

    body.style.backgroundPosition = `calc(50% + ${xOffset}) calc(50% + ${yOffset})`;
    body.style.backgroundSize = `auto ${zoom}%`;
    // Applying the zoom effect while maintaining aspect ratio
}

// Animation Routine
function loadAnimation() {
    
    // Animating Nav Buttons
    let i = 0;
    navButtons.forEach(button => {
        // Animate
        setTimeout(() => {
            button.classList.remove('hidden-visibility');
            button.classList.add('animate__animated', 'animate__backInDown');
        }, 500 + i);  // This delays the second animation by 1 second. Adjust as needed.
        i += 500;
    });
    
    // Animating Appbar buttons
    i = 0;
    appbarButtons.forEach(button => {
        // Animate
        setTimeout(() => {
            button.classList.remove('hidden-visibility');
            button.classList.add('animate__animated', 'animate__bounceInDown');
        }, 500 + i);  // This delays the second animation by 1 second. Adjust as needed.
        i += 500;
    });  
    
    // Start the carousel
    setInterval(() => {
        animatePanels(currentIndex);
        currentIndex = (currentIndex + 1) % totalElements; // Move to the next panel
    }, 10000);
    
}

// Mousemove event
document.addEventListener('mousemove', e => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    setParallax(mouseX, mouseY);
});

// Touch event
document.addEventListener('touchmove', e => {
    if (e.touches.length == 1) { // Only single touch
        const touchX = e.touches[0].clientX / window.innerWidth - 0.5;
        const touchY = e.touches[0].clientY / window.innerHeight - 0.5;

        setParallax(touchX, touchY);
    }
});

// Main Container Parallax 
document.addEventListener('DOMContentLoaded', function() {

    // Run once for first time load
    setParallax(0, 0);
    
    // Play page load animations
    loadAnimation();
    
});
