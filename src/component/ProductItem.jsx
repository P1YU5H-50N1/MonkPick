import React from "react";

const ProductItem = ({ title, lastProductRef }) => {
	return (
		<div ref={lastProductRef} className="mt-2 text px-6 border-t">
			{title}
		</div>
	);
};

export default ProductItem;
