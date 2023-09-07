import React from "react";
import { useState, useEffect } from "react";

export default function Currency({ target }) {
  const [currencyData, setCurrencyData] = useState(null);
  const [resultInTargetCurr, setResultInTargetCurr] = useState(null);
  const [amountEurosToCalc, setAmountEurosToCalc] = useState(1);
  const [targetRate, setTargetRate] = useState(0);
  const [amountTargetToCalc, setAmountTargetToCalc] = useState(1);

  useEffect(() => {
    if (!localStorage.getItem("currencyData")) {
      fetch("https://open.er-api.com/v6/latest/EUR")
        .then((res) => res.json())
        .then((res) => {
          setCurrencyData(res);
          localStorage.setItem("currencyData", JSON.stringify(res));
          setTargetRate(res.rates[Object.keys(target)[0]]);
        });
    } else {
      const storedData = JSON.parse(localStorage.getItem("currencyData"));
      setCurrencyData(storedData);
      setTargetRate(storedData.rates[Object.keys(target)[0]]);
    }
  }, []);

  function handleEuroAmountChange(e) {
    setAmountEurosToCalc(e.target.value);
  }
  function handleTargetAmountChange(e) {
    setAmountTargetToCalc(e.target.value);
  }

  //   console.log(currencyData);
  //   console.log(targetRate);

  return (
    <div className="p-2 m-3 mt-5 max-w-sm ml-auto mr-auto grid grid-col-1  bg-gray-100 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:z-10 hover:shadow-2xl transition-all duration-400 ease-in-out">
      <div className="text-center font-bold text-lg">
        <a href="/fetch_currency.png">{`${
          target[Object.keys(target)[0]].name
        } (${target[Object.keys(target)[0]].symbol})`}</a>
      </div>
      <hr className="border-1 mb-2 border-black" />
      <div className="grid grid-cols-2">
        <div className="flex">
          <input
            className="w-[100px] text-right focus:outline-0"
            type="number"
            defaultValue="1"
            onChange={handleEuroAmountChange}
          />
          {` EUR`}
        </div>
        <div>
          {`= ${(
            Math.round(amountEurosToCalc * targetRate * 100) / 100
          ).toFixed(2)} ${Object.keys(target)[0]}`}
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex">
          <input
            className="w-[100px] text-right focus:outline-0"
            type="number"
            defaultValue="1"
            onChange={handleTargetAmountChange}
          />
          {` ${Object.keys(target)[0]}`}
        </div>
        <div>
          <a href="/calc_currency.png">{`= ${(
            Math.round((amountTargetToCalc / targetRate) * 100) / 100
          ).toFixed(2)} EUR`}</a>
        </div>
      </div>
    </div>
  );
}
