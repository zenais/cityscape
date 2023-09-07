import React from "react";
import FlightTicket from "./FlightTicket";

export default function FlightsList({ flights }) {
	console.log(flights);
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
			{flights.map((flight) => (
				<FlightTicket key={flight.search_id} flightData={flight} />
			))}
		</div>
	);
}
