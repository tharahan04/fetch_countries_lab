// Fetch country data from RESTCountries API and return as JSON
const fetchCountriesData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching countries data:", error);
    }
  };
  
  // Populate the country list with information about each country
  const populateCountryList = (countries) => {
    const countryList = document.getElementById("country-list");
  
    // Clear the existing country list
    countryList.innerHTML = "";
  
    countries.forEach(country => {
      const li = document.createElement("li");
      li.textContent = `Name: ${country.name.common}, Population: ${country.population}`;
      countryList.appendChild(li);
    });
  };
  
  // Filter the country list based on user input
  const filterCountries = (filterValue, countries) => {
    const filteredCountries = countries.filter(country => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(filterValue);
    });
    populateCountryList(filteredCountries);
  };
  
  // Set up the app
  const setUp = async () => {
    const countriesData = await fetchCountriesData();
    populateCountryList(countriesData);
  
    const filterForm = document.getElementById("filter-form");
    filterForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const filterInput = document.getElementById("filter-input").value.toLowerCase();
      filterCountries(filterInput, countriesData);
    });
  };
  
  // Call the setUp function when the page loads
  window.addEventListener("load", setUp);
  