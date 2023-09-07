import React from "react";

export default function SubmitButton({ text }) {
	return (
		<div className="flex items-center bg-zinc-700 p-2 rounded-full">
			<button className="bg-zinc-800 w-full text-center text-lg text-white rounded-full cursor-pointer  min-h-10 flex items-center justify-center p-2 shadow-black shadow-md md:rounded-full md:aspect-square md:hover:-rotate-12 hover:text-black  duration-200  hover:bg-lime-400 ">
				{text}
			</button>
		</div>
	);
}
