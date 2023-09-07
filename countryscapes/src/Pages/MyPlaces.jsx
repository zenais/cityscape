import React, { useEffect, useState } from "react";
import FavoriteList from "../Components/favoritesSection/FavoriteList";

function fetchCountryData() {
	return fetch("https://restcountries.com/v3.1/all")
		.then((response) => response.json())
		.catch((error) => console.log("error", error));
}

export default function MyPlaces() {
	const [beenPlaces, setBeenPlaces] = useState(false);
	const [user, setUser] = useState(null);

	function findCountry(searchCountry = "Austria", allCountries) {
		const re = new RegExp("^(" + searchCountry + "w*)", "i");
		return allCountries.find((c) => {
			return re.test(c.name.common);
		});
	}

	useEffect(() => {
		if (localStorage.getItem("user")) {
			const userData = JSON.parse(localStorage.getItem("user"));
			setUser(userData);

			fetchCountryData().then((countriesData) => {
				const favCountriesData = userData.myplaces.map((country) =>
					findCountry(country, countriesData)
				);
				favCountriesData === []
					? setBeenPlaces(false)
					: setBeenPlaces(favCountriesData);
			});
		}
	}, []);

	return (
		<>
			{beenPlaces ? (
				<div className="">
					<FavoriteList favorites={beenPlaces} />
				</div>
			) : (
				<div className="text-lg flex justify-center items-center">
					There is are no Places to show to show :(
				</div>
			)}
		</>
	);
}
