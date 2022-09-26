import { createContext, useContext, useState, useMemo } from "react";

export const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
	const [Products, setProducts] = useState([
		{
			title: "",
			id: "null",
			variants: [],
		},
	]);
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

	const removeItem = (idx) => {
		setProducts((prevProducts) =>
			prevProducts.filter((product, index) => idx !== index)
		);
	};
	const reorderVariant = (product_id, srcIndex, destIndex) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) => {
				if (product.id === product_id) {
					const variants = Array.from(product.variants);
					variants.splice(
						destIndex,
						0,
						...variants.splice(srcIndex, 1)
					);
					console.log(variants);
					product.variants = variants;
					return product;
				} else {
					return product;
				}
			})
		);
	};

	const removeVariant = (product_id, variant_id) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) => {
				if (product.id === product_id) {
					const variants = Array.from(product.variants);
					product.variants = variants.filter(
						({ id }) => id !== variant_id
					);
					return product;
				} else {
					return product;
				}
			})
		);
	};

	const store = useMemo(
		() => ({
			Products,
			setProducts,
			disableAddProducts:
				PickedProducts.length === 0 ||
				PickedProducts.length + ProductsLength > 4,
			setPickedProducts,
			ProductsLength,
			reorderVariant,
			removeVariant,
			removeItem,
			EditIndex,
			setEditIndex,
			addProducts,
		}),
		[
			Products,
			setProducts,
			PickedProducts,
			removeItem,
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
