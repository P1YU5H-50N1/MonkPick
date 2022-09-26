import React, { useContext, useState,useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import RemoveIcon from "./RemoveIcon";
import { ProductContext } from "./ProductProvider";
import DragHandleIcon from "./DragHandleIcon";

const Variant = ({ variant, index, discount }) => {
	const { title, admin_graphql_api_id, product_id, id } = variant;
	const { removeVariant } = useContext(ProductContext);
	const [Discount, setDiscount] = useState(Number(discount));
    useEffect(()=>{
        setDiscount(Number(discount))
    },[discount])
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
					<div className="bg-white p-3 w-full rounded-3xl shadow-md">
						{title}
					</div>
					{Discount === null ? (
						<button
							onClick={() => setDiscount(0)}
							className="bg-button text-white py-2 px-4 rounded-md"
						>
							Add Discount
						</button>
					) : (
						<>
							<input
								type="text"
								min="0"
								max="100"
								class=" form-control block w-20 px-3 py-1.5 text-base font-normal   bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:bg-white focus:outline-none "
								value={Discount}
								type="number"
								onChange={(e) => setDiscount(e.target.value)}
							/>
							<select className="form-select block w-28 px-3 py-[0.5rem] text-base font-normal   bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0  focus:bg-white focus:outline-none">
								<option selected value="1">
									% Off
								</option>
								<option value="2">Flat Off</option>
							</select>
						</>
					)}
					<RemoveIcon
						onClick={() => {
							removeVariant(product_id, id);
						}}
					/>
				</div>
			)}
		</Draggable>
	);
};

export default Variant;
