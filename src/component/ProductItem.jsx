import React, { useCallback, useState, useContext, useEffect } from "react";
import { MdOutlineBrokenImage } from "react-icons/md";
import { ProductContext } from "./ProductProvider";
import { IconContext } from "react-icons";

const ProductItem = ({ product, lastProductRef }) => {
	const { id, title, image, variants, status, handle } = product;
	const { setPickedProducts, Products } = useContext(ProductContext);

	const [selected, setSelected] = useState(false);
	const [ThisPicked, setThisPicked] = useState(false);
	const [CheckedItems, setCheckedItems] = useState(() => {
		const [CurrentProduct] = Products.filter((curr) => curr.id === id);
		const checkedIds = CurrentProduct
			? CurrentProduct.variants.map(({ id }) => id)
			: [];
		const prevChecked = variants.map(({ id }) => checkedIds.includes(id));
		return prevChecked
	});

	
	const ref = lastProductRef
		? {
				ref: lastProductRef,
		  }
		: {};

	// console.log(title, "PRODUCT in selected");

	useEffect(() => {
		const includesFalse = CheckedItems.includes(false);
		const includesTrue = CheckedItems.includes(true);
		const allChecked = includesTrue && !includesFalse;
		const someChecked = includesTrue && includesFalse;
		const noneChecked = !includesTrue && includesFalse;

		if (allChecked) {
			if (!ThisPicked) {
				setPickedProducts((prevPicks) => [...prevPicks, product]);
				setThisPicked(true);
			}
		} else if (noneChecked) {
			setPickedProducts((prevPicks) =>
				prevPicks.filter((pick) => pick.title !== title)
			);
			setThisPicked(false);
		} else if (someChecked) {
			if (ThisPicked) {
				setPickedProducts((prevPicks) =>
					prevPicks.map((picked) => {
						if (picked.id === id) {
							return {
								...picked,
								variants: variants.filter(
									(variant, idx) => CheckedItems[idx]
								),
							};
						} else {
							return picked;
						}
					})
				);
			} else {
				setPickedProducts((prevPicks) => [
					...prevPicks,
					{
						...product,
						variants: variants.filter(
							(variant, idx) => CheckedItems[idx]
						),
					},
				]);
				setThisPicked(true);
			}
		}
	}, [CheckedItems]);

	const checkboxRef = useCallback(
		(checkbox) => {
			if (checkbox) {
				const includesFalse = CheckedItems.includes(false);
				const includesTrue = CheckedItems.includes(true);
				const someChecked = includesTrue && includesFalse;
				const allChecked = includesTrue && !includesFalse;

				if (someChecked) {
					checkbox.indeterminate = true;
				} else {
					checkbox.indeterminate = false;
					setSelected(allChecked);
				}
			}
		},
		[CheckedItems, selected]
	);

	const handleSubCheck = (e, index) => {
		setCheckedItems((checks) => [
			...checks.splice(0, index),
			e.target.checked,
			...checks.splice(1),
		]);
	};

	const handleCheck = (e) => {
		setSelected(e.target.checked);
		setCheckedItems((prev) => prev.map((check) => e.target.checked));
	};

	return (
		<div>
			<div
				{...ref}
				className="mt-2  text flex justify-between items-center py-3 pl-6 pr-10 border-t"
			>
				<div className="flex gap-3 items-center">
					<input
						checked={selected}
						onChange={handleCheck}
						className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-button checked:border-button focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
						ref={checkboxRef}
						type="checkbox"
					/>

					{image ? (
						<img
							height="52px"
							width="52px"
							className="rounded-md border"
							src={image.src}
						></img>
					) : (
						<div className="h-[52px] w-[52px] rounded-md flex items-center justify-center border">
							<IconContext.Provider
								value={{
									className: "text-slate-600",
									size: "28px",
								}}
							>
								<MdOutlineBrokenImage />
							</IconContext.Provider>
						</div>
					)}
					<div>{title}</div>
				</div>
				{variants.length === 1 ? (
					<div className="flex gap-5">
						{variants[0].inventory_quantity ? (
							<div>
								{variants[0].inventory_quantity} available
							</div>
						) : null}
						<div>₹{Number(variants[0].price).toLocaleString()}</div>
					</div>
				) : null}
			</div>
			<div>
				{variants.length > 1
					? variants.map(
							(
								{ title, inventory_quantity, price, id },
								index
							) => (
								<div
									key={id.toString()}
									className=" justify-between text flex items-center py-4 pl-20 pr-10 border-t"
								>
									<div className="flex gap-5">
										<input
											checked={CheckedItems[index]}
											onChange={(e) => {
												handleSubCheck(e, index);
											}}
											className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-button checked:border-button focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
											type="checkbox"
										/>

										<div>{title}</div>
									</div>
									<div className="flex gap-5">
										{inventory_quantity ? (
											<div>
												{inventory_quantity} available
											</div>
										) : null}
										<div>
											₹{Number(price).toLocaleString()}
										</div>
									</div>
								</div>
							)
					  )
					: null}
			</div>
		</div>
	);
};

export default ProductItem;
