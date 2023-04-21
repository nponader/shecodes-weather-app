// Show Date
let now = new Date();

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = week[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let timeElement = document.querySelector("h5");
timeElement.innerHTML = `${day}, ${hours}:${minutes}`;

//  Search Form

function searchCity(event) {
  // search engine
  event.preventDefault();
  let cityElement = document.querySelector("#cityElement");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
  let cityName = cityInput.value;
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  //proof
  console.log(cityName);

  //get the temperature to the searched city
  function getCityTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let tempLineElement = document.querySelector("#current-temperature");
    tempLineElement.innerHTML = `${temperature}`;
    //proof
    console.log(temperature);
  }

  axios.get(cityUrl).then(getCityTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// use current location button

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3499ef150985eccadd080ff408a018df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(getPosition);

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let tempLineElement = document.querySelector("#current-temperature");
  tempLineElement.innerHTML = `${temperature}`;
  let changeCity = document.querySelector("#cityElement");
  console.log(response.data.name);
  changeCity.innerHTML = response.data.name;
}

function currentLocTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", currentLocTemp);

// Units Switch

let celsiusElement = document.querySelector("#celsiusElement");
let fahrenheitElement = document.querySelector("#fahrenheitElement");
let currentTemperatureElement = document.querySelector("#current-temperature");

function switchToCelsius(event) {
  event.preventDefault();
  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function switchToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
celsiusElement.addEventListener("click", switchToCelsius);
fahrenheitElement.addEventListener("click", switchToFahrenheit);

let celsiusTemperature = null;
