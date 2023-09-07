import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import LoadingSpinner from "../Components/spinners/LoadingSpinner";
import CountryCard from "../Components/CountryCard";

function fetchCountryData() {
	return fetch("https://restcountries.com/v3.1/all")
		.then((response) => response.json())
		.catch((error) => console.log("error", error));
}

export default function HomePage() {
	const [loadCard, setLoadCard] = useState(true);
	const [countries, setCountries] = useState([]);
	const [activeCountry, setActiveCountry] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams({});

	function findCountry(searchCountry = "Austria") {
		const re = new RegExp("^(" + searchCountry + "w*)", "i");
		return countries.find((c) => {
			return re.test(c.name.common);
		});
	}

	useEffect(() => {
		fetchCountryData().then((countriesData) => {
			setCountries(countriesData);
			setLoadCard(false);
		});
	}, []);

	useEffect(() => {
		const searchCity = Object.fromEntries([...searchParams]);
		let getCountry = "";
		if (searchCity.city) {
			if (searchCity.city.includes(",")) {
				const country = searchCity.city.split(",")[1].trim();
				getCountry = findCountry(country);
			} else {
				getCountry = findCountry(searchCity.city);
			}
		} else {
			getCountry = findCountry();
		}
		setActiveCountry(getCountry);
	}, [searchParams, countries]);

	useEffect(() => {}, [activeCountry]);

	if (loadCard) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<LoadingSpinner />;
			</div>
		);
	}

	return (
		<div className="flex justify-center overflow-hidden">
			<CountryCard country={activeCountry} showMore={true}/>
		</div>
	);
}
