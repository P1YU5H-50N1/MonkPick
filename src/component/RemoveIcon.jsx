import React from "react";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";

const RemoveIcon = () => {
	return (
		<IconContext.Provider
			value={{
				className: "py-2 mr-4 text-button hover:bg-bg",
				size: "2.5em",
			}}
		>
			<MdClose />
		</IconContext.Provider>
	);
};

export default RemoveIcon;
