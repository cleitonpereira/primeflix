import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./filme.css";
import { toast } from "react-toastify";

import api from "../../services/api";
function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("componente desmontado");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilmes = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilmes) {
      toast.warn("Este filme já está na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso");
  }

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
        <button onClick={salvarFilme}>Salvar</button>
        <a
          target="blank"
          rel="external"
          href={`https://youtube.com/results?search_query=${filme.title} trailer`}
        >
          <button>Trailer</button>
        </a>
      </div>
    </div>
  );
}
export default Filme;
