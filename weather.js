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

	document.querySelector('#humidity').innerHTML = response.data.main.humidity;
	document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);

	document.querySelector('.description').innerHTML = response.data.weather[0].main;
}
//3
//4
function searchCity(city) {
	let apiKey = 'd944cfc973fb372d3ea53f75216ec984';
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(displayWeather);
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
	//	let units = 'imperial';

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
