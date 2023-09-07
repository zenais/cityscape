import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function CollapseButton({ onExpand }) {
	const [open, setOpen] = useState(true);
	return (
		<button
			onClick={() => {
				setOpen(!open);
				onExpand(open);
			}}
			className=" border-zinc-500 border-2 rounded-full hover:bg-lime-400 "
		>
			{open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
		</button>
	);
}
