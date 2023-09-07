import React from "react";

export default function SignOutModal({ onClose }) {
	return (
		<div
			tabIndex="-1"
			className="fixed  z-50  w-screen h-screen bg-slate-400/50"
		>
			<div className="relative w-full h-full">
				<div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-md md:h-auto">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div className="p-6 text-center">
							<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
								Are you sure you want to Sign Out?
							</h3>
							<div className="flex flex-col gap-2 md:flex-row justify-center">
								<button
									onClick={() => onClose(true)}
									type="button"
									className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
								>
									Yes, I'm sure
								</button>
								<button
									type="button"
									onClick={() => onClose(false)}
									className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
								>
									No, cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
