function formatParameters(p) {
	const parameters = new URLSearchParams(p);
	return `?${parameters.toString()}`;
}
export async function getAllFlights(cityList = [], date_from, date_to) {
	try {
		const data = await Promise.all(
			cityList.map((destination) => getFlight(destination, date_from, date_to))
		);
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getFlight(
	destination = "Paris",
	date_from = "08/03/2023",
	date_to = "08/03/2024"
) {
	const URL = "https://api.tequila.kiwi.com/v2/search";
	const parameters = {
		fly_from: "VIE",
		fly_to: destination,
		date_from: date_from.split("-").reverse().join("/"),
		date_to: date_to.split("-").reverse().join("/")
		// nights_in_dst_from: 2,
		// nights_in_dst_to: 30,
		// flight_type: "round",
		// ret_from_diff_city: true,
		// ret_to_diff_city: true,
		// one_for_city: 1,
		// one_per_date: 0,
		// adults: 2,
		// children: 0,
		// fly_days: 6,
		// only_working_days: false,
		// only_weekends: false,
		// partner_market: "us",
		// curr: "EUR",
		// locale: "en",
		// price_to: 10000,
		// vehicle_type: "aircraft",
		// limit: 500
	};
	var myHeaders = new Headers();
	myHeaders.append("apikey", "Pd894vhwGR5WgOoa6ZyfR7E82J_YkMkn");

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	};

	return fetch(URL + formatParameters(parameters), requestOptions)
		.then((response) => response.text())
		.then((result) => {
			return JSON.parse(result);
		})
		.catch((error) => console.log("error", error));
}

export async function getLocations(location = "Paris") {
	var myHeaders = new Headers();
	const URL = "https://api.tequila.kiwi.com/locations/query";
	const parameters = {
		locale: "en-US",
		location_types: "airport",
		limit: 100,
		active_only: true,
		term: location
	};

	myHeaders.append("apikey", "Pd894vhwGR5WgOoa6ZyfR7E82J_YkMkn");

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	};

	return fetch(URL + formatParameters(parameters), requestOptions)
		.then((response) => response.text())
		.then((result) => {
			return JSON.parse(result);
		})
		.catch((error) => console.log("error", error));
}
