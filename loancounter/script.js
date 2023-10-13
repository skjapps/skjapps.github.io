// Specify a number to indicate how much has been spent in the academic year
const yearlyAmount = 9250; // Replace with your specified amount

// Get the counter elements
const counterPoundsElement = document.getElementById('counter-pounds');
const counterDecimalElement = document.getElementById('counter-decimal');

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
    
    // Calculate the amount spent in the academic year
    const amountSpent = calculateProgress() * yearlyAmount;
    
    // Extract the numbers with string functions / calculations
    const wholeAmount = amountSpent.toFixed(10).slice(0,7); 
    const decimalAmount = amountSpent.toFixed(10).slice(7); 

    // Update the counter elements with the calculated amount
    // Display the pounds amount with two decimal places
    counterPoundsElement.textContent = wholeAmount;
    // Display the extra decimal places for dramatic effect
    counterDecimalElement.textContent = decimalAmount;
    
}, 10);
