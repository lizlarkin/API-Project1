// $(document).foundation();


// Fetch Open Weather Map API
var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Long Beach&units=imperial&appid=f47cf665982ed682ac53eda751512847'

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
        var iconUrl = "http://openweathermap.org/img/wn/" + code + "@2x.png";
        
        var iconImg = document.createElement('img');
        iconImg.setAttribute("src", iconUrl);
        var IconEl = document.querySelector("#weather-div");
        IconEl.append(iconImg);

        // Make this work to check for rain or snow 
        for (let i = 0; i < data.list[0].length; i++) {
         
        }


        

        // var iconEl = document.querySelector("#weather-div");
        // iconEl.append(iconImg);
      

    });
    // Should this be global or local? 
    var fips = "06075";

// Fetch covid API
var requestCovidUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/SAhGjuIWSQLBOoUCmSIwdcrbJoOetNXd' 

function getApi(requestCovidUrl) {
    fetch(requestCovidUrl)
      .then(function (response) {
          console.log(response.status);
          return response.json();
          
      })
      .then(function (data) {
        console.log(data);


        // Infection Rate
        var infectionRate = data.metrics.infectionRate;
        console.log(infectionRate);


        

        // New Cases
        var newCases = data.actuals.newCases;
        console.log(newCases);

      })
}

getApi(requestCovidUrl);

}


// tempP = document.createElement('p');
// var tempEl = document.querySelector("#weather-div")
// tempEl.append(tempP);
// tempP.textContent = ("Current Temperature: " + temp + "\u00B0F");

getApi(requestWeatherUrl);


