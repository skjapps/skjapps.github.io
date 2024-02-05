// Specify a number to indicate how much has been spent in the academic year
const yearlyAmount = 9250 + 6860; // Tuition + Average maintaince loan 2020/21 from
// https://assets.publishing.service.gov.uk/media/619e227f8fa8f5037b09c5f9/avg-maintenance-loan-paid-by-domicile_2021.pdf 

// Get the counter elements
const counterPoundsElement = document.getElementById('counter-pounds');
const counterDecimalElement = document.getElementById('counter-decimal');

// Prompt elements
const promptContainer = document.querySelector('.js-Prompt .container');
const promptTitle = document.querySelector('.js-Prompt .title');
const prompt = document.querySelector('.js-Prompt .prompt');
const customYearHint = document.querySelector('.js-Prompt .custom-year-hint');
const yearButtons = document.querySelectorAll('.js-Prompt .year-buttons button');
const customYearButton = document.querySelector('.js-Prompt .custom-year-btn');
const customYearInput = document.querySelector('.js-Prompt .custom-year-btn input');

// Debt Counter Elements
const debtContainer = document.querySelector('.js-Counter .container');
const debtTitle = document.querySelector('.js-Counter .title');
const debtAmountPounds = document.querySelector('#counter-pounds');
const debtAmountDecimal = document.querySelector('#counter-decimal');
const motdText = document.querySelector('.js-Counter .motd');
const backgroundgif = document.getElementById('money_rain');
const confettigif = document.getElementById('confetti');
    
// Info Screen
const infoScreenContainer = document.querySelector('.info-screen-container');
const infoScreen = document.querySelector('.info-screen');

// Control Buttons
const darkModeButton = document.querySelector('.toggle-dark-mode');
const soundButton = document.querySelector('.toggle-sound'); // Changed the selector
const motdButton = document.querySelector('.toggle-motd');
const infoButton = document.querySelector('.info-button'); 
const soundHint = document.querySelector('.sound-hint');

// Dark Mode live change to system pref
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// The motd bottom text phrases.
const commentsArray = [
    "i should probably pay more attention to this lecture",
    "definitely haven't done the seminar pre-reading",
    "what on earth is even going on in this lab? ",
    "i hope this isn't on the exam lol",
    "this is gonna be hard to recover from lmao",
    "its fine i can do the essay on a couple energy drinks",
    "put it on the company card...? when no-one's looking.",
    "wow this isn't even funny anymore lol",
    "[ YOUR AD HERE ] - even I gotta pay this off lol",
    "...probably, it might be a bit more or less...",
    "...probably, based on average annual student loans...",
    "don't stare at it for too long! it just gets you down : /"
];

//Avg interest rates on student loans over the past years
// 2022-23 = 6.7%
// 2021-22 = 4.5%
// 2020-21 = 5.6%
// 2019-20 = 5.4%
// 2018-19 = 6.3%
// 2017-18 = 6.1%
// 2016-17 = 4.6%
// 2015-16 = 3.9%
// 2014-15 = 5.5%
// 2013-14 = 6.3%
// 2012-13 = 6.6%
// Array in decending years
const interestArray = [6.7, 4.5, 5.6, 5.4, 6.3, 6.1, 4.6, 3.9, 5.5, 6.3, 6.6];

// Drum Roll sound effect
var drumRoll = new Audio('loancounter/assets/snd/drumroll3.mp3');

// Crickets background sound effect
var crickets = new Audio('loancounter/assets/snd/crickets.mp3');
crickets.volume = 0.4;
crickets.loop = true;

// The title changes now
let debtShown = false;

// Toggle sound
let soundOn = true;

// Toggle bottom text
let motdOn = true;

// Year 0 = 1, 1 = 2, so on... for calculations
let yearOfUni = 0;

