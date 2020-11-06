fetch('https://data.covidactnow.org/latest/us/counties/06001.NO_INTERVENTION.timeseries.json')
  .then(response => response.json())
  .then(data => console.log(data));

