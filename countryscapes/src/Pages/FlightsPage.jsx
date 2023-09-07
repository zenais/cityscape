import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getLocations, getAllFlights } from "../api/flightHttpRequests";
import FlightsList from "../Components/flightSectionComponents/FlightsList";
import Spinner from "../Components/spinners/Spinner";

const testValue = {
	search_id: "19603199-ae1c-8a3b-5002-a8b03cdc8258",
	currency: "EUR",
	data: [
		{
			id: "19ef26a64bf14bfcf381794d_0|19ef26a64bf14bfcf381794d_1|19ef26a64bf14bfcf381794d_2|19ef26a64bf14bfcf381794d_3",
			flyFrom: "VIE",
			flyTo: "OGU",
			cityFrom: "Vienna",
			cityCodeFrom: "VIE",
			cityTo: "Giresun",
			cityCodeTo: "OGU",
			countryFrom: {
				code: "AT",
				name: "Austria"
			},
			countryTo: {
				code: "TR",
				name: "Turkey"
			},
			nightsInDest: 11,
			distance: 1874.27,
			price: 262,
			conversion: {
				EUR: 262
			},
			fare: {
				adults: 262,
				children: 262,
				infants: 262
			},

			availability: {
				seats: 6
			},
			airlines: ["TK"],

			deep_link:
				"https://www.kiwi.com/deep?affilid=zenaisflightsearch&currency=EUR&flightsId=19ef26a64bf14bfcf381794d_0%7C19ef26a64bf14bfcf381794d_1%7C19ef26a64bf14bfcf381794d_2%7C19ef26a64bf14bfcf381794d_3&from=VIE&lang=en&passengers=1&to=OGU&booking_token=E_Xi8DYTIFoDoXbgdhvZSj3091526Tvg03OhUhSuq64-iLVZUnvWxZmXUYTcR3wgHiyqlRe2f48i15p_DOW6wNBzs8g_vi-0jHr3jzG9AiD-AUWbMIQ9aIqK2h2Q2Zo7F0ifADQGBTTCyWql_Cv5IGR4B6o9t_nW0NoQpdJrQ3d1enHJOmwzwzt2iMXDw7PntbEzgaivvK2z2hgRaWgSS_DPUMEFp4Kv44pUqaYRO2d2X_wceUz6X3j0IBJOk2cGeujB3FmdTfwtVnZQupYcC67uOAtLooaakc8dni7_O-oalm6XGHuloxk-hqgZy2PFRnX4ztu9sLu0CIkol8nQioz09K6CJ7REcH6S2Nr6MDrAoUzZERa1mG_wpnfNvpmLUepUpY4m9Xqe6RXqV4R26A7IriBUw4Kj2-faYjXJRCDRNi898vKuubYgLFI3qMDP-9zP7PO6JQtvUb3gRrxwe59YnHV200oHsifBJidPMTXp1uyga-43qAUSkHOVcKA6Cn0eLHv18ukYjrEsBHdZ-RfzjJFF1YtBJybeFuKLfWwzh5XSVJi66x2usGL7AWPznr5TM-qGIf72FtDDDAHm_onvTvL9LBM_E7krNtL3lpfpN6oXQsCZeGsURfV2D7lxhwY6fn4m03he8F4DsShNrZU6iJrD_gpj02YMyRNpvBAKAP7lzyDu9vrxdIZV9-l4JdrlSIGAPq0_EESE5ofv9zTr-84fnNqLEcRw0FTZbdj4=",

			local_arrival: "2023-03-25T20:35:00.000Z",
			utc_arrival: "2023-03-25T17:35:00.000Z",
			local_departure: "2023-03-25T13:50:00.000Z",
			utc_departure: "2023-03-25T12:50:00.000Z"
		}
	]
};

export default function FlightsPage() {
	const [loading, setLoading] = useState(true);
	const [flightData, setFlightsData] = useState({});
	const [searchParams, setSearchParams] = useSearchParams({});

	useEffect(() => {
		setLoading(true);
		let city = "London";
		const searchCity = Object.fromEntries([...searchParams]);

		if (searchCity.city) {
			city = searchCity.city.split(",")[0].trim();
			console.log(city);
		}

		getLocations(city).then((locations) => {
			const locIds = locations.locations.map((airoport) => {
				return airoport.id;
			});

			const departure = new Date().toISOString().substring(0, 10);
			const travelPeriod = new Date("1/1/2025").toISOString().substring(0, 10);

			getAllFlights(locIds, departure, travelPeriod).then((flights) => {
				setFlightsData([...flights]);
				setLoading(false);
			});
		});
	}, [searchParams]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="grid w-screen pt-4 md:px-4">
			<div>
				<FlightsList flights={flightData && flightData} />
			</div>
		</div>
	);
}
