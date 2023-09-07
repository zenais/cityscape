import React from "react";
import FavoriteTicket from "./FavoriteTicket";

export default function FavoriteList({ favorites }) {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3">
			{favorites.map((country, index) => (
				<FavoriteTicket key={country.name + index} favCountry={country} />
			))}
		</div>
	);
}
