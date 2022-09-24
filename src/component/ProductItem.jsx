import React, { useCallback, useState } from "react";
import { MdOutlineBrokenImage } from "react-icons/md";
import { IconContext } from "react-icons";

const ProductItem = ({
	title,
	lastProductRef,
	image,
	variants,
	status,
	handle,
}) => {
	const [CheckedItems, setCheckedItems] = useState(
		new Array(variants.length).fill(false)
	);
	const [selected, setSelected] = useState(false);
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
				ref={lastProductRef}
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
							src={image}
						></img>
					) : (
						<div className="h-[52px] w-[52px] rounded-md flex items-center justify-center border">
							<IconContext.Provider
								value={{
									className:"text-slate-600",
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
						<div>{variants[0].inventory_quantity} available</div>
						<div>₹{Number(variants[0].price).toLocaleString()}</div>
					</div>
				) : null}
			</div>
			<div>
				{variants.length > 1
					? variants.map(
							({ title, inventory_quantity, price }, index) => (
								<div className=" justify-between text flex items-center py-4 pl-20 pr-10 border-t">
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
										<div>
											{inventory_quantity} available
										</div>
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
