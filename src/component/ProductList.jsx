import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ProductInput from "./ProductInput";
import { ProductContext } from "./ProductProvider";
import ProductPickerWrapper from "./ProductPickerWrapper";

const ProductList = () => {
	// const [Products, setProducts] = useState()
	const [openPicker, setOpenPicker] = useState(false);
	const { Products, setProducts } = useContext(ProductContext);
	// const setProducts = ()=>{console.log("set")}
	// const onBeforeCapture = () => {
	// 	/*...*/
	// };

	// const onBeforeDragStart = () => {
	// 	/*...*/
	// };

	// const onDragStart = () => {
	// 	/*...*/
	// };
	// const onDragUpdate = () => {
	// 	/*...*/
	// };
	const onDragEnd = (result) => {
		const items = Array.from(Products);
		items.splice(
			result.destination.index,
			0,
			...items.splice(result.source.index, 1)
		);
		setProducts(items);
	};

	return (
		<>
			<div>
				<ProductPickerWrapper
					isOpen={openPicker}
					setIsOpen={setOpenPicker}
				/>
				<div className="text-base font-medium">Add Products</div>
				<div>
					<div className="flex gap-5 mt-4">
						<div>Product</div>
						<div>Discount</div>
					</div>
					<DragDropContext
						// onBeforeCapture={onBeforeCapture}
						// onBeforeDragStart={onBeforeDragStart}
						// onDragStart={onDragStart}
						// onDragUpdate={onDragUpdate}
						onDragEnd={onDragEnd}
					>
						<Droppable droppableId="products" type="products">
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{Products.map(({ title, id }, idx) => (
										<ProductInput
											key={id==="null"?idx:id.toString()}
											title={title}
											id={id==="null"?`${idx}monk`:id}
											openPicker={() =>
												setOpenPicker(true)
											}
											idx={idx}
										/>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>

				{Products.length < 4 ? (
					<button
						onClick={() => {
							setProducts((prevProducts) => [
								...prevProducts,
								{
									title: "",
									id: "null",
								},
							]);
						}}
						className="border-button border-4 text-button py-2 px-4 rounded-sm"
					>
						Add Product
					</button>
				) : null}
			</div>
		</>
	);
};

export default ProductList;
