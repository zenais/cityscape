import React, { useState } from "react";
import SignUpForm from "../Components/navbarComponents/forms/SignUpForm";
import SignUpResponse from "../Components/navbarComponents/SignUpResponse";

function signUpUser(data) {
	return fetch("http://127.0.0.1:8080/api/user/", {
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

export default function SignUpPage() {
	const [isSignedUp, setSignUp] = useState(false);
	const [serverResponse, setServerResponse] = useState({
		message: "This is message",
		status: "success"
	});
	console.log(isSignedUp);

	function handleSignUp(data) {
		signUpUser(data).then((res) => setServerResponse(res));
		setSignUp(true);
	}

	return (
		<div className="flex justify-center md:items-center">
			{isSignedUp ? (
				<SignUpResponse
					message={serverResponse.message}
					status={serverResponse.status}
					onClose={() => setSignUp(false)}
				/>
			) : (
				<SignUpForm onSignUp={handleSignUp} />
			)}
		</div>
	);
}
