import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pluga.co/ferramentas_search.json',
});

export default api;
