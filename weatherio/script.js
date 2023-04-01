const temp = document.getElementById("temp"),
  date = document.getElementById("date-time"),
  currentLocationn = document.getElementById("location"),
  condition = document.getElementById("condition"),
  rain = document.getElementById("rain"),
  mainIcon = document.getElementById("icon"),
  uvIndex = document.querySelector("uv-index"),
  uvText = document.querySelector("uv-index"),
  windSpeed = document.querySelector("uv-index"),
  sunRise = document.querySelector("uv-index"),
  sunSet = document.querySelector("uv-index"),
  humidity = document.querySelector("uv-index"),
  visibility = document.querySelector("uv-index"),
  humidityStatus = document.querySelector("uv-index"),
  airQuality = document.querySelector("uv-index"),
  airQualityStatus = document.querySelector("uv-index"),
  visibilityStatus = document.querySelector("uv-index");

  let currentCity = "";
  let currentUnit = "c";
  let hourlyorWeek = "Week";

  //Update Date Time

  function getDateTime() {
    let now = new Date(),
      hour = now.getHours(),
      minute = now.getMinutes();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesdey",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    hour = hour % 12;
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }

    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
  }

  date.innerText = getDateTime();
//update time every second
setInterval(() => {
  date.innerText = getDateTime();
}, 1000);

//function to get public ip with fetch
function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentCity = data.currentCity;
      //getWeatherData(data.city, currentUnit, hourlyorWeek);
    });
}
getPublicIp();

//function to get weather data

function getWeatherData(city, unit, hourlyorWeek) {
    const apiKey = "V9VGF9S6TVLHK749EKY3UL2J5";
    fetch(`
    https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
    {
        method: "GET",
    }
    )
    .then((response) => response.json())
    .then((data) => {
      let todey = data.currentConditions;
      if (unit === "c") {
        temp.innerText = todey.temp;
      } else {
        temp.innerText = celciusToFahrenheit(todey.temp);
      }
      currentLocationn.innerText = data.resolvedAddress;
      condition.innerText = todey.conditions;
      rain.innerText = "Perc - " + todey.precip + "%";
    });
}

//convert celcius to fahrenheit
function celciusToFahrenheit(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);
}
