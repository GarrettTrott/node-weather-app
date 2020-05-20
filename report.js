//require http module
const http = require("http");

//reqiure https
const https = require("https");

function printError(error) {
  console.error(error.message);
}

function isValidZip(input) {
  return /^\d{5}$/.test(input);
}

function isValidCityState(input) {
  return /\b[A-Z][a-zA-Z]+[ ]?[A-Z]{2}\b/.test(input);
}

function printWeather(city, temp) {
  const message = `It is currently ${temp} degrees in ${city}`;
  console.log(message);
}

function getWeather(input) {
  let peram = "";
  if (isValidZip(input)) {
    peram = "zip=";
  } else if (isValidCityState(input)) {
    peram = "q=";
  } else {
    console.log(
      "Please enter valid city, state or zipcode to get current weather (example: 90210) (example: Portland OR)"
    );
  }
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?${peram}${input}&units=imperial&appid=0ca09cc294b445c91fbbe4f647178a23`;
  try {
    const request = https.get(apiURL, (response) => {
      if (response.statusCode === 200) {
        let body = "";
        // read the data
        response.on("data", (data) => {
          body += data.toString();
        });
        response.on("end", () => {
          try {
            // parse the data
            const report = JSON.parse(body);
            // print the data
            printWeather(report.name, report.main.temp);
          } catch (error) {
            printError(error);
          }
        });
      } else {
        const message = `There was a problem getting the weather for ${input} (${
          http.STATUS_CODES[response.statusCode]
        })`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });
    request.on("error", (error) =>
      console.error(`Problem with request: ${error.message}`)
    );
  } catch (error) {
    printError(error);
  }
}

module.exports.getWeather = getWeather;
