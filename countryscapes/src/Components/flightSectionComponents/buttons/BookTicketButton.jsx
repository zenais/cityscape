import React from "react";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

export default function BookTicketButton({ orderLink }) {
	return (
		<a href={orderLink}>
			<AirplaneTicketIcon fontSize="large" className="hove:font-red-500" />
		</a>
	);
}
