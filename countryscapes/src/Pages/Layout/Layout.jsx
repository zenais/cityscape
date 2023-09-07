import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/navbarComponents/Navbar";

export default function Layout() {
	return (
		<div className="h-screen flex flex-col">
			<Navbar />
			<div className="mt-[4.5rem] h-screen overflow-scroll bg-center bg-cover" style={{ backgroundImage: 'url("bg2_op3.png")'}}>
				<Outlet />
			</div>
		</div>
	);
}

