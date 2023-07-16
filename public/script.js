// Add this code at the top of your script.js file
const countryInput = document.getElementById('countryInput');
const countryList = document.getElementById('countries');

// Fetch a list of country names from the API and populate the datalist
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    const countryNames = data.map(country => country.name.common);
    countryNames.sort(); // Sort the country names alphabetically
    countryNames.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      countryList.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching country names:', error);
  });

function getCountryDetails() {
  const countryInput = document.getElementById('countryInput').value;
  const countryDetailsDiv = document.getElementById('countryDetails');

  // Clear the previous content in the countryDetailsDiv
  countryDetailsDiv.innerHTML = '';

  // Fetch data from your Node.js server
  fetch(`/country/${countryInput}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received from server:', data);
      if (Array.isArray(data) && data.length > 0) {
        const country = data[0];
        let languages;

        if (Array.isArray(country.languages)) {
          languages = country.languages.join(', ');
        } else if (typeof country.languages === 'object') {
          languages = Object.values(country.languages).join(', ');
        } else {
          languages = 'N/A';
        }

        countryDetailsDiv.innerHTML = `
          <h2>${country.name.common}</h2>
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population?.toLocaleString()}</p>
          <p>Region: ${country.region}</p>
          <p>Languages: ${languages}</p>
        `;
      } else {
        countryDetailsDiv.innerHTML = '<p>Country not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      countryDetailsDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    });
}
