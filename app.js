fetch('api.openweathermap.org/data/2.5/weather?zip=94611,us&appid={d6023dc0b7605243dca140129a0bd39b}')
  .then(response => response.json())
  .then(data => console.log(data));

  api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={d6023dc0b7605243dca140129a0bd39b}