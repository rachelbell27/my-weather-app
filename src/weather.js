/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};

let entryCity = prompt("Enter a city name");
let currentCity = entryCity.toLowerCase().trim();
console.log(currentCity);
if (weather[currentCity]) {
  let cTemp = Math.round(weather[currentCity].temp);
  let fTemp = Math.round((weather[currentCity].temp * 9) / 5 + 32);
  let humid = weather[currentCity].humidity;
  let displayCity = entryCity.trim();
  console.log(cTemp);
  console.log(fTemp);
  console.log(humid);
  alert(
    `It is currently ${cTemp}°C (${fTemp}°F) in ${displayCity} with a humidity of ${humid}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${currentCity}`
  );
}
*/

let key = "d2e2c79fc9c89249abd1e2c823668949";
let units = "imperial";
let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
let displayDate = document.querySelector("#display-date");
let now = new Date();
let cityForm = document.querySelector("#city-form");

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (now.getMinutes() < 10) {
    minute = "0" + now.getMinutes();
  }
  return `${weekDay} ${hour}:${minute}`;
}

function handleWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let displayTemp = document.querySelector("#city-temp");
  let displayCity = document.querySelector("#display-city");
  console.log(temp);
  console.log(cityName);
  displayTemp.innerHTML = `${temp}°F`;
  displayCity.innerHTML = cityName;
}

function getWeather(city) {
  axios
    .get(`${apiRoot}units=${units}&q=${city.value}&appid=${key}`)
    .then(handleWeather);
}

function changeCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input");
  if (newCity.value) {
    getWeather(newCity);
  } else {
    alert("Please enter a city!");
  }
}

displayDate.innerHTML = formatDate(now);

cityForm.addEventListener("submit", changeCity);
