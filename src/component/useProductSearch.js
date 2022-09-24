import React, { useEffect, useState } from "react";
import axios from "axios";

const useProductSearch = (query, pageNum) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [queryProducts, setQueryProducts] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setQueryProducts([]);
	}, [query]);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: "GET",
			url: "https://stageapibc.monkcommerce.app/admin/shop/product",
			params: { search: query, page: pageNum },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setQueryProducts((prevProducts) =>
					res.data ? [...prevProducts, ...res.data] : prevProducts
				);
				setHasMore(res.data && res.data.length > 0);
				setLoading(false);
				console.log(res.data ? res.data[0] : null);
			})
			.catch((err) => {
				if (axios.isCancel(err)) return;
				setError(true);
				console.log(err, err.response);
			});

		return () => cancel();
	}, [query, pageNum]);

	return { loading, error, queryProducts, hasMore };
};

export default useProductSearch;
