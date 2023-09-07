const pexelApiUrl = `https://api.pexels.com/v1/search`;
const pexelsApiKey =
	"dg6HLQTArwkI5XkCB7eBS7I5rhH9Sm78PkdkRYoBheFizFof55f0Q5db ";

function getJSONData(url, errorMsg = "Something went wrong") {
	return fetch(url).then((response) => {
		if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

		return response.json();
	});
}

function formatParameters(p) {
	const parameters = new URLSearchParams(p);
	return `?${parameters.toString()}`;
}

export async function getCityImage(cityName) {
	try {
		const cityParameter = {
			query: cityName,
			orientation: "Landscape",
			size: "small",
			per_page: 1
		};
		const cityData = await getPicData(formatParameters(cityParameter));
		const picUrl = parsePicUrl(cityData);
		return picUrl;
	} catch (error) {
		console.error(error);
		return "./plain_rise.jpg";
	}
}

async function getPicData(cityParameter) {
	const requestPicUrl = `${pexelApiUrl}${cityParameter}`;
	const myHeaders = new Headers({ Authorization: pexelsApiKey });
	const myRequest = new Request(requestPicUrl, {
		method: "GET",
		headers: myHeaders,
		mode: "cors",
		cache: "default"
	});

	return await getJSONData(myRequest, "Problem getting Locations");
}

function parsePicUrl(cityData) {
	if (cityData.photos.length === 0) {
		return "./plain_rise.jpg";
	} else {
		return cityData.photos[0].src.original;
	}
}
