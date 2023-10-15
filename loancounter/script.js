// Specify a number to indicate how much has been spent in the academic year
const yearlyAmount = 9250 + 6860; // Tuition + Average maintaince loan 2020/21 from
// https://assets.publishing.service.gov.uk/media/619e227f8fa8f5037b09c5f9/avg-maintenance-loan-paid-by-domicile_2021.pdf 

// Get the counter elements
const counterPoundsElement = document.getElementById('counter-pounds');
const counterDecimalElement = document.getElementById('counter-decimal');

// Drum Roll sound effect
var drumRoll = new Audio('loancounter/assets/snd/drumroll.mp3');

// The title changes now
let debtShown = false;

// Year 0 = 1, 1 = 2, so on... for calculations
let yearOfUni = 0;

// Update the counter every second
setInterval(() => {
    // Get the current date
    const currentDate = new Date();
    
    // Define the start and end dates for the academic year (September to September)
    const academicYearStart = new Date(currentDate.getFullYear(), 8, 1); // Academic year starts on September 1st
    const academicYearEnd = new Date(currentDate.getFullYear() + 1, 7, 31); // Academic year ends on August 31st of the next year

    // Calculate the progress in the academic year as a decimal
    function calculateProgress() {
        if (currentDate < academicYearStart) {
            return 0;
        } else if (currentDate > academicYearEnd) {
            return 1;
        } else {
            const totalDaysInYear = (academicYearEnd - academicYearStart) / (1000 * 60 * 60 * 24); // Total days in the academic year
            const currentDay = (currentDate - academicYearStart) / (1000 * 60 * 60 * 24); // Number of days elapsed
            return currentDay / totalDaysInYear; // Progress as a decimal
        }
    }   
    
    // Calculate the amount spent in total over the years
    // The chaging bit + previous loan
    const amountSpent = (calculateProgress() * yearlyAmount) + (yearlyAmount * yearOfUni);
    
    // Extract the numbers with string functions / calculations
    const amountSpentString = amountSpent.toFixed(10).split('.');
    const wholeAmount = amountSpentString[0] + '.' + amountSpentString[1].slice(0,2); 
    const decimalAmount = amountSpentString[1].slice(2); 

    // Update the counter elements with the calculated amount
    // Display the pounds amount with two decimal places
    counterPoundsElement.textContent = "£" + wholeAmount;
    // Display the extra decimal places for dramatic effect
    counterDecimalElement.textContent = decimalAmount;
    
    // The webpage title is the loan so you dont forget :skull:
    if (debtShown) {
        document.title = `£ ${wholeAmount} 💀`;
    }
    
}, 10);

function selectYear(year) {    
    // using the thing
    yearOfUni = year - 1;
    
    // Removing prompt
    const promptContainer = document.querySelector('.js-Prompt .container');
    
    setTimeout(() => {
        promptContainer.classList.add('animate__animated', 'animate__fadeOut');
    }, 1000);  // This delays the second animation by 1 second. Adjust as needed.
    promptContainer.classList.add('hidden-display');
    
    // Counter Animations
    const debtContainer = document.querySelector('.js-Counter .container');
    const debtTitle = document.querySelector('.js-Counter .title');
    const debtAmountPounds = document.querySelector('#counter-pounds');
    const debtAmountDecimal = document.querySelector('#counter-decimal');
    
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
    
    // Show main pounds
    setTimeout(() => {
        debtAmountPounds.classList.remove('hidden-visibility');
        debtAmountPounds.classList.add('animate__animated', 'animate__fadeInUpBig');
    }, 3000);  // This delays the second animation by 1 second. Adjust as needed.
    
    // Delay for decimal counter
    setTimeout(() => {
        debtAmountDecimal.classList.remove('hidden-visibility');
        debtAmountDecimal.classList.add('animate__animated', 'animate__fadeInUp', 'animate__slower');
    }, 8000);  // This delays the second animation by 5 seconds.
    
    debtShown = true;
}

// When the DOM (content) is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    
    // Prompt Animations
    const promptContainer = document.querySelector('.js-Prompt .container');
    const promptTitle = document.querySelector('.js-Prompt .title');
    const prompt = document.querySelector('.js-Prompt .prompt');
    const yearButtons = document.querySelectorAll('.js-Prompt .year-buttons button');
    
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
    
});
