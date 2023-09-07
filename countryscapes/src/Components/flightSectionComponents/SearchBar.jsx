import React, { useState } from "react";
import SearchField from "./searchBarItems/SearchField";
import SubmitButton from "../untilityComponents/buttons/SearchFlightButton";
import Spinner from "../untilityComponents/spinners/Spinner";
import { getLocations, getAllFlights } from "../../assets/flightHttpRequests";

export default function SearchBar({ onDestinationSearch }) {
	const [spinner, setSpinner] = useState(false);
	const buttonText = "Get me there!";
	const fieldData = [
		{
			label: "from",
			data: "Vienna",
			type: "text",
			classes: " md:hidden"
		},
		{
			label: "to",
			data: "Paris",
			type: "text",
			classes: " md:col-span-2"
		},
		{
			label: "departure",
			data: new Date().toISOString().substring(0, 10),
			type: "date"
		},
		{
			label: "return",
			data: new Date().toISOString().substring(0, 10),
			type: "date",
			classes: ""
		}
		/* { label: "travellers", data: 2, type: "number" } */
	];

	async function handleSubmit(e) {
		//todo make spinner
		setSpinner(true);
		e.preventDefault();
		const locations = await getLocations(e.target[1].value);
		const locIds = locations.locations.map((airoport) => {
			return airoport.id;
		});
		const flights = await getAllFlights(
			locIds,
			e.target[2].value,
			e.target[3].value
		);
		setSpinner(false);
		onDestinationSearch(flights);
	}

	return (
		<form className="grid mb-10 md:grid-cols-5  gap-2 " onSubmit={handleSubmit}>
			<div className="md:col-span-4 bg-zinc-800 p-2 rounded-xl md:rounded-full ">
				{/* form items */}
				<div className="grid md:grid-cols-2  h-full bg-zinc-800 rounded-xl md:rounded-full overflow-hidden shadow-black shadow-md gap-2">
					{fieldData.map((data) => {
						return <SearchField key={data.label} {...data} />;
					})}
				</div>
			</div>
			<div className="md:flex md:items-center md:justify-center">
				{spinner ? <Spinner /> : <SubmitButton text={buttonText} />}
			</div>
		</form>
	);
}
