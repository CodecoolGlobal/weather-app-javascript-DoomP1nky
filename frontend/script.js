
const loadEvent = (_) => {
  let favs = []
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
  const addToFavoritesBtn = document.createElement('button');
  addToFavoritesBtn.innerText = 'Add to Favorites';
  addToFavoritesBtn.id = 'add-favorites';
  addToFavoritesBtn.style.display = 'none';
  root.appendChild(addToFavoritesBtn);

  const showFavouritesButton = document.createElement('button');
  showFavouritesButton.innerText = 'Show favourites';
  showFavouritesButton.id = 'show-favorites';
  showFavouritesButton.style.display = 'none';
  root.appendChild(showFavouritesButton);

  addToFavoritesBtn.addEventListener('click', () => {
    favs.push(document.getElementById('weather-card').firstChild.id)
    showFavouritesButton.style.display = 'block'
    console.log(favs)
  });

  citySelector.addEventListener('focus', () => {
    if (citySelector.value === '') {
      // Show favorites list
      favoritesList.style.display = 'block';
    } else {
      // Hide favorites list
      favoritesList.style.display = 'none';
      addToFavoritesBtn.style.display = 'block';
    }
  });

  citySelector.addEventListener('input', () => {
    if (citySelector.value.length >= 3) {

      // Fetch weather data for the selected city
      const API_KEY = 'ba8cd0c0041848dd91a191032232101';
      const API_URL = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${citySelector.value}`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          matchList.innerHTML = '';
          // Hide favorites list
          favoritesList.style.display = 'none';
          addToFavoritesBtn.style.display = 'block';
          // Iterate through search matchess
          data.forEach((match) => {
            // Create list item for match
            const li = document.createElement('li');
            li.innerText = match.name;
            li.style.border = 'solid';
            li.style.width = '100px';
            matchList.appendChild(li);

            li.addEventListener('mouseover', (e)=> e.target.style.cursor = 'zoom-in' );

            // Add event listener to list item
            li.addEventListener('click', (e) => {
              // Assign city name to input field
              citySelector.value = e.target.innerText;
              // Clear search matches
              matchList.innerHTML = '';
              favoritesList.style.display = 'none';


              //Fetch the weather data for the selected city
              const API_KEY = 'ba8cd0c0041848dd91a191032232101';
              const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${citySelector.value}`;

              fetch(API_URL)
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  // Clear previous weather data
                  weatherCard.innerHTML = '';
                  // Create elements to display weather data
                  const cityName = document.createElement('p');
                  cityName.innerText = `City: ${data.location.name}`;
                  cityName.setAttribute('id' , `${data.location.name}`)
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
                  //skyConditionImg.innerText = `Sky condition: ${data.current.condition.icon}`;
                  skyConditionImg.src = data.current.condition.icon;
                  weatherCard.appendChild(skyConditionImg);
                })
                .catch((error) => {
                  //handle error if data is not available in the API
                  console.log(error);
                  alert('Sorry, the selected data is not available');
                });
            });
          });

        })
        .catch((error) => {
          //handle error if data is not available in the API
          console.log(error);
          alert('Sorry, the selected data is not available');
        });
    }
  });
};

// you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener('load', loadEvent);
