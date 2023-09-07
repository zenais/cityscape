import React, { useState } from "react";

export default function SearchField({ label, data, type, classes }) {
	const [value, setValue] = useState(data);
	return (
		<div
			className={
				"flex flex-col justify-center bg-gray-100/10 rounded-md" + classes
			}
		>
			<label className="text-center text-gray-500 titlecase">{label}</label>
			<input
				className="outline-none text-center bg-transparent text-lg text-white p-1 px-11"
				name={label}
				type={type}
				placeholder={value}
				value={value}
				onInput={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}
