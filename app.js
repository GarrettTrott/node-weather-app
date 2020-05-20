//require http module
const http = require("http");

//reqiure https
const https = require("https");

function printError(error) {
  console.error(error.message);
}
//converts kelvin temps to fahrenheit
function kelToF(kelvin) {
  return (kelvin - 273.15) * 1.8 + 32;
}

function printWeather(city, temp) {
  const message = `It is currently ${temp} degrees in ${city}`;
  console.log(message);
}

function getWeather() {}
try {
  const request = https.get(
    "https://api.openweathermap.org/data/2.5/weather?zip=97213&appid=0ca09cc294b445c91fbbe4f647178a23"
  );
}
