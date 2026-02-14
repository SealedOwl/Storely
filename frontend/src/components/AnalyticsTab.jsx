import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return (
			<h2 className="text-center text-3xl font-medium text-sky-500">
				Loading...
			</h2>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<AnalyticsCard
					title="Total Users"
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					color="from-emerald-500 to-teal-700"
				/>
				<AnalyticsCard
					title="Total Products"
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					color="from-emerald-500 to-green-700"
				/>
				<AnalyticsCard
					title="Total Sales"
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
					color="from-emerald-500 to-cyan-700"
				/>
				<AnalyticsCard
					title="Total Revenue"
					value={`$${analyticsData.totalRevenue.toLocaleString()}`}
					icon={DollarSign}
					color="from-emerald-500 to-lime-700"
				/>
			</div>
		</div>
	);
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
	<motion.div
		className={` rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className="flex justify-between items-center">
			<div className="z-10">
				<p className="text-sky-500 text-sm mb-1 font-semibold">{title}</p>
				<h3 className=" text-3xl font-bold">{value}</h3>
			</div>
		</div>
		<div className="absolute inset-0  opacity-30" />
		<div className="absolute -bottom-4 -right-4 text-sky-500 opacity-50">
			<Icon className="h-32 w-32" />
		</div>
	</motion.div>
);