// Update the counter every second
setInterval(() => {
    // Get the current date
    const currentDate = new Date();

    // Define the academic year start and end dates
    let academicYearStart, academicYearEnd;

    if (currentDate.getMonth() < 8) { // If the current month is before September
        // The academic year started in the previous year
        academicYearStart = new Date(currentDate.getFullYear() - 1, 8, 1);
        academicYearEnd = new Date(currentDate.getFullYear(), 7, 31);
    } else {
        // The academic year started in the current year
        academicYearStart = new Date(currentDate.getFullYear(), 8, 1);
        academicYearEnd = new Date(currentDate.getFullYear() + 1, 7, 31);
    }

    // Calculate the progress in the academic year as a decimal
    function calculateProgress() {
        if (currentDate < academicYearStart) {
            return 0;
        } else if (currentDate > academicYearEnd) {
            return 1;
        } else {
            const totalDaysInYear = (academicYearEnd - academicYearStart) / (1000 * 60 * 60 * 24); // Total days in the academic year
            const currentDay = (currentDate - academicYearStart) / (1000 * 60 * 60 * 24); // Number of days elapsed since the start of the academic year
            return currentDay / totalDaysInYear; // Progress as a decimal
        }
    }
    
    // Calculate the amount spent in total over the years
    // The chaging bit + previous loan
    // Now with Interest!
    //  The compound interest formula is ((P*(1+i)^n) - P), where P is the principal, i is the annual interest rate, and n is the number of periods.
    let interest = 0;
    for(let i = 0; i < yearOfUni; i++) {
        interest += yearlyAmount * (1 + (interestArray[i] / 100));
    }
    const amountSpent = (calculateProgress() * yearlyAmount) + interest;
    
    // Extract the numbers with string functions / calculations
    const amountSpentString = amountSpent.toFixed(10).split('.');
    const wholeAmount = amountSpentString[0] + '.' + amountSpentString[1].slice(0,2); 
    const decimalAmount = amountSpentString[1].slice(2); 

    // Update the counter elements with the calculated amount
    // Display the pounds amount with two decimal places
    counterPoundsElement.textContent = "£ " + wholeAmount;
    // Display the extra decimal places for dramatic effect
    counterDecimalElement.textContent = decimalAmount;
    
    // The webpage title is the loan so you dont forget :skull:
    if (debtShown) {
        document.title = `${counterPoundsElement.textContent} 💀`;
    }
    
}, 10);

// Dark mode
darkModeButton.addEventListener('click', function() {
    const currentTheme = document.body.getAttribute('data-theme');
    
    // Cycling themes
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'black');
        infoScreen.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'black'); // Save preference
        darkModeButton.querySelector('i').className = "fa-solid fa-moon";
    } else if (currentTheme === 'black') {
        document.body.setAttribute('data-theme', 'light');
        infoScreen.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'light'); // Save preference
        darkModeButton.querySelector('i').className = "fa-regular fa-moon";
    } else {
        document.body.setAttribute('data-theme', 'dark');
        infoScreen.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'dark'); // Save preference
        darkModeButton.querySelector('i').className = "fa-solid fa-moon";
    }
});

// Live change to system dark mode
darkModeMediaQuery.addListener((e) => {
    const newColorScheme = e.matches ? "dark" : "light";
    document.body.setAttribute('data-theme', newColorScheme);
});

// Sound Toggle
soundButton.addEventListener('click', function() {    
    // Turn off sound if on, else turn it on
    if (soundOn) {
        drumRoll.volume = 0;
        crickets.volume = 0;
        crickets.pause();
        soundOn = false;
        soundButton.querySelector('i').className = "fa-solid fa-volume-xmark";
    } else {
        drumRoll.volume = 1;
        crickets.volume = 0.4;
        crickets.play();
        soundOn = true;
        soundButton.querySelector('i').className = "fa-solid fa-volume-high";
    }
});

// MOTD Toggle
motdButton.addEventListener('click', function() {    
    // Cycling themes
    if (motdOn) {
        motdText.classList.add('hidden-visibility');
        motdOn = false;
        motdButton.querySelector('i').className = "fa-regular fa-message";
    } else {
        motdText.classList.remove('hidden-visibility');
        motdOn = true;
        motdButton.querySelector('i').className = "fa-solid fa-message";
    }
});


