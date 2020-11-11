// $(document).foundation();


// On Button Click Event
var button = document.querySelector('.button');

button.addEventListener("click", function() {

// Location Input
var userInputEl = document.querySelector("#data-user-input")
var locationInput = userInputEl.value
console.log(locationInput)



  // Handle Weather Information
  // Fetch Open Weather Map API
var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ locationInput + '&units=imperial&appid=f47cf665982ed682ac53eda751512847'

function getApi(requestWeatherUrl) {
    fetch(requestWeatherUrl)
      .then(function (response) {
          
          return response.json();
          
      })
      .then(function (data) {
        console.log(data);

        // Get weather data from API

        // Actual Temperature
        var temp = Math.ceil(data.list[0].main.temp);
        tempP = document.createElement('p');
        var tempEl = document.querySelector("#weather-div")
        tempEl.append(tempP);
        tempP.textContent = ("Current Temperature: " + temp + "\u00B0F");

        // Feels Like Temperature
        var feelsLike = Math.ceil(data.list[0].main.feels_like);
        feelsLikeP = document.createElement('p');
        var feelsLikeEl = document.querySelector("#weather-div")
        feelsLikeEl.append(feelsLikeP);
        feelsLikeP.textContent = ("Feels Like: " + feelsLike + "\u00B0F");

        // Weather Icon
        var code = data.list[0].weather[0].icon;
        console.log(code);
        var iconUrl = "http://openweathermap.org/img/wn/" + code + "@2x.png";
        
        var iconImg = document.createElement('img');
        iconImg.setAttribute("src", iconUrl);
        var IconEl = document.querySelector("#weather-div");
        IconEl.append(iconImg);

        // Make this work to check for rain or snow 
        // for (let i = 0; i < data.list[0].length; i++) {
        //   console.log(data.list[0][i]);
        // }

        var iconEl = document.querySelector("#weather-div");
        iconEl.append(iconImg);
        
        // Fetch covid API
        var fips = "06075"  // Should this be global or local? 
        var requestCovidUrl = 'https://api.covidactnow.org/v2/county/' + fips + '.json?apiKey=8e6e226fb8994445a2604105338264f5' 

        function getApi(requestCovidUrl) {
          fetch(requestCovidUrl)
            .then(function (response) {
                console.log(response.status);
                return response.json();
                
            })
            .then(function (data) {
              console.log(data);

              // Case Density
              var caseDensity = (data.metrics.caseDensity).toFixed(2);
              caseDensityP = document.createElement('p');
              var caseDensityEl = document.querySelector("#covid-div");
              caseDensityEl.append(caseDensityP);
              caseDensityP.textContent = ("Cases per 100,000 People: " + caseDensity); 

              // Infection Rate
              var infectionRate = (data.metrics.infectionRate).toFixed(2);
              infectionRateP = document.createElement('p');
              var InfectionRateEl = document.querySelector("#covid-div");
              InfectionRateEl.append(infectionRateP);
              infectionRateP.textContent = ("Infections per Typical Case: " + infectionRate);    

              // New Cases
              var newCases = data.actuals.newCases;
              console.log(newCases);
              newCasesP = document.createElement('p');
              var newCasesEl = document.querySelector("#covid-div");
              newCasesEl.append(newCasesP);
              newCasesP.textContent = ("New Cases per Day: " + newCases);    

            })
      }

      getApi(requestCovidUrl);

    });
};
getApi(requestWeatherUrl);
}); 

// Call Functions


// // Try to connect to Census Geocoder - this works

// fetch("https://eec19846-geocoder-us-census-bureau-v1.p.rapidapi.com/locations/onelineaddress?format=json&address=1%20Embarcadero%20street%20San%20Francisco&benchmark=Public_AR_Current", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "eec19846-geocoder-us-census-bureau-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "89214c67b8msh8e994452432b20bp1e9df8jsne2fa5de2365c"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
//       .then(function (data) {
//         console.log(data);
//       });
// // Try to connect to Census - this works

// var requestCensusUrl = 'https://api.census.gov/data/2019/acs/acs1?get=NAME,B01003_001E&for=county:*' 

// function getApi(requestCensusUrl) {
//     fetch(requestCensusUrl)
//       .then(function (response) {
//           console.log(response.status);
//           return response.json();
          
//       })
//       .then(function (data) {
//         console.log(data);

//       })
// }

// getApi(requestCensusUrl);

// Connect to NOAA Attempt 2 

// var requestNOAAUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/FIPS:37&token=dzzyEHyvoVDNgHjSHyjOrkASyAQBPeqp'

// function getApi(requestNOAAUrl) {
//     fetch(requestNOAAUrl)
//       .then(function (response) {
//           console.log(response.status);
//           return response.json();
          
//       })
//       .then(function (data) {
//         console.log(data);
//       });
//     };   
// getApi(requestNOAAUrl);

// Connect to NOAA Attempt 1

// var locationid = "37"

// fetch("https://national-weather-service.p.rapidapi.com/" + locationid + ", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "national-weather-service.p.rapidapi.com",
// 		"x-rapidapi-key": "89214c67b8msh8e994452432b20bp1e9df8jsne2fa5de2365c"
// 	}
// })
// .then(response => {
//   console.log(response);
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
// })
// .catch(err => {
// 	console.log(err);
// });


