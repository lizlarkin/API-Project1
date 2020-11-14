// On Weather Button Click Event
var button = document.querySelector('.button');

button.addEventListener("click", function() {

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
            .then(function (streetsData) {
              console.log(streetsData);
              var fips = streetsData[0].zipcodes[0].county_fips;
              console.log(fips);


              // Try Covid Here
// Fetch covid API
var requestCovidUrl = 'https://api.covidactnow.org/v2/county/' + fips + '.json?apiKey=8e6e226fb8994445a2604105338264f5' 
console.log(requestCovidUrl)

function getApi(requestCovidUrl) {
  
  fetch(requestCovidUrl)
    .then(function (response) {
        console.log(response.status);
        return response.json();
        
    })
    .then(function (COVIDdata) {
      console.log(COVIDdata);

      // Case Density
      var caseDensity = (COVIDdata.metrics.caseDensity).toFixed(2);
      caseDensityP = document.createElement('p');
      var caseDensityEl = document.querySelector("#covid-div");
      caseDensityEl.append(caseDensityP);
      caseDensityP.textContent = ("Cases per 100,000 People: " + caseDensity); 

      // Infection Rate
      var infectionRate = (COVIDdata.metrics.infectionRate).toFixed(2);
      infectionRateP = document.createElement('p');
      var InfectionRateEl = document.querySelector("#covid-div");
      InfectionRateEl.append(infectionRateP);
      infectionRateP.textContent = ("Infections per Typical Case: " + infectionRate);    

      // ICU Headroom
      var newCases = COVIDdata.metrics.icuHeadroomDetails.currentIcuCovid;
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
        } // streets API ends here
       
        getApi(requestStreetsUrl);
        
      });
    }; //weather API ends here

    
// Location Input
    
            
          
          getApi(requestWeatherUrl);
        })