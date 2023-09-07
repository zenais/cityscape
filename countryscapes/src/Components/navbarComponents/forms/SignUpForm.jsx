import React from "react";
import { Link } from "react-router-dom";

export default function SignUpForm({ onSignUp }) {
	const signUpFields = [
		{ name: "firstName", text: "First Name", type: "text" },
		{ name: "lastName", text: "Last Name", type: "text" },
		{ name: "userName", text: "User Name", type: "text" },
		{ name: "email", text: "Email address", type: "text" /* "email" */ },
		{ name: "password", text: "Password", type: "text" /*  "password" */ },
		{
			name: "confirmPassword",
			text: "Confirm password",
			type: "text" /* "password" */
		}
	];

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target).entries();
		onSignUp(Object.fromEntries([...formData]));
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="w-screen bg-white md:max-w-sm md:my-6 h-screen md:h-fit p-4 shadow-gray-400 rounded-lg shadow-md"
		>
			<h2 className="my-4 mb-6 text-center md:text-left font-bold text-xl">
				Sign Up
			</h2>
			{signUpFields.map((formItem) => (
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
				type="submit"
				className="text-white bg-blue-700  bghover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Sign Up
			</button>
			<p className="text-center my-6">
				Already have account?{" "}
				<Link className="font-bold text-blue-600" to={"/"}>
					{" "}
					Go Home
				</Link>
			</p>
		</form>
	);
}
