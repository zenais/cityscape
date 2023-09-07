import { useState, useEffect } from "react";
import React from "react";

function fetchCountriesAndCities() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch("https://countriesnow.space/api/v0.1/countries", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export default function CountryCities({ country, setChosenCity }) {
  const [cities, setCities] = useState(null);
  const [citiesToDisplay, setCitiesToDisplay] = useState(null);

  function handleSearchChange(e) {
    const filteredList = cities.filter((city) =>
      city.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCitiesToDisplay(filteredList);
  }

  function handleCityClick(e) {
    setChosenCity(e.target.id);
  }
  // var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };

  //   fetch("https://countriesnow.space/api/v0.1/countries", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));

  // var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };

  // fetch("https://countriesnow.space/api/v0.1/countries", requestOptions)
  //     .then(response => response.json())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));

  useEffect(() => {
    fetchCountriesAndCities().then((data) => {
      let countryData = data.data.find((c) => c.country === country);
      setCities(countryData.cities);
      setCitiesToDisplay(countryData.cities);
    });
  }, []);

  return (
    citiesToDisplay && (
      <div
        className="relative p-2 m-3 mt-5 max-w-sm ml-auto mr-auto h-[300px] grid grid-col-1 border border-gray-300 rounded-lg shadow-lg md:mt-auto dark:bg-gray-800 dark:border-gray-700 bg-cover bg-bottom hover:shadow-2xl transition-all duration-500 ease-in-out"
        style={{ backgroundImage: 'url("skyline.png")' }}
      >
        <input
          className="mr-auto ml-auto border-2 border-black h-6 text-center rounded-lg"
          type="text"
          onChange={handleSearchChange}
          placeholder="search for city"
        />
        <div id="city-scrollbar" className="overflow-y-scroll mt-5 text-center">
          {citiesToDisplay.map((city) => (
            <div
              className="hover:cursor-pointer"
              key={city}
              id={city}
              onClick={handleCityClick}
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    )
  );
}
