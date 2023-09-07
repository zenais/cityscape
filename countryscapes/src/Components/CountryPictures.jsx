import React, { useState, useEffect } from "react";

const CountryPictures = ({ city }) => {
  const [pictures, setPictures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_KEY = "F6lUA1sjD00srGoL8h7sf3EyjGcqsjf3TUqW298bimWVm5iRqxXNWm4C";

  useEffect(() => {
    const fetchPictures = async () => {
      const response = await fetch(
        `https://api.pexels.com/v1/search/?query=${city}&per_page=10&page=1`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      const data = await response.json();
      setPictures(data.photos);
    };
    fetchPictures();
  }, [city, API_KEY]);

  useEffect(() => {
    // Set an interval to auto play the carousel
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % pictures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, pictures]);

  const prevPicture = () => {
    setCurrentIndex((currentIndex - 1 + pictures.length) % pictures.length);
  };

  const nextPicture = () => {
    setCurrentIndex((currentIndex + 1) % pictures.length);
  };

  return (
    <div className="relative w-[65%] h-[50%] mx-auto border border-black rounded-lg overflow-hidden">
      {pictures.length > 0 && (
        <>
          {pictures.map((picture, index) => (
            <img
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              src={picture.src.landscape}
              alt="Pexels Picture"
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-between">
            <button
              className="absolute z-10 left-0 px-4 py-2 text-white bg-black rounded-full focus:outline-none"
              onClick={prevPicture}
            >
              Prev
            </button>
            <button
              className="absolute z-10 right-0 px-4 py-2 text-white bg-black rounded-full focus:outline-none"
              onClick={nextPicture}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CountryPictures;
