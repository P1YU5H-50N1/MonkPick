import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ProductInput from "./ProductInput";
import ProductPicker from "./ProductPicker";

const ProductList = () => {
	const [Products, setProducts] = useState([
		{
			id: 77,
			title: "Fog Linen Chambray Towel - Beige Stripe",
			variants: [
				{
					id: 1,
					product_id: 77,
					title: "XS / Silver",
					price: "49",
				},
				{
					id: 2,
					product_id: 77,
					title: "S / Silver",
					price: "49",
				},
				{
					id: 3,
					product_id: 77,
					title: "M / Silver",
					price: "49",
				},
			],
			image: {
				id: 266,
				product_id: 77,
				src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
			},
		},
		{
			id: 80,
			title: "Orbit Terrarium - Large",
			variants: [
				{
					id: 64,
					product_id: 80,
					title: "Default Title",
					price: "109",
				},
			],
			image: {
				id: 272,
				product_id: 80,
				src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
			},
		},
	]);
	const [openPicker, setOpenPicker] = useState(false);
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
		<div>
			<ProductPicker isOpen={openPicker} setIsOpen={setOpenPicker} />
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
										title={title}
										id={id}
										openPicker={()=>setOpenPicker(true)}
										idx={idx}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</div>
	);
};

export default ProductList;
