import React, { useEffect, useState } from "react";
import CollapseButton from "./buttons/CollapseButton";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import BookTicketButton from "./buttons/BookTicketButton";
import { getCityImage } from "../../api/pexelsHttpRequest";

export default function FlightTicket({ flightData }) {
	if (flightData.data.length === 0) return;
	const [image_url, setImageUrl] = useState("./plain_rise.jpg");

	const [open, setOpen] = useState(false);

	const countryTo = flightData.data[0].countryTo.name;
	const cityTo = flightData.data[0].cityTo;
	const departureDate = flightData.data[0].local_departure.substring(0, 10);
	const price = flightData.data[0].price;
	const orderLink = flightData.data[0].deep_link;

	async function loadImage() {
		if (flightData.data.length > 0) {
			let newImage_url = await getCityImage(cityTo);
			setImageUrl(newImage_url);
		}
	}

	function MinTicket() {
		return (
			<div className="bg-white p-5 shadow-md shadow-black-300 rounded-lg hover:shadow-lg ">
				<div className=" flex justify-between items-center p-2">
					<p>{cityTo}</p>
					<div className="flex gap-3">
						<p>{price} EUR</p>
						<CollapseButton onExpand={setOpen} />
					</div>
				</div>
			</div>
		);
	}

	function DetailTicket() {
		return (
			<div className="row-span-2 bg-white p-5 shadow-md shadow-black-300 rounded-lg hover:shadow-lg ">
				<div className=" flex justify-between items-center p-2">
					<p>{cityTo}</p>
					<div className="flex gap-3">
						<p>{price} EUR</p>
						<CollapseButton onExpand={() => setOpen(false)} />
					</div>
				</div>

				<div className="border-t-2 p-2 border-dotted flex">
					{/* Image container */}
					<div className="overflow-hidden mr-4">
						<img src={image_url} className="w-60 h-40 object-cover" />
					</div>
					<div className="w-full flex justify-between">
						<div className="flex flex-col justify-between">
							<div>
								<p className="text-lg">{cityTo}</p>
								<p className="text-sm text-slate-500">{countryTo}</p>
							</div>
							<p className="text-lime-600 ">{departureDate}</p>
						</div>
						<div className="text-right text-green-700 relative flex flex-col justify-between">
							<strong className="text-xl">
								{price} <EuroSymbolIcon />
							</strong>
							<BookTicketButton orderLink={orderLink} />
						</div>
					</div>
				</div>
			</div>
		);
	}

	useEffect(() => {
		loadImage();
	}, []);

	return <>{open ? <DetailTicket /> : <MinTicket />}</>;
	{
		/* <div className="bg-white p-5 shadow-md shadow-black-300 rounded-lg hover:shadow-lg ">
			<div className=" flex justify-between items-center p-2">
				<p>{cityTo}</p>
				<div className="flex gap-3">
					<p>{price} EUR</p>
					<CollapseButton onExpand={setOpen} />
				</div>
			</div>
			{open && (
				<div className="border-t-2 p-2 border-dotted flex">
					<div className="overflow-hidden mr-4">
						<img src={image_url} className="w-60 h-40 object-cover" />
					</div>
					<div className="w-full flex justify-between">
						<div className="flex flex-col justify-between">
							<div>
								<p className="text-lg">{cityTo}</p>
								<p className="text-sm text-slate-500">{countryTo}</p>
							</div>
							<p className="text-lime-600 ">{departureDate}</p>
						</div>
						<div className="text-right text-green-700 relative flex flex-col justify-between">
							<strong className="text-xl">
								{price} <EuroSymbolIcon />
							</strong>
							<BookTicketButton orderLink={orderLink} />
						</div>
					</div>
				</div>
			)}
		</div> */
	}
}
