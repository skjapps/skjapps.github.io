// Get document Body
const body = document.body;

// Page elements
const navbarElement = document.querySelector('nav');
const navbarLogo = document.querySelector('.logo');
const navButtons = document.querySelectorAll('nav button');
const appbarElement = document.querySelector('appbar');
const appbarButtons = document.querySelectorAll('appbar button');

// 3d Card constants
const cardPane = document.querySelector('.card-pane');

var drawingSurface = document.getElementById( 'myCanvas' );
var renderer = new THREE.WebGLRenderer( { antialias: true, canvas: drawingSurface } );
renderer.setPixelRatio( window.devicePixelRatio );
const scene = new THREE.Scene();

const fov = 75; // Field of view
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const cardGeometry = new THREE.BoxGeometry(8, 0.01, 4); // Adjust the dimensions of the card
const cardMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('index/assets/img/Img29_(Windows_Vista).png') }), // Back
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('index/assets/img/Img29_(Windows_Vista) (1).png') }), // Front
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
];
const card = new THREE.Mesh(cardGeometry, cardMaterials);


// Current showings
const maindiv = document.querySelector('.main');
const mainList = document.querySelectorAll('.main > div');
const totalElements = mainList.length;
let currentIndex = 0;
let userInteracted = false;

//////////////////////
/*  Page Functions  */
//////////////////////

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


///////////////
/*  3d Card  */
///////////////

// Animation function
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the card
    card.rotation.x += 0.01;
    card.rotation.y += 0.001;

    renderer.render(scene, camera);
};

function threedimensioncard() {
    // Set up the scene
    scene.background = new THREE.Color(0xffffff); // Set background color to white

    // Set up the camera
    camera.position.z = 5;
    
    // Set up the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // Calculate dimensions based on the panels
    const panelWidth = document.querySelector('.main > div').offsetWidth;
    const panelHeight = document.querySelector('.main > div').offsetHeight;
    
    // Create a 3D card
    scene.add(card);
    
    // Initial card rotation
    card.rotation.x = 1;
    window.dispatchEvent(new Event('resize'));
    
    // Start the animation
    animate();
}

// Show the business card
function showCard() {
    // Your JavaScript code here
    if (maindiv.classList.contains('hidden-display')) {
        // Hide 3d card and show carousel
        
        // Main panel fades out to the bottom
        cardPane.classList.add('animate__fadeOutUp');
        
        setTimeout(() => {
            cardPane.classList.add('hidden-display');
            cardPane.classList.remove('animate__fadeOutUp');
            // Next panel fades in from the right
            maindiv.classList.remove('hidden-display');
            maindiv.classList.add('animate__fadeInUp');
        }, 500);

        // Reset the animation class from the next panel after the animation completes
        setTimeout(() => {
            maindiv.classList.remove('animate__fadeInUp');
        }, 1000);
    }
    else {
        // Show 3d card and hide carousel
                
        // Main panel fades out to the bottom
        maindiv.classList.add('animate__fadeOutDown');
        
        setTimeout(() => {
            maindiv.classList.add('hidden-display');
            maindiv.classList.remove('animate__fadeOutDown');
            // Next panel fades in from the right
            cardPane.classList.remove('hidden-display');
            cardPane.classList.add('animate__fadeInDown');
        }, 500);

        // Reset the animation class from the next panel after the animation completes
        setTimeout(() => {
            cardPane.classList.remove('animate__fadeInDown');
        }, 1000);
    }
    // Add any actions or logic you want to perform when the button is clicked
}

//////////////////////////////
/*  Crappy Custom Carousel  */
//////////////////////////////

// Event listeners for user interaction
document.querySelector('.main').addEventListener('touchstart', handleUserInteraction);
document.addEventListener('keydown', handleUserInteraction);

document.querySelector('.main').addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.querySelector('.main').addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe detected
        if (deltaX > 0) {
            // Swipe right
            navigateCarousel('right');
            console.log("right swiped");    
        } else {
            // Swipe left
            navigateCarousel('left');
            console.log("left swiped");
        }
    }
});

