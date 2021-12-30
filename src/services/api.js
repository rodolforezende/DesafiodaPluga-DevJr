import axios from 'axios';

const baseURL = 'https://pluga.co/ferramentas_search.json';

const api = () => axios.get(baseURL);

export default api;
