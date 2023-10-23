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

// Main Container Parallax 
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');

    // Function to set parallax effect
    function setParallax(xPos, yPos) {
        const xOffset = (-200 * xPos) + 'px'; // Max movement in X
        const yOffset = (-50 * yPos) + 'px'; // Max movement in Y

        // Adding zoom effect
        const zoom = 125; // 110% of the original size

        container.style.backgroundPosition = `calc(50% + ${xOffset}) calc(50% + ${yOffset})`;
        container.style.backgroundSize = `auto ${zoom}%`;  // Applying the zoom effect while maintaining aspect ratio
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
    
    // Run once for first time load
    setParallax(0, 0);
    
    // Animation effects (h1 and h2)
    // var h1 = document.querySelector('h1');
    // var h2 = document.querySelector('h2');
    // h1.classList.add('fade-in');
    // h2.classList.add('fly-up');
});
