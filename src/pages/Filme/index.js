import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./filme.css";

import api from "../../services/api";
function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "b4219458d740edabc394879969d7c443",
            language: "pt-BR",
            page: 1,
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
        });
    }

    loadFilme();

    return () => {
      console.log("componente desmontado");
    };
  }, []);
  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average}/10</strong>
      <div className="buttons-area">
        <button>Salvar</button>
        <button>
          <a href="#">Trailer</a>
        </button>
      </div>
    </div>
  );
}
export default Filme;
