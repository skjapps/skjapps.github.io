// Get document Body
const body = document.body;

// Page elements
const navbarElement = document.querySelector('nav');
const navbarLogo = document.querySelector('.logo');
const helpButton = document.querySelector('nav button');
const greetingText1 = document.querySelector('.greeting h1');
const greetingText2 = document.querySelector('.greeting h2');
const appbarElement = document.querySelector('appbar');
const appbarButtons = document.querySelectorAll('appbar button');

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
    
    // Animating About Button
    setTimeout(() => {
            helpButton.classList.remove('hidden-visibility');
            helpButton.classList.add('animate__animated', 'animate__backInLeft');
    }, 500);  // This delays the second animation by 1 second. Adjust as needed.
    
    // Animating Appbar buttons
    let i = 0;
    appbarButtons.forEach(button => {
        // Animate
        setTimeout(() => {
            button.classList.remove('hidden-visibility');
            button.classList.add('animate__animated', 'animate__bounceInDown');
        }, 500 + i);  // This delays the second animation by 1 second. Adjust as needed.
        i += 500;
    });
    
    // Show main pounds
//    setTimeout(() => {
//        debtAmountPounds.classList.remove('hidden-visibility');
//        debtAmountPounds.classList.add('animate__animated', 'animate__fadeInUpBig');
//    }, 3000);
//    
//    
    
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
