//1
function searchDate(date) {
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let dayIndex = date.getDay();
	let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];
	let day = days[dayIndex];

	return `${day[dayIndex]} ${hours}:${minutes}`;
}
//2
function displayWeather(response) {
	document.querySelector('h1').innerHTML = response.data.name;
	document.querySelector('.temperature').innerHTML = Math.round(response.data.main.temp);
	let temp = Math.round(response.data.main.temp);
	let weatherDisplay = document.querySelector(`#temperature`);
	weatherDisplay.innerHTML = `${temp}`;
	let heading = document.querySelector(`h1`);
	heading.innerHTML = `${response.data.name}`;
	let iconElement = document.querySelector('#icon');

	let broken_Clouds = 'images/Broken_Clouds.jpg';
	let few_Clouds = 'images/Few_Clouds.jpg';
	let rain = 'images/rain.jpg';

	document.querySelector('#humidity').innerHTML = response.data.main.humidity;
	document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);
	document.querySelector('.description').innerHTML = response.data.weather[0].main;
	iconElement.setAttribute('src', `images/${description}.jpg`);
	iconElement.setAttribute('alt', response.data.weather[0].description);
}
//3
function displayForecast(response) {
	let forecastElement = document.querySelector('#forecast');
	forecastElement.innerHTML = null;
	let forecast = null;

	for (let index = 0; index < 6; index++) {
		forecast = response.data.list[index];
		forecastElement.innerHTML = `
    <div class="col-2">
      <h3>
        12:00
      </h3>
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
	</div>`;
	}
}
//4
function searchCity(city) {
	let apiKey = 'd944cfc973fb372d3ea53f75216ec984';
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(displayWeather);

	apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={long}&
exclude={minutely,current,daily}&appid={apiKey}&units=imperial`;

	axios.get(apiUrl).then(displayForecast);
}
//5
function searchbarResults(event) {
	event.preventDefault();
	let city = document.querySelector('#searchbar');
	let displaycity = document.querySelector('h1');
	displaycity.innerHTML = `${city.value}`;
	searchCity(city.value);
}
//6
function searchLocation(position) {
	let long = position.coords.longitude;
	let lat = position.coords.latitude;

	let apiKey = 'd944cfc973fb372d3ea53f75216ec984';
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(displayWeather);
}

//7
function getCurrent(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}
//8
let dateElement = document.querySelector('.date');
let currentTime = new Date();
dateElement.innerHTML = searchDate(currentTime);
//9
let form = document.querySelector('#search-form');
form.addEventListener('submit', searchbarResults);
//10
let currentButton = document.querySelector('#current-location-btn');
currentButton.addEventListener('click', getCurrent);
