import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./main.css";

import Layout from "./Pages/Layout/Layout";
import ErrorPage from "./Pages/ErrorPage";
import Favorites from "./Pages/Favorites";
import HomePage from "./Pages/HomePage";
import MyPlaces from "./Pages/MyPlaces";
import FlightsPage from "./Pages/FlightsPage";
import SignUpPage from "./Pages/SignUpPage";
import CountryDetailPage from "./Pages/CountryDetailPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <HomePage />
			},
			{
				path: "/country",
				element: <CountryDetailPage />
			},
			{
				path: "/favorites",
				element: <Favorites />
			},
			{
				path: "/myplaces",
				element: <MyPlaces />
			},
			{
				path: "/flights",
				element: <FlightsPage />
			},
			{
				path: "/signup",
				element: <SignUpPage />
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
