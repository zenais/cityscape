import React, { useEffect, useState } from "react";
import { Link, createSearchParams } from "react-router-dom";
import { austriaData } from "../assets/data/austriaData";

function updateUser(user) {
	return fetch("http://127.0.0.1:8080/api/user/", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => console.error(err));
}

export default function CountryCard({ country, showMore }) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [inMyPlaces, setInMyPlaces] = useState(false);
	const [inMyFavorites, setInFavorites] = useState(false);
	const { flags, name, population, languages, currencies, capital } = country
		? country
		: austriaData;

	function handleAddToPlaces() {
		if (user === null || inMyPlaces) return;
		const myPlacesUpdated = [...user.myplaces, name.common];
		const userUpdated = { ...user, myplaces: [...myPlacesUpdated] };
		setInMyPlaces(true);

		updateUser(userUpdated).then((res) => {
			setUser(userUpdated);
			localStorage.setItem("user", JSON.stringify(userUpdated));
		});
	}

	function handleAddToFavorites() {
		if (user === null || inMyFavorites) return;
		const myFavoritesUpdated = [...user.myfavorites, name.common];
		const userUpdated = { ...user, myfavorites: [...myFavoritesUpdated] };
		setInFavorites(true);

		updateUser(userUpdated).then((res) => {
			setUser(userUpdated);
			localStorage.setItem("user", JSON.stringify(userUpdated));
		});
	}

	useEffect(() => {
		if (localStorage.getItem("user")) {
			const userData = JSON.parse(localStorage.getItem("user"));

			const inplace = userData.myplaces.some((place) => place === name.common);
			const infavs = userData.myfavorites.some(
				(place) => place === name.common
			);
			setInMyPlaces(inplace);
			setInFavorites(infavs);
			setUser(userData);
		}
	}, [country]);

	return (
		<div className="m-3 flex flex-col h-fit ml-auto mr-auto mb-auto max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-all duration-400 ease-in-out">
			<img className="rounded-t-lg" src={flags.png} alt="" />
			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{name.common}
				</h5>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
					<span>🏙️</span> Capital: {capital}
				</p>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
					<span>👫</span> Population: {(+population / 1000000).toFixed(1)}{" "}
					people
				</p>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
					<span>🗣️</span> Language: {Object.values(languages).toString()}
				</p>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
					<span>💰</span> Curreny: {Object.keys(currencies).toString()}
				</p>

				<div className="grid grid-cols-2 gap-2">
					<button
						style={inMyPlaces ? { backgroundColor: "red" } : {}}
						onClick={handleAddToPlaces}
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
					>
						{inMyPlaces ? "My place :)" : "Have I been there?"}
					</button>

					<button
						style={inMyFavorites ? { backgroundColor: "red" } : {}}
						onClick={handleAddToFavorites}
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
					>
						{inMyFavorites ? "My Favorite :)" : "Add to Favorites?"}
					</button>
					<Link
						to={
							"/flights?" +
							createSearchParams({ city: capital + ", " + name.common })
						}
						className={!showMore && "col-span-2"}
					>
						<button className="inline-flex justify-between items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
							Search Flights
							<svg
								aria-hidden="true"
								className="w-4 h-4 ml-2 -mr-1"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</Link>
					{showMore && <Link to="/country" state={country}>
						<button className="w-[136px] inline-flex justify-between items-center px-3 py-2 text-sm font-medium text-center bg-white border border-black rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"> 
            Show more!
            </button>
					</Link>}
				</div>
			</div>
		</div>
	);800
}
