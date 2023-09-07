import React from "react";

export default function SignUpResponse({ message, status, onClose }) {
	return (
		<div className="w-screen md:max-w-sm md:my-6 h-screen md:h-fit p-4 shadow-gray-400 rounded-lg shadow-md">
			<h2 className="my-4 mb-6 text-center  font-bold text-xl">{status}</h2>
			<p className="my-4 mb-6 text-center  text-xl">{message}</p>

			<button
				onClick={onClose}
				className="text-white bg-blue-700  bghover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				{status === "success" ? "Sign in" : "Try again"}
			</button>
		</div>
	);
}
