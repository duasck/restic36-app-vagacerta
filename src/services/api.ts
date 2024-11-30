import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.122:3000/', // IP correto da sua máquina
});

export default api;
