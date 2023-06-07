import axios from "axios";

// Base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/550?api_key=b4219458d740edabc394879969d7c443&language=pt-BR

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
