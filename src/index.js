function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day} ${hours}:${minutes}`;
}
function getDegree(response) {
  let temperature = document.querySelector("#temp");
  let finalResponse = response.data.temperature.current;
  let currentTemp = Math.round(finalResponse);
  let description = document.querySelector("#position");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconUrl = document.querySelector("#icon");

  wind.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.temperature.humidity;
  description.innerHTML = response.data.condition.description;
  temperature.innerHTML = currentTemp;
  currentTime.innerHTML = formatDate(date);
  iconUrl.innerHTML = `<img src="${response.data.condition.icon_url}"  class="weather-app-icon" />`;
  getforecast(response.data.city);
}

function callCity(city) {
  let apiKey = "7e0t14a370o3b9095a4ff16f06c1bee0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(getDegree);
}

function weather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let cityValue = cityInput.value;
  let fianal = document.querySelector("#fianal-city");

  fianal.innerHTML = cityValue;
  callCity(cityValue);
}
function getforecast(city) {
  let apiKey = "7e0t14a370o3b9095a4ff16f06c1bee0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(weekDays);
}
function getWeekDay(timestamp) {
  let dates = new Date(timestamp * 1000);
  let exactDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return exactDay[dates.getDay()];
}

function weekDays(response) {
  let forecast = "";

  let days = response.data.daily;
  days.forEach(function finalForecast(day, index) {
    if (index < 5) {
      forecast =
        forecast +
        `
      <div class="weather-forecast">
        <div class="week">${getWeekDay(day.time)}</div>
        <div ><img src="${day.condition.icon_url}"  class="weather-icon"> </div>
        <span class="max">${Math.round(day.temperature.maximum)}°</span>
        <span class="min">${Math.round(day.temperature.minimum)}°</span>
      </div>
    `;
    }
  });

  let select = document.querySelector("#forcastid");
  select.innerHTML = forecast;
}

let selectForm = document.querySelector("#form");

selectForm.addEventListener("submit", weather);

callCity("paris");
