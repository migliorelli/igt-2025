import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY || ''}`,
    },
})

export default http