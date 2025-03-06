
import axios from "axios";

// Set base URL for all API calls
// const baseURL = "http://localhost:10000"; // Replace with your actual backend URLhttps://gatepassapiserver.onrender.com/

const baseURL = "https://gatepassapiserver.onrender.com";

const Api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default Api;
