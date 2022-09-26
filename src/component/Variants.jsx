import React, { useState, useContext } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ProductContext } from "./ProductProvider";
import Variant from "./Variant";

const Variants = ({ variants, productid, discount }) => {
	const [Show, setShow] = useState(false);
    const {reorderVariant,} = useContext(ProductContext);

	const onDragEnd = (result) => {
        reorderVariant(productid,result.source.index,result.destination.index)
	};

	if (variants && variants.length <= 1) {
		return null;
	}

	return (
		<>
			<button
				onClick={() => setShow(!Show)}
				className="flex self-end items-center text-blue-500 underline p-2 mb-2"
			>
				{Show ? (
					<>
						<p>Hide Variants</p>
						<HiChevronDown />
					</>
				) : (
					<>
						<p>Show Variants</p>
						<HiChevronDown />
					</>
				)}
			</button>
			{/* <div> */}
				{Show ? (
					<DragDropContext
						// onBeforeCapture={onBeforeCapture}
						// onBeforeDragStart={onBeforeDragStart}
						// onDragStart={onDragStart}
						// onDragUpdate={onDragUpdate}
						onDragEnd={onDragEnd}
					>
						<Droppable droppableId="variants" type="variants">
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="flex flex-col gap-4 ml-10"
								>
									{variants.map((variant,index) => (
										<Variant
                                            discount={discount}
											key={variant.admin_graphql_api_id}
											variant={variant}
                                            index={index}
										/>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				) : null}
			{/* </div> */}
		</>
	);
};

export default Variants;
