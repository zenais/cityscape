import React, { useState } from "react";
import {
	createSearchParams,
	useSearchParams,
	useLocation
} from "react-router-dom";

export default function InputGroup({ citiesList }) {
	const [citiesOption, setCitiesOption] = useState();
	const [searchParams, setSearchParams] = useSearchParams({});
	const location = useLocation();

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const entries = Object.fromEntries([...formData.entries()]);
		const searchQuery = createSearchParams({ ...searchParams, ...entries });
		setSearchParams(searchQuery);
	}

	function handleInput(e) {
		const { value } = e.target;
		let options = [];
		options = citiesList
			.filter((city) => {
				return new RegExp(value, "i").test(city) && options.length < 10;
			})
			.slice(0, 10);
		setCitiesOption(options);
	}

	if (location.pathname != "/" && location.pathname !== "/flights")
		return <></>;

	return (
		<form onSubmit={handleSubmit}>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						className="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
				<input
					type="search"
					list="city-list"
					id="search"
					name="city"
					onInput={handleInput}
					className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 outline-none"
					placeholder="Search"
					required
				/>
				<datalist id="city-list">
					{citiesOption &&
						citiesOption.map((city) => <option key={city} value={city} />)}
				</datalist>
			</div>
		</form>
	);
}
