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