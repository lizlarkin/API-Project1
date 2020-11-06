var fips = "06075";

// Fetch Open Weather Map API
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