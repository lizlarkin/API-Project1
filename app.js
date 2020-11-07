$(document).foundation();


// Fetch Open Weather Map API
var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=San Francisco&units=imperial&cnt=6&appid=(API KEY HERE)'

function getApi(requestWeatherUrl) {
    fetch(requestWeatherUrl)
      .then(function (response) {
          console.log(response.status);
          return response.json();
          
      })
      .then(function (data) {
        console.log(data);

    });
}

getApi(requestWeatherUrl);
var fips = "06075";

// Fetch covid API
var requestCovidUrl = 'https://api.covidactnow.org/v2/county/' + fips + '.json?apiKey=8e6e226fb8994445a2604105338264f5' 

function getApi(requestCovidUrl) {
    fetch(requestCovidUrl)
      .then(function (response) {
          console.log(response.status);
          return response.json();
          
      })
      .then(function (data) {
        console.log(data);
      })
}

getApi(requestCovidUrl);