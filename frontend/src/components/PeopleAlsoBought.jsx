import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import ProductCard from "./ProductCard";

function PeopleAlsoBought() {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				setIsLoading(true);
				const res = await axios(`/products/recommendations`);
				setRecommendations(res.data.recommendedProducts);

				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				toast.error(
					error.response?.data?.message ||
						"An error occurred while fetching recommendations",
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	// console.log(recommendations);

	if (isLoading) return <LoadingSpinner />;
	return (
		<div className="mt-8">
			<h3 className="text-2xl font-semibold text-sky-500">
				People also bought
			</h3>
			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg: grid-col-3">
				{recommendations.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}
export default PeopleAlsoBought;
