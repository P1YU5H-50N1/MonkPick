import { createContext, useContext, useState, useMemo } from "react";

export const ProductContext = createContext({
	Products: null,
});

const ProductProvider = ({ children }) => {
	const [Products, setProducts] = useState([]);
	const ProductsLength = Products.filter((p) => p.id !== "null").length;
	const [PickedProducts, setPickedProducts] = useState([]);
	const [EditIndex, setEditIndex] = useState(null);


	const addProducts = (e) => {
		setProducts((products) => [
			...products.slice(0, EditIndex),
			...PickedProducts,
			...products.slice(EditIndex + 1),
		]);
		setPickedProducts([]);
	};
	
	const store = useMemo(
		() => ({
			Products,
			setProducts,
			disableAddProducts:
				PickedProducts.length === 0 ||
				PickedProducts.length + ProductsLength > 4,
			setPickedProducts,
			EditIndex,
			setEditIndex,
			addProducts,
		}),
		[
			Products,
			setProducts,
			PickedProducts,
			setPickedProducts,
			EditIndex,
			setEditIndex,
		]
	);

	
	return (
		<ProductContext.Provider value={store}>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductProvider;
