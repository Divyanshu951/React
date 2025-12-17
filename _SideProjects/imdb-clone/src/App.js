import { useEffect, useState } from "react";
import "./index.css";

// https://www.omdbapi.com/?t=Interstellar&apikey=6ce769c8
const API = "6ce769c8";

export default function App() {
  let title = "Interstellar";
  function handleQuery(query) {
    title = query;
  }

  return (
    <>
      <Header onHandleQuery={handleQuery} />
      <Main query={title} />
    </>
  );
}

function Header({ onHandleQuery }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onHandleQuery(query);
  }

  return (
    <header className="main-header">
      <div className="logo">
        IMDb<span className="highlight">Redesigned</span>
      </div>
      <form className="search-container" onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          id="searchInput"
          placeholder="Search for a movie (e.g. Inception)..."
        />
        <button id="searchBtn">
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </header>
  );
}

function Main({ title }) {
  const [movieData, setMovieData] = useState([]);

  useEffect(
    function () {
      async function fetchMovieData() {
        const res = await fetch(
          `https://www.omdbapi.com/?t=${title}&apikey=${API}`
        );
        const data = await res.json();
        console.log(data);
        setMovieData(data);
      }

      fetchMovieData();
    },
    [title]
  );

  return (
    <main id="movie-display" className="movie-container">
      <div className="backdrop-layer">
        <img src={movieData.Poster} alt="Background" />
        <div className="backdrop-overlay"></div>
      </div>

      <div className="content-card">
        <div className="poster-wrapper">
          <img src={movieData.Poster} alt="Poster" className="main-poster" />
        </div>

        <div className="details-wrapper">
          <div className="header-row">
            <h1 className="movie-title">{movieData.Title}</h1>
            <div className="rating-badge">
              <span className="star">★ </span>
              <span className="score">{movieData.imdbRating}</span>
              <span className="votes"> / 10</span>
            </div>
          </div>

          <div className="meta-row">
            <span className="tag year">{movieData.Year}</span>
            <span className="tag rating-cert">{movieData.Rated}</span>
            <span className="tag runtime">{movieData.Runtime}</span>

            {movieData.length !== 0 &&
              movieData.Genre.split(",").map((genre) => (
                <span className="genre" key={genre.trim()}>
                  {genre.trim()}
                </span>
              ))}
          </div>

          <div className="action-row">
            <a
              // Fix this
              href="https://www.youtube.com/results?search_query=python+tutorial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-primary">▶ Watch Trailer</button>
            </a>
            <button className="btn-secondary">+ Watchlist</button>
          </div>

          <div className="plot-section">
            <h3>Plot</h3>
            <p className="plot-text">{movieData.Plot}</p>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="label">Director</span>
              <span className="value">{movieData.Director}</span>
            </div>
            <div className="info-item">
              <span className="label">Stars</span>
              <span className="value">{movieData.Actors}</span>
            </div>
            <div className="info-item">
              <span className="label">Box Office</span>
              <span className="value">{movieData.BoxOffice}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