// Info Button
infoButton.addEventListener('click', function() {    
    // Show info
    if (infoScreenContainer.classList.contains('hidden-display')) {
        infoScreenContainer.classList.remove('hidden-display');
        infoScreenContainer.classList.add('animate__fadeInDown');
        setTimeout(() => {
            infoScreenContainer.classList.remove('animate__fadeInDown');
        }, 500);
    } else {
        infoScreenContainer.classList.add('animate__fadeOutUp');
        setTimeout(() => {
            infoScreenContainer.classList.add('hidden-display');
            infoScreenContainer.classList.remove('animate__fadeOutUp');
        }, 500); 
    }
});

// Fading and changing the motd text
function changeMOTDWithFade(newText) {
    // First, fade out the text
    motdText.classList.add('animate__fadeOut');
    
    // After fade out, change the content
    setTimeout(() => {
        motdText.textContent = newText;
        // Adjust the font size of the motdText to fit within the container
        // Set a scaling factor (1.25) - 2x is maximum
        const fontSize = (debtContainer.offsetWidth / motdText.textContent.length) * 1.25;
        motdText.style.fontSize = fontSize + 'px';
        // Remove fadeOut class
        motdText.classList.remove('animate__fadeOut');
    }, 1000);
    
    // Then fade back in
    motdText.classList.add('animate__fadeIn');
}

// Custom Year Button
function handleCustomYearClick() {
    var year = document.getElementById('customYearInput').value;
    if (year.match(/^[0-9]{1}$/)) { // Validate if it's a single-digit number
        motdText.textContent = "...ok this is a pretty big number for you...";
        selectYear(year);
    } else {
        if (customYearHint.classList.contains('hidden-visibility')) {
            customYearHint.classList.add('animate__animated', 'animate__fadeInUp');
            customYearHint.classList.remove('hidden-visibility');
            setTimeout(() => {
                customYearHint.classList.remove('animate__fadeInUp');
            }, 1000);
        } else {
            customYearHint.classList.add('animate__headShake')
            setTimeout(() => {
                customYearHint.classList.remove('animate__headShake');
            }, 1000);
        }   
    }
}

// Pressing enter to press button
customYearInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        handleCustomYearClick();
    }
});

// Only numbers can be entered into the field
function validateInput(input) {
    input.value = input.value.replace(/[^0-9]/g, ''); 
}

