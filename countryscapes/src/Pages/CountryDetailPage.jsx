import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import CountryWeather from "../Components/CountryWeather";
import CountryCities from "../Components/CountryCities";
import Currency from "../Components/Currency";
import CountryPictures from "../Components/CountryPictures";
import CountryCard from "../Components/CountryCard";

export default function CountryDetailPage() {
  const location = useLocation();
  const data = location.state;

  const [chosenCity, setChosenCity] = useState(data.capital[0]);
  const [targetCurrency, setTargetCurrency] = useState(null);
  const [country, setCountry] = useState(null);

  const { flags, name, population, languages, currencies, capital } = data
    ? data
    : austriaData;

  useEffect(() => {
    setCountry(data);
    const curr = Object.keys(data.currencies)[0];
    setTargetCurrency(curr);
  }, []);

  // console.log(data)
  // console.log(targetCurrency)

  return (
    // <div className="ml-auto mr-auto w-[80%] h-4/5 border border-black grid grid-cols-1 justify-center">
    <div className="p-3 ml-auto mr-auto mt-[2%] grid grid-cols-1 w-screen h-[90%] border-1 border-gray md:mt-[2%] lg:mt-1">
      {/* <div>
        <div>{data.name.common}</div>
        <div>{data.name.official}</div>
      </div> */}
      <div className="grid grid-cols-1 ml-auto mr-auto w-[100%] h-[100%] md:grid-cols-2 md:w[80%] lg:w-[60%]">
        <div className="w-[100%] h-[100%]">
            <CountryCard country={data} showMore={false}/>
            <Currency target={data.currencies} />
          </div>
          <div className="w-[100%] h-[100%]">
            {/* <CountryPictures city={chosenCity} /> */}
            <CountryWeather city={chosenCity} />
            <CountryCities
              country={data.name.common}
              setChosenCity={setChosenCity}
            />
          </div>
        </div>
      </div>
    
  );
}

// m-3 flex flex-col h-fit  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
