const loadEvent = () => {
  const API_KEY = 'ba8cd0c0041848dd91a191032232101';
  let favs = [];
  const root = document.getElementById('root');

  // Create input field
  const citySelector = document.createElement('input');
  citySelector.type = 'search';
  citySelector.id = 'search';
  citySelector.placeholder = 'Select a city...';
  citySelector.autocomplete = 'on';
  root.appendChild(citySelector);

  // Create list element for search matches
  const matchList = document.createElement('ul');
  matchList.id = 'match-list';
  root.appendChild(matchList);

  // Create weather card container
  const weatherCard = document.createElement('div');
  weatherCard.id = 'weather-card';
  root.appendChild(weatherCard);

  // Create favorites container
  const favoritesList = document.createElement('ul');
  favoritesList.id = 'favorites-list';
  root.appendChild(favoritesList);

  // Create button to add city to favorites
  const handleFavoritesBtn = document.createElement('button');
  handleFavoritesBtn.innerText = 'Add to Favorites';
  handleFavoritesBtn.id = 'add-favorites';
  root.appendChild(handleFavoritesBtn);

  citySelector.addEventListener('input', citySelecting);
  citySelector.addEventListener('focus', citySelecting);

  handleFavoritesBtn.addEventListener('click', () => {
    favsValidating(document.getElementById('weather-card').firstChild.id)
  });

  citySelector.addEventListener('focus', () => {
    favoritesList.style.display = citySelector.value ? 'block' : 'none',
      handleFavoritesBtn.style.display = citySelector.value ? 'none' : 'block';
  });

  function citySelecting() {
    const API_URL = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${citySelector.value}`;
    favsValidating()
    if (!citySelector.value.length) {
      document.querySelector('#match-list').innerHTML = '';
      favs = Array.from(new Set(favs));
      favs.forEach((city) => {
        const li = document.createElement('li');
        li.innerText = city;
        li.addEventListener('click', () => displayWeather(city));
        matchList.appendChild(li);
      },
      );
    }
    if (citySelector.value.length >= 3) {

      // Fetch weather data for the selected city
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          matchList.innerHTML = '';
          // Hide favorites list
          handleFavoritesBtn.style.display = 'block';
          // Iterate through search matchess
          data.forEach((match) => {
            // Create list item for match
            const li = document.createElement('li');
            li.innerText = match.name;
            li.className = 'li-id';
            matchList.appendChild(li);
            //style cursor
            li.addEventListener('mouseover', (e) =>
              (e.target.style.cursor = 'zoom-in'));
            // Add event listener to list item
            li.addEventListener('click', (e) =>
              displayWeather(e.target.innerText));
          });

        });
    }
  }

  function displayWeather(cityName) {
    matchList.innerHTML = '';
    favoritesList.style.display = 'none';

    //Fetch the weather data for the selected city
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Clear previous weather data
        weatherCard.innerHTML = '';
        // Create elements to display weather data
        const cityName = document.createElement('p');
        cityName.className = 'city-name';
        cityName.innerText = `City: ${data.location.name}`;
        cityName.setAttribute('id', `${data.location.name}`);
        weatherCard.appendChild(cityName);

        const countryName = document.createElement('p');
        countryName.innerText = `Country: ${data.location.country}`;
        weatherCard.appendChild(countryName);

        const temperature = document.createElement('p');
        temperature.innerText = `Temperature: ${data.current.temp_c} °C`;
        weatherCard.appendChild(temperature);

        const humidity = document.createElement('p');
        humidity.innerText = `Humidity: ${data.current.humidity} %`;
        weatherCard.appendChild(humidity);

        const windSpeed = document.createElement('p');
        windSpeed.innerText = `Wind speed: ${data.current.wind_kph} Kph`;
        weatherCard.appendChild(windSpeed);

        const skyCondition = document.createElement('p');
        skyCondition.innerText = `Sky condition: ${data.current.condition.text}`;
        weatherCard.appendChild(skyCondition);

        const skyConditionImg = document.createElement('img');
        skyConditionImg.src = data.current.condition.icon;
        weatherCard.appendChild(skyConditionImg);

        citySelector.value = '';
      })
      .catch((error) => {
        //handle error if data is not available in the API
        console.log(error);
        alert('Sorry, the selected data is not available');
      });
  }
  function favsValidating(el) {
    if (!favs.includes(el)) {
      favs.push(el)
      handleFavoritesBtn.innerText = 'Remove from favorites'
    } else {
      for (let i = favs.length; i >= 0; i--) {
        if (favs[i] === el) {
          favs.splice(i, 1)
          handleFavoritesBtn.innerText = 'Add to Favorites'
        }
      }
    }
  }
};
// you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener('load', loadEvent);