// The main debt counter
function selectYear(year) {    
    // using the thing
    yearOfUni = year - 1;
    
    //Remove soundHint
    soundHint.classList.remove('animate__fadeInDown');
    soundHint.classList.add('animate__fadeOutUp');
    
    // Show the motd toggle and info buttons
    motdButton.classList.remove('hidden-display');
    motdButton.classList.add('animate__animated', 'animate__fadeInDown')
    setTimeout(() => {
        infoButton.classList.remove('hidden-display');
        infoButton.classList.add('animate__animated', 'animate__fadeInDown')
    }, 500);  // This delays the second animation by 1 second. Adjust as needed.
    
    // Fade out prompt
    setTimeout(() => {
        promptContainer.classList.add('animate__animated', 'animate__fadeOut');
    }, 1000);  // This delays the second animation by 1 second. Adjust as needed.
    promptContainer.classList.add('hidden-display');
    
    // Counter Animations
    // First make container display
    debtContainer.classList.remove('hidden-display');
    
    // Show debt prompt
    debtTitle.classList.remove('hidden-visibility');
    debtTitle.classList.add('animate__animated', 'animate__fadeInDown');
    
    // Play the drum roll
    setTimeout(() => {
        drumRoll.play().then(_ => {
            // Audio playback started
        }).catch(err => {
            // Audio playback failed
            console.log("Audio playback failed:", err);
        });
    }, 1000);  // This delays the second animation by 1 second. Adjust as needed.
    
    // Add some suspense elipses
    for(let i = 1; i <= 3; i++) {
        setTimeout(() => {
            debtTitle.textContent += '.'
        }, 1000*i);
    }
 
    // Show main pounds
    setTimeout(() => {
        debtAmountPounds.classList.remove('hidden-visibility');
        debtAmountPounds.classList.add('animate__animated', 'animate__fadeInUpBig');
    }, 3000);  // This delays the second animation by 1 second. Adjust as needed.

    //Show confetti gif and remove after
    setTimeout(() => {
        confettigif.classList.remove('hidden-display');
    }, 4000);  // This delays the second animation by 1 second. Adjust as needed.
    setTimeout(() => {
        confettigif.classList.add('animate__fadeOutDown');
    }, 4750);  // This delays the second animation by 1 second. Adjust as needed.
    setTimeout(() => {
        confettigif.classList.add('hidden-display');
    }, 7000);  // This delays the second animation by 1 second. Adjust as needed.
    
    // Delay for decimal counter
    setTimeout(() => {
        debtAmountDecimal.classList.remove('hidden-visibility');
        debtAmountDecimal.classList.add('animate__animated', 'animate__fadeInUp', 'animate__slower');
    }, 8000);  // This delays the second animation by 5 seconds.
    
    // Reveal motd + play crickets sound effect
    setTimeout(() => {
        if (motdOn) {
            motdText.classList.remove('hidden-visibility');
        }
        motdText.classList.add('animate__fadeIn', 'animate__slower');
        crickets.play().then(_ => {
            // Audio playback started
        }).catch(err => {
            // Audio playback failed
            console.log("Audio playback failed:", err);
        });
    }, 8000);  // This delays the second animation by 5 seconds.
    
    // Change motd constantly
    setTimeout(() => {
        // Remove this for re-adding later
        motdText.classList.remove('animate__fadeIn', 'animate__slower');
        // If MOTD enabled, keep changing text.
        setInterval(() => {    
            let newMOTD = commentsArray[Math.floor(Math.random() * commentsArray.length)];
            while (newMOTD == motdText.textContent) {
                newMOTD = commentsArray[Math.floor(Math.random() * commentsArray.length)];
            }
            changeMOTDWithFade(newMOTD);
        }, 5000);
    }, 13000);  // This delays the second animation by 5 seconds.
    
    // Show gif
    setTimeout(() => {
        setInterval(() => {
            if (backgroundgif.classList.contains('hidden-display')) {
                backgroundgif.classList.remove('hidden-display');
            }
            backgroundgif.classList.remove('animate__fadeOut');
            backgroundgif.classList.add('animate__fadeIn');
            // Set a timeout to hide the GIF after fade out animation
            setTimeout(() => {
                backgroundgif.classList.remove('animate__fadeIn');
                backgroundgif.classList.add('animate__fadeOut');
            }, 2000); // Match this duration to the length of the fade out animation
        }, 15000);
    }, 15000);  // This delays the second animation by 5 seconds.
    
    // shows debt on the page title
    debtShown = true;
}

// When the DOM (content) is loaded
// The year selector
document.addEventListener('DOMContentLoaded', (event) => {
    
    // Check if user prefers dark mode
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Set the theme accordingly
    if (userPrefersDark) {
        document.body.setAttribute('data-theme', 'black');
        infoScreen.setAttribute('data-theme', 'dark');
        darkModeButton.querySelector('i').className = "fa-solid fa-moon";
    } else {
        document.body.setAttribute('data-theme', 'light');
        infoScreen.setAttribute('data-theme', 'dark');
    }

    // Make sure input is always numeric only
    customYearInput.addEventListener('input', function() {
        validateInput(this);
    });
    
    // Prompt Animations
    // Show prompt
    setTimeout(() => {
        prompt.classList.add('animate__animated', 'animate__fadeInUp');
        prompt.classList.remove('hidden-visibility');
    }, 1000);  // This delays the second animation by 1 second. Adjust as needed.
    
    // Animating buttons
    let i = 0;
    yearButtons.forEach(button => {
        // Animate
        setTimeout(() => {
            button.classList.add('animate__animated', 'animate__fadeInUp');
            button.classList.remove('hidden-visibility');
        }, 2000 + i);  // This delays the second animation by 1 second. Adjust as needed.
        i += 500;
    });
    
    // Warning to turn sound off lol
    setTimeout(() => {
        soundHint.classList.add('animate__animated', 'animate__fadeInDown');
        soundHint.classList.remove('hidden-visibility');
    }, 3000);  // This delays the second animation by 1 second. Adjust as needed.
    
    // Custom Year button after 5 seconds
    setTimeout(() => {
        customYearButton.classList.add('animate__animated', 'animate__fadeInUp');
        customYearButton.classList.remove('hidden-visibility');
    }, 7000);  // This delays the second animation by 1 second. Adjust as needed.
    
});
