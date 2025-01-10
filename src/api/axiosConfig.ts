import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});
