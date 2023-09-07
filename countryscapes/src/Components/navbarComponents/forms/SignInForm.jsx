import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../spinners/LoadingSpinner";

export default function SignInForm({ onSignIn, onError, onCancel }) {
	const [loading, setLoading] = useState(false);
	const signInFields = [
		{ name: "userName", text: "User Name", type: "text" },
		{ name: "password", text: "Password", type: "text" /*  "password" */ }
	];

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target).entries();
		const logInData = Object.fromEntries(formData);
		onSignIn(logInData);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="w-screen bg-white md:max-w-sm md:my-6 h-screen md:h-fit p-4 shadow-gray-400 rounded-lg shadow-md"
		>
			<button
				type="button"
				onClick={onCancel}
				className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
				data-modal-hide="popup-modal"
			>
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					></path>
				</svg>
			</button>
			{onError && (
				<h3 className="mt-4 text-lg font-semibold text-red-500">
					Username or password incorrect!
				</h3>
			)}
			<h2 className="my-4 mb-6 text-center md:text-left font-bold text-xl">
				Log In
			</h2>
			{signInFields.map((formItem) => (
				<div key={formItem.name} className="relative z-0 w-full mb-6 group">
					<input
						type={formItem.type}
						name={formItem.name}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor={formItem.name}
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
					>
						{formItem.text}
					</label>
				</div>
			))}
			<button
				onClick={() => setLoading(true)}
				type="submit"
				className="text-white bg-blue-700  bghover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				<div className="flex justify-center">
					{loading && <LoadingSpinner />}
					<p className="text-xl">Log In</p>
				</div>
			</button>
			<p className="text-center my-6">
				Don't have account?{" "}
				<Link
					onClick={onCancel}
					className="font-bold text-blue-600"
					to={"/signup"}
				>
					{" "}
					SIGN UP
				</Link>
			</p>
		</form>
	);
}
