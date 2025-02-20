const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch weather data.');
    }
}

function displayWeather(data) {
    if (data.cod !== 200) {
        document.getElementById('data').innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const weatherInfo = `
        <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
    `;
    document.getElementById('data').innerHTML = weatherInfo;
}