// $(document).foundation();


// On Weather Button Click Event
var weatherButton = document.querySelector('#weather-button');

weatherButton.addEventListener("click", function() {

// Location Input
var userInputEl = document.querySelector("#data-user-input")
var locationInput = userInputEl.value
console.log(locationInput)

  // Handle Weather Information
  // Fetch Open Weather Map API
var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' + locationInput + '&units=imperial&appid=f47cf665982ed682ac53eda751512847'

function getApi(requestWeatherUrl) {
    fetch(requestWeatherUrl)
      .then(function (response) {
          return response.json();
          
      })
      .then(function (data) {
        console.log(data);

        // Get weather data from API

        // Actual Temperature
        var temp = Math.ceil(data.main.temp);
        tempP = document.createElement('p');
        var tempEl = document.querySelector("#weather-div")
        tempEl.append(tempP);
        tempP.textContent = ("Current Temperature: " + temp + "\u00B0F");

        // Feels Like Temperature
        var feelsLike = Math.ceil(data.main.feels_like);
        feelsLikeP = document.createElement('p');
        var feelsLikeEl = document.querySelector("#weather-div")
        feelsLikeEl.append(feelsLikeP);
        feelsLikeP.textContent = ("Feels Like: " + feelsLike + "\u00B0F");

        // Weather Icon
        var code = data.weather[0].icon;
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

        // Fetch Smarty Street API
        // use Smarty Street to link between weather and COVID
        // Smarty Streets will not return any data that user sees

        var requestStreetsUrl = 'https://us-zipcode.api.smartystreets.com/lookup?auth-id=158a3abb-a44f-b8bc-3cc4-c9fb8649a188&auth-token=QSyyyobo0YXOP9beyZCp&zipcode=' + locationInput +'' 

        function getApi(requestStreetsUrl) {
          fetch(requestStreetsUrl)
            .then(function (response) {
                console.log(response);
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

              // ICU Headroom
              var newCases = data.metrics.icuHeadroomDetails.currentIcuCovid;
              console.log(newCases);
              newCasesP = document.createElement('p');
              var newCasesEl = document.querySelector("#covid-div");
              newCasesEl.append(newCasesP);
              newCasesP.textContent = ("ICU Headroom Used: " + newCases + "%");    

              // Recommendation Logic
              var count = 0;
              // Elements Check (e.g. is it raining or snowing?)
              // Temperature Check
              if (temp >= 80) {
                count = count + 1

              } else if (temp >= 65) {
                count = count + 2
              } else
                count = count + 3
              // Case Density Check
              if (newCases >= 10) {
                count = count + 3
              } else if (newCases >= 1) {
                count = count + 2
              } else 
                count = count + 1

              // Infection Rate Check
              if (infectionRate >= 1.1) {
                count = count + 3
              } else if (infectionRate >= 0.9) {
                count = count + 2
              } else {
                count = count + 1
              }
              // ICU Headroom
              if (newCases >= 60) {
                count = count + 3
              } else if (newCases >= 50) {
                count = count + 2
              } else 
                count = count + 1
                
              // Results
              if (count >= 9) {
                document.getElementById("answer-div").innerHTML = "Stay on the Couch";
              }  else if (count > 6) {
                document.getElementById("answer-div").innerHTML = "either way";
              } else {
                document.getElementById("danswer-div").innerHTML = "put on your pants";
              }
              console.log(data[0]);
              console.log(data[0].zipcodes);
              // var fips = data[0].zipcodes[0].county_fips;
              // console.log(fips);
            })        
        }
       
        getApi(requestStreetsUrl);
        
      });
    };
    getApi(requestWeatherUrl);
    
    });


    
// On COVID Button Click Event
var covidButton = document.querySelector('#covid-button');

covidButton.addEventListener("click", function() {

// Location Input
    
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

                  // ICU Headroom
                  var newCases = data.metrics.icuHeadroomDetails.currentIcuCovid;
                  console.log(newCases);
                  newCasesP = document.createElement('p');
                  var newCasesEl = document.querySelector("#covid-div");
                  newCasesEl.append(newCasesP);
                  newCasesP.textContent = ("ICU Headroom Used: " + newCases + "%");    

                  // Recommendation Logic
                  var count = 0;
                  // Elements Check (e.g. is it raining or snowing?)
                  // Temperature Check
                  if (temp >= 80) {
                    count = count + 1

                  } else if (temp >= 65) {
                    count = count + 2
                  } else
                    count = count + 3
                  // Case Density Check
                  if (newCases >= 10) {
                    count = count + 3
                  } else if (newCases >= 1) {
                    count = count + 2
                  } else 
                    count = count + 1

                  // Infection Rate Check
                  if (infectionRate >= 1.1) {
                    count = count + 3
                  } else if (infectionRate >= 0.9) {
                    count = count + 2
                  } else {
                    count = count + 1
                  }
                  // ICU Headroom
                  if (newCases >= 60) {
                    count = count + 3
                  } else if (newCases >= 50) {
                    count = count + 2
                  } else 
                    count = count + 1
                    
                  // Results
                  if (count >= 9) {
                    document.getElementById("answer-div").innerHTML = "Keep your pajamas on";
                  }  else if (count > 6) {
                    document.getElementById("answer-div").innerHTML = "either way";
                  } else {
                    document.getElementById("danswer-div").innerHTML = "put on your pants";
                  }


                })
          }; // COVID ends here
          getApi(requestCovidUrl);
        })
      
        
 

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


