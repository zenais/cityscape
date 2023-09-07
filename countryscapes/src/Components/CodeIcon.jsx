import React, { useState } from "react";
import CodeModal from "./navbarComponents/modals/CodeModal";

export default function CodeIcon({ title, text }) {
	const [showCode, setShowCode] = useState(false);
	return (
		<div
			onClick={() => setShowCode(true)}
			className="border border-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-slate-400 m"
		>
			{showCode ? <CodeModal onClose={() => setShowCode(close)} /> : null}
			{"<>"}
		</div>
	);
}
