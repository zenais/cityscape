import React, { useEffect, useState } from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import { Link } from "react-router-dom";

const menuOptions = [
	{
		icon: <HomeOutlinedIcon />,
		name: "Home",
		href: "/"
	},
	{
		icon: <StarOutlineIcon />,
		name: "Favorites",
		href: "/favorites"
	},
	{
		icon: <PlaceOutlinedIcon />,
		name: "My Places",
		href: "/myplaces"
	},
	{
		icon: <TravelExploreOutlinedIcon />,
		name: "Serach Flights",
		href: "/flights"
	},
	{
		icon: <LogoutIcon />,
		href: "/",
		name: "Log out"
	}
];

const menuOptionsNoUser = [
	{
		icon: <HomeOutlinedIcon />,
		name: "Home",
		href: "/"
	},
	{
		icon: <TravelExploreOutlinedIcon />,
		name: "Search Flights",
		href: "/flights"
	},
	{
		icon: <LoginOutlinedIcon />,
		name: "Log in"
	}
];

export default function Sidebar({ onUserExists, onExit, onLogIn, onLogOut }) {
	const [menu, setMenu] = useState(menuOptions);

	useEffect(() => {
		if (!onUserExists) setMenu(menuOptionsNoUser);
	}, [onUserExists]);

	return (
		<div className="flex md:hidden">
			<div className="absolute flex flex-col h-screen p-3 z-50 bg-white shadow w-60">
				<div className="space-y-3">
					<div className="flex-1">
						<h2
							className="text-lg ml-2 font-bold 
						"
						>
							Countryscapes
						</h2>
						{/* <h2 className="ml-2 text-blue-700 font-semibold ">
							{user.firstName}
						</h2> */}
						<ul className="pt-2 pb-4 space-y-1 text-sm">
							{menu.map((item) => (
								<li key={item.name} className="rounded-sm">
									<Link
										to={item.href}
										onClick={() => {
											item.name === "Log out" && onLogOut();
											item.name === "Log in" && onLogIn();
											onExit(false);
										}}
										className="flex items-center p-2 space-x-3 rounded-md"
									>
										{item.icon}
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
