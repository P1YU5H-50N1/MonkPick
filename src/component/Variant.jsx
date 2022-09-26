import React, {useContext} from "react";
import { Draggable } from "react-beautiful-dnd";
import RemoveIcon from "./RemoveIcon";
import { ProductContext } from "./ProductProvider";
import DragHandleIcon from "./DragHandleIcon";

const Variant = ({ variant,index }) => {
	const { title, admin_graphql_api_id, product_id, id } = variant;
    const {removeVariant} = useContext(ProductContext);

	return (
		<Draggable
			draggableId={admin_graphql_api_id}
			// index={product_id * 10000 + id}
            index={index}
		>
			{(provided, snapshot) => (
				<div
					className="flex items-center w-full gap-4"
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<DragHandleIcon {...provided.dragHandleProps} />
					<div className="bg-white p-3 w-full rounded-3xl shadow-md">{title}</div>
					<RemoveIcon onClick={()=>{removeVariant(product_id,id)}} />
				</div>
			)}
		</Draggable>
	);
};

export default Variant;
