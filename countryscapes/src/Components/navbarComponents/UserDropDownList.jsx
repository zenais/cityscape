import React, { useEffect, useState } from "react";

export default function UserDropDownList({ onSignOut, user }) {
	const [showUserOptions, setUserOptionsVisivility] = useState(false);

	if (!user) return <></>;

	function UserDropDown() {
		return (
			<div className="z-10 absolute  right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
				<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
					<div>
						{user.firstName} {user.lastName}
					</div>
					<div className="font-medium truncate">{user.email}</div>
				</div>

				<div className="py-2 cursor-pointer">
					<div
						onClick={() => {
							setUserOptionsVisivility(false);
							onSignOut(true);
						}}
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
					>
						Sign out
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="fixed right-2 top-2">
			<div className="relative ">
				<button
					onClick={() => setUserOptionsVisivility(!showUserOptions)}
					className="w-14 h-14 flex items-center justify-center text-white  bg-cyan-700 hover:bg-cyan-800  font-medium rounded-full text-center  dark:bg-cyan-600 dark:hover:bg-cyan-700  "
				>
					<p className="uppercase text-2xl">{user.firstName[0]}</p>
				</button>
				{showUserOptions && <UserDropDown />}
			</div>
		</div>
	);
}
