import React, { useState } from "react";
import {
	DragDropContext,
	Droppable,
	Draggable,
	resetServerContext,
} from "react-beautiful-dnd";
import DragHandleIcon from "./DragHandleIcon";

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
									<Draggable
										key={id.toString()}
										index={idx}
										draggableId={id.toString()}
									>
										{(provided, snapshot) => (
											<div
												className="flex gap-5 mt-4 items-center"
												ref={provided.innerRef}
												// {...provided.dragHandleProps}
												{...provided.draggableProps}
											>
												<DragHandleIcon
													{...provided.dragHandleProps}
												/>
												<p>{idx + 1}.</p>
												<input
													onChange={(e) => {}}
													placeholder="Select Product"
													className="p-2"
													value={title}
												/>
												<button className="bg-button text-white py-2 px-4 rounded-md">
													Add Discount
												</button>
											</div>
										)}
									</Draggable>
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
