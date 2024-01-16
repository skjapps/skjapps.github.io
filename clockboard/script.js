// Get document Body
const body = document.body;

// Weather html elements
const weatherMain = document.getElementById('weather-info');
const weatherIconElement = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');

// Weather html elements
const clock = document.getElementById('clock');
const motd = document.getElementById('motd');

// Weather variables
const weatherAPIKey = '11fab3dcd0e9946415ed738aec6f363c';
const city = 'York';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`;

// Get curent weather info
function getWeatherData() {
    fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
        // Process weather data here
        console.log(data);

        // Update icon based on weather condition
        const weatherIcon = getWeatherIcon(data.weather[0].icon);
        weatherIconElement.className = weatherIcon;

        // Display temperature
        const temperature = data.main.temp;
        temperatureElement.textContent = `${temperature} °C`;
    })
    .catch(error => console.error('Error fetching weather data:', error));

}

// Weather icons from font awesome
function getWeatherIcon(iconCode) {
    switch (iconCode) {
        case '01d':
          return 'fas fa-sun'; // clear sky day
        case '01n':
          return 'fas fa-moon'; // clear sky night
        case '02d':
        case '02n':
        case '03d':
        case '03n':
          return 'fas fa-cloud'; // clouds
        case '04d':
        case '04n':
          return 'fas fa-cloud-meatball'; // broken clouds
        case '09d':
        case '09n':
          return 'fas fa-cloud-showers-heavy'; // rain showers
        case '10d':
        case '10n':
          return 'fas fa-cloud-sun-rain'; // rain and sun
        case '11d':
        case '11n':
          return 'fas fa-bolt'; // thunderstorm
        case '13d':
        case '13n':
          return 'fas fa-snowflake'; // snow
        case '50d':
        case '50n':
          return 'fas fa-smog'; // mist
        default:
          return 'fas fa-question-circle'; // unknown
      }
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

// Load Animation Routine
function loadAnimation() {
    
    // Reveal Clock
    setTimeout(() => {
        clock.classList.remove('hidden-visibility');
        clock.classList.add('animate__fadeIn', 'animate__slower')
    }, 1000);
    
    // Reveal Weather
    setTimeout(() => {
        weatherMain.classList.remove('hidden-visibility');
        weatherMain.classList.add('animate__fadeInDown', 'animate__slower')
    }, 4000);
    
}

// Fading and changing the motd text
function changeMOTDWithFade(newText) {
    // First, fade out the text
    motdText.classList.add('animate__fadeOut');
    
    // After fade out, change the content
    setTimeout(() => {
        motdText.textContent = newText;
        // Remove fadeOut class
        motdText.classList.remove('animate__fadeOut');
    }, 1000);
    
    // Then fade back in
    motdText.classList.add('animate__fadeIn');
}

// Update Clock time
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Ensure two-digit formatting for minutes and seconds
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    clock.textContent = timeString;
}
    
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// Moving background floaty
function updateParallaxWithSineWave() {
    const time = Date.now();
    const frequencyX = 0.0005; // Adjust the frequency for X motion
    const frequencyY = 0.0008; // Adjust the frequency for Y motion
    const frequencyX2 = 0.0008;
    const frequencyY2 = 0.0015; 

    const sineX = 0.5 * (Math.sin(time * frequencyX) + (0.5 * Math.sin(time * frequencyX2)));
    const sineY = Math.sin(time * frequencyY) - (0.2 * Math.sin(time * frequencyY2));

    setParallax(sineX, sineY);

    requestAnimationFrame(updateParallaxWithSineWave);
}

// Main Container Parallax 
document.addEventListener('DOMContentLoaded', function() {
    
    // Clock
    // Initial update
    updateClock();
    // Update the clock every second
    setInterval(updateClock, 1000);
    
    // Get weather data on load
    getWeatherData();
    
    // Start the animation
    requestAnimationFrame(updateParallaxWithSineWave);
    
    // Play page load animations
    loadAnimation();
    
});