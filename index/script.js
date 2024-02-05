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
    
    // Make 3d Card
    threedimensioncard();
    
});
