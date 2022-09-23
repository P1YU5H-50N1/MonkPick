import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import DragHandleIcon from "./DragHandleIcon";
import EditIcon from "./EditIcon";

const ProductInput = ({ title, id, idx, openPicker }) => {
	return (
		<Draggable key={id.toString()} index={idx} draggableId={id.toString()}>
			{(provided, snapshot) => (
				<div
					className="flex gap-5 mt-4 items-center"
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<DragHandleIcon {...provided.dragHandleProps} />
					<p>{idx + 1}.</p>
					<div className="bg-white border-2 drop-shadow flex items-center">
						<div className="m-2">
							{title ? title : "Select Product"}
						</div>
						<EditIcon openPicker={openPicker}/>
					</div>
					<button className="bg-button text-white py-2 px-4 rounded-md">
						Add Discount
					</button>
				</div>
			)}
		</Draggable>
	);
};

export default ProductInput;
