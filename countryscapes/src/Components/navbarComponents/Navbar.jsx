import React, { useEffect, useState } from "react";
import {
	Link,
	useSearchParams,
	createSearchParams,
	Navigate
} from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputGroup from "./InputGroup";
import UserDropDownList from "./UserDropDownList";
import SignOutModal from "./modals/SignOutModal";
import LogInModal from "./modals/LogInModal";

const API_CITIES = "https://countriesnow.space/api/v0.1/countries";

function fetchCities() {
	return fetch(API_CITIES)
		.then((res) => res.json())
		.catch((error) => console.log("error", error));
}

function signInUser(data) {
	return fetch(`http://127.0.0.1:8080/api/user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => console.error(err));
}

const theme = createTheme({
	palette: {
		primary: {
			main: "#fff"
		},
		secondary: {
			main: "#aaa"
		}
	}
});

export default function Navbar() {
	const [searchParams, setSearchParams] = useSearchParams({});
	const [showSidebar, setSidebarShow] = useState(false);
	const [showSignOutModal, setShowSignOutModal] = useState(false);
	const [showLogInModal, setLogInModal] = useState(false);
	const [userExists, setUserExists] = useState(false);
	const [showError, setError] = useState(false);
	const [user, setUser] = useState(null);
	const [cities, setCities] = useState([]);

	const navigate = Navigate;

	useEffect(() => {
		localStorage.getItem("user")
			? setUser(JSON.parse(localStorage.getItem("user")))
			: null;
	}, []);

	const menuOptions = [
		{
			name: "Favorites",
			href: "/favorites"
		},
		{
			name: "My Places",
			href: "/myplaces"
		},
		{
			name: "Search Flights",
			href: "/flights?" + createSearchParams(searchParams)
		}
	];
	const menuOptionsNoUser = [
		{
			name: "Serach Flights",
			href: "/flights?" + createSearchParams(searchParams)
		}
	];

	function LoginLink() {
		return (
			<li
				onClick={() => setLogInModal(true)}
				className="px-4 py-2 font-semibold text-gray-400 hover:text-white rounded cursor-pointer"
			>
				Log in
			</li>
		);
	}

	function handleSignOut(decision = false) {
		if (decision) {
			localStorage.clear();
		}
		console.log("Signing out");
		setUser(null);
		setUserExists(false);
		setShowSignOutModal(false);
		navigate("./");
	}

	function handleSignIn(data) {
		if (!data) {
			setLogInModal(false);
			return;
		}
		setError(false);
		signInUser(data).then((res) => {
			if (res.status === "fail") {
				setError(true);
				return;
			}
			localStorage.setItem("user", JSON.stringify(res));
			setUser(res);
			setUserExists(true);
			setLogInModal(false);
		});
	}

	useEffect(() => {
		if (localStorage.getItem("user")) {
			const userData = JSON.parse(localStorage.getItem("user"));
			setUser(userData);
			setUserExists(true);
		}
		fetchCities().then((res) => {
			const countryList = res.data.map((country) => country.country);
			const cityList = res.data
				.map((country) => {
					return country.cities.map((city) => city + ", " + country.country);
				})
				.flat();

			setCities([...countryList, ...cityList]);
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			{showLogInModal && (
				<LogInModal onError={showError} onClose={handleSignIn} />
			)}
			{showSignOutModal && <SignOutModal onClose={handleSignOut} />}
			<div className="fixed bg-gray-100 w-screen ">
				<header className=" top-0 z-30 h-26 w-full px-2 py-4 bg-zinc-800 sm:px-4 shadow-xl">
					<div className="flex items-center justify-center h-full md:justify-between  mx-auto">
						<div
							className=" fixed left-4 inline-flex md:hidden cursor-pointer"
							onClick={() => setSidebarShow(!showSidebar)}
						>
							<MenuIcon color="primary" />
						</div>
						<div className="flex gap-2">
							<Link
								to={"/"}
								className="hidden w-0 md:w-fit md:inline-flex text-2xl font-extrabold text-white"
							>
								Cityscapes
							</Link>
							<span onClick={() => setSidebarShow(false)}>
								<InputGroup citiesList={cities} />
							</span>
						</div>

						<div className="flex items-center space-x-1">
							<ul className="hidden space-x-2 md:inline-flex mr-14 ">
								{userExists
									? menuOptions.map((el) => (
											<li
												key={el.name}
												className="px-4 py-2 hover:text-white active:text-white font-semibold text-gray-400 rounded"
											>
												<Link to={el.href}>{el.name}</Link>
											</li>
									  ))
									: menuOptionsNoUser.map((el) => (
											<li
												key={el.name}
												className="px-4 py-2 hover:text-white active:text-white font-semibold text-gray-400 rounded"
											>
												<Link to={el.href}>{el.name}</Link>
											</li>
									  ))}
								{userExists ? (
									<UserDropDownList
										user={user}
										onSignOut={setShowSignOutModal}
									/>
								) : (
									<LoginLink />
								)}
							</ul>
						</div>
					</div>
				</header>
				{showSidebar && (
					<Sidebar
						onUserExists={userExists}
						onLogIn={() => setLogInModal(true)}
						onLogOut={() => setShowSignOutModal(true)}
						onExit={() => setSidebarShow(false)}
					/>
				)}
			</div>
		</ThemeProvider>
	);
}
