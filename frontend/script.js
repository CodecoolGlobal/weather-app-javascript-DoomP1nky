const loadEvent = (_) => {
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

  citySelector.addEventListener('input', () => {
    if (citySelector.value.length >= 3){

      // Fetch weather data for the selected city
      const API_KEY = 'ba8cd0c0041848dd91a191032232101';
      const API_URL = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${citySelector.value}`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          matchList.innerHTML = '';
          // Iterate through search matchess
          data.forEach((match) => {
          // Create list item for match
            const li = document.createElement('li');
            li.innerText = match.name;
            matchList.appendChild(li);

            //add eventlistener to list item
            li.addEventListener('click', (e) => {
              citySelector.value = e.target.innerText;
              matchList.innerHTML = '';
            });
          });
        });
    }
  });

};
//you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener('load', loadEvent);