// Keyboard arrow key event handling
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        // Left arrow key pressed
        navigateCarousel('left');
        console.log("left pressed");
    } else if (e.key === 'ArrowRight') {
        // Right arrow key pressed
        navigateCarousel('right');
        console.log("right pressed");
    }
});

// Function to navigate the carousel
function navigateCarousel(direction) {
    if (direction === 'left') {
        // Navigate to the previous pane
        const nextIndex = (currentIndex - 1 + totalElements) % totalElements;
        animatePanels(currentIndex, nextIndex, 'animate__slideOutRight', 'animate__slideInLeft');
        currentIndex = nextIndex;
    } else if (direction === 'right') {
        // Navigate to the next pane
        const nextIndex = (currentIndex + 1) % totalElements;
        animatePanels(currentIndex, nextIndex, 'animate__slideOutLeft', 'animate__slideInRight');
        currentIndex = nextIndex;
    }
}

// Function to animate panels
function animatePanels(currentIndex, nextIndex, currentAnimationOut, nextAnimationIn) {
    const nextPanel = mainList[nextIndex];
    const currentPanel = mainList[currentIndex];

    // Current panel fades out to the left
    currentPanel.classList.add(currentAnimationOut);

    // After the fade-out animation completes, hide the current panel
    setTimeout(() => {
        currentPanel.classList.add('hidden-display');
        currentPanel.classList.remove(currentAnimationOut);
        // Next panel fades in from the right
        nextPanel.classList.remove('hidden-display');
        nextPanel.classList.add(nextAnimationIn);
    }, 500);

    // Reset the animation class from the next panel after the animation completes
    setTimeout(() => {
        nextPanel.classList.remove(nextAnimationIn);
    }, 1000);
}

// Update the indicator dot based on the current panel
function updateIndicator(currentIndex) {
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    indicatorDots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active-dot');
        } else {
            dot.classList.remove('active-dot');
        }
    });
}

// Call updateIndicator when navigating the carousel
function navigateCarousel(direction) {
    if (direction === 'left') {
        // Navigate to the previous pane
        const nextIndex = (currentIndex - 1 + totalElements) % totalElements;
        animatePanels(currentIndex, nextIndex, 'animate__slideOutRight', 'animate__slideInLeft');
        currentIndex = nextIndex;
    } else if (direction === 'right') {
        // Navigate to the next pane
        const nextIndex = (currentIndex + 1) % totalElements;
        animatePanels(currentIndex, nextIndex, 'animate__slideOutLeft', 'animate__slideInRight');
        currentIndex = nextIndex;
    }
    // Update the indicator dot
    updateIndicator(currentIndex);
}

// Function to handle user interaction
function handleUserInteraction() {
    userInteracted = true;

    // Reset userInteracted after 5 seconds if no further interaction
    setTimeout(() => {
        userInteracted = false;
    }, 5000); // Adjust the delay (in milliseconds) as needed
}

/////////////////////////
/*  Rest of the stuff  */
/////////////////////////

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
    
    // Function to start automatic carousel rotation
    const startCarouselRotation = () => {
        // Start the automatic carousel rotation
        const rotateCarousel = () => {
            if (!userInteracted) {
                navigateCarousel('right'); // Rotate to the next panel
            }
        };
        setInterval(rotateCarousel, 10000); // Adjust the interval (in milliseconds) as needed
    };

    // Start automatic carousel rotation after an extra delay for the original slide
    setTimeout(startCarouselRotation, 5000);
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

// Handle window resize
window.addEventListener('resize', function () {
  const newWidth = body.innerWidth - (body.innerWidth / 1.5);
  const newHeight = body.innerHeight - (body.innerHeight / 1.5);

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Main Container Parallax 
document.addEventListener('DOMContentLoaded', function() {

    // Run once for first time load
    setParallax(0, 0);
    
    // Play page load animations
    loadAnimation();

    // Update the indicator dot on page load
    updateIndicator(currentIndex);
    
    // Make 3d Card
    threedimensioncard();
    
});
