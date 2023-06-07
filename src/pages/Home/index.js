import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom'
import './home.css'

// Base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/550?api_key=b4219458d740edabc394879969d7c443&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "b4219458d740edabc394879969d7c443",
          language: "pt-BR",
          page: 1,
        },
      })

      //console.log(response.data.results.slice(0, 10));
      setFilmes(response.data.results.slice(0,10))
      
    }

    loadFilmes();
  }, [])

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return(
          <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}


export default Home;
