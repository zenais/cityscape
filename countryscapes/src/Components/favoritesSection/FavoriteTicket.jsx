import React from "react";
import { Link, createSearchParams } from "react-router-dom";

export default function FavoriteTicket({ favCountry }) {
	const { flags, name, population, languages, currencies, capital } = favCountry
		? favCountry
		: null;
	return (
		<div className="m-3 flex flex-col h-fit  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<div className="p-5">
				<h5 className="mb-2 flex gap-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					<img className="rounded-full w-10 h-10" src={flags.png} alt="" />
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
				<Link
					to={
						"/flights?" +
						createSearchParams({ city: capital + ", " + name.common })
					}
					className=""
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
			</div>
		</div>
	);
}
