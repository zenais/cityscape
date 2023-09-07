import React from "react";
import SignInForm from "../forms/SignInForm";

export default function LogInModal({ onClose, onError }) {
	return (
		<div
			tabIndex="-1"
			className="fixed  z-50  w-screen h-screen bg-slate-400/50"
		>
			<div className="relative w-full h-full">
				<div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-md md:h-auto">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<SignInForm
							onCancel={() => {
								onClose(null);
							}}
							onError={onError}
							onSignIn={(data) => {
								onClose(data);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
