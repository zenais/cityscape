import { useState, useEffect } from "react";
import React from "react";
import CountryPictures from "./CountryPictures";

const apiWeatherPath = "http://api.weatherapi.com/v1/current.json";
const apiWeatherKey = "6f45d8fb0b634570a17115149232301";

export default function CountryWeather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [pictureUrls, setPictureUrls] = useState([]);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    fetch(apiWeatherPath + "?key=" + apiWeatherKey + "&q=" + city)
      .then((res) => res.json())
      .then((res) => setWeatherData(res));

    const fetchPictures = async () => {
      const response = await fetch(
        `https://api.pexels.com/v1/search/?query=${city}&per_page=10&page=1`,
        {
          headers: {
            Authorization:
              "F6lUA1sjD00srGoL8h7sf3EyjGcqsjf3TUqW298bimWVm5iRqxXNWm4C",
          },
        }
      );
      const data = await response.json();
      setPictureUrls(data.photos.map((photo) => photo.src.landscape));
    };
    fetchPictures();

    const interval = setInterval(() => {
      setBackgroundIndex((backgroundIndex + 1) % pictureUrls.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [city, pictureUrls.length, backgroundIndex]);

  return (
    weatherData && (
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), url(${pictureUrls[backgroundIndex]})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "50%",
        }}
        className="items-center p-2 mt-3 ml-auto mr-auto mb-3 max-w-sm text-center justify-items-center grid grid-col-1 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 ease-in-out md:h-[50%] md:mb-7"
      >
        <div className="grid items-center w-[60%] h-[60%] bg-gray-400 rounded-xl bg-opacity-30 backdrop-blur-sm">
          <div className="grid text-center justify-items-center">
            <div className="text-lg font-bold">{`${weatherData.location.name}, ${weatherData.location.country}`}</div>
            <div>
              <img
              className="w-30 m-0 justify-self-center"
                src={weatherData.current.condition.icon}
                alt="Weather Icon"
              />
            <div className="font-bold m-0">{`${weatherData.current.condition.text}`}</div>
            </div>
            <div className="font-bold mt-2">{`${weatherData.current.temp_c} °C`}</div>
          </div>
        </div>
      </div>
    )
  );
}
