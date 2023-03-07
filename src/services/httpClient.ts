import axios from "axios";

export const necktieHttpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
    timeout: 10000,
    headers: { 'x-api-key': import.meta.env.VITE_BACKEND_API_KEY },
});
