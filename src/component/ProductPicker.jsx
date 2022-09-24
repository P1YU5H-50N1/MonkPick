import React from "react";
import { useState, useRef, useCallback } from "react";
import useProductSearch from "./useProductSearch";
import ProductItem from "./ProductItem";
const ProductPicker = () => {
	const [query, setQuery] = useState("");
	const [pageNum, setPageNum] = useState(1);

	const handleSearch = (e) => {
		setQuery(e.target.value);
		setPageNum(1);
	};

	const { loading, error, queryProducts, hasMore } = useProductSearch(
		query,
		pageNum
	);
	console.log("Loading", loading);

	const observer = useRef();
	const observeContainer = useRef();

	const lastProductRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(
				(entries) => {
					console.log("API Observer", pageNum, hasMore);
					if (entries[0].isIntersecting) {
						// console.log("API Increment page num")
						setPageNum((prevPageNum) => prevPageNum + 1);
					}
				},
				{
					root: observeContainer.current,
				}
			);
			if (node) observer.current.observe(node);
			console.log(node);
		},
		[loading, hasMore]
	);

	return (
		<>
			<div className="mt-2 px-6 border-t pt-2">
				<div className="relative text-gray-600 border focus-within:text-gray-400">
					<span className="absolute inset-y-0 left-0 flex items-center pl-2">
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</span>
					<input
						type="search"
						name="q"
						value={query}
						onChange={handleSearch}
						className="py-2 text-sm pl-10 pr-5 w-full focus:outline-none focus:bg-white focus:text-gray-900"
						placeholder="Search..."
						autoComplete="off"
					/>
				</div>
			</div>
			<div ref={observeContainer} className="h-[60vh] overflow-y-auto">
				<div className="mt-2 text px-6 border-t">Product Item</div>
				{queryProducts.map(({ title, id }, idx) => {
					return queryProducts.length - 1 === idx ? (
						<ProductItem
							lastProductRef={lastProductRef}
							key={`${id.toString()} ${idx}`}
							title={title}
						/>
					) : (
						<ProductItem
							key={`${id.toString()} ${idx}`}
							title={title}
						/>
					);
				})}
				{loading ? (
					<div className="mt-2 text px-6 border-t">Loading...</div>
				) : null}
				{error ? (
					<div className="mt-2 text px-6 border-t">Error...</div>
				) : null}
			</div>
		</>
	);
};

export default ProductPicker;
