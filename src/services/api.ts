import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL, // IP correto da sua máquina
});

export default api;
