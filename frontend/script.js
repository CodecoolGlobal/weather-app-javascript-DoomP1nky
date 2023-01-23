const loadEvent = (_) => {
  function getWeather(city) {
    // Fetch weather data for the selected city
    const API_KEY = 'ba8cd0c0041848dd91a191032232101';
    const API_URL = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const temperature = data.current.temp_c;
        const skyConditions = data.current.condition.text;
        const humidity = data.current.humidity;
      })
      .catch((error) => {
        //handle error if data is not available in the API
        console.log(error);
        alert('Sorry, the selected data is not available');
      });
  }
  const location = prompt();
  getWeather(location);
};
// you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener('load', loadEvent);
