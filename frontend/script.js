const loadEvent = (_) => {
  function getWeather(city) {
    document.getElementById("loading-spinner").style.display = "block";
    // Fetch weather data for the selected city
    const API_KEY = 'ba8cd0c0041848dd91a191032232101';
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
  
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        let temperature = data.current.temp_c;
        let skyConditions = data.current.condition.text;
        let humidity = data.current.humidity;
      });
  }
  getWeather();
};
// you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener('load', loadEvent);
