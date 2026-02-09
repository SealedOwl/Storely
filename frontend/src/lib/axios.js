import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? BASE_URL : "/",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
