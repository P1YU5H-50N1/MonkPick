import React from "react";

const DragHandleIcon = () => {
	return (
		<svg
			width="20"
			height="30"
			viewBox="0 0 10 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="1" cy="7" r="1" fill="black" fillOpacity="0.5" />
			<circle cx="6" cy="7" r="1" fill="black" fillOpacity="0.5" />
			<circle cx="1" cy="1" r="1" fill="black" fillOpacity="0.5" />
			<circle cx="6" cy="1" r="1" fill="black" fillOpacity="0.5" />
			<circle cx="1" cy="13" r="1" fill="black" fillOpacity="0.5" />
			<circle cx="6" cy="13" r="1" fill="black" fillOpacity="0.5" />
		</svg>
	);
};

export default DragHandleIcon;
