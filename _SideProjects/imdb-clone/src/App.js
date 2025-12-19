import { useEffect, useState } from "react";
import "./index.css";

// https://www.omdbapi.com/?s=Interstellar&apikey=6ce769c8
const API_KEY = "6ce769c8";
const FALLBACK_POSTER =
  "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [visibleResultPanel, setVisibleResultPanel] = useState(false);

  useEffect(
    function () {
      if (query.length < 3) {
        setVisibleResultPanel(false);
        setMovies([]);
        setError("");
        return;
      }

      async function fetchMovies() {
        try {
          setVisibleResultPanel(true);
          setLoading(true);

          const res = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
          );

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found!");

          console.log(data);
          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchMovies();
    },
    [query]
  );

  function handleClickId(id) {
    setSelectedId(id);
    setVisibleResultPanel(false);
  }

  return (
    <>
      <Header
        query={query}
        onQuery={setQuery}
        loading={loading}
        error={error}
        movies={movies}
        onClickId={handleClickId}
        visibleResultPanel={visibleResultPanel}
      />
      <Main imdbId={selectedId} />
    </>
  );
}

function Header({
  query,
  onQuery,
  movies,
  loading,
  error,
  onClickId,
  visibleResultPanel,
}) {
  return (
    <header className="main-header">
      <div className="logo">
        IMDb<span className="highlight">Redesigned</span>
      </div>
      <form className="search-container" onSubmit={(e) => e.preventDefault()}>
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
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
        {visibleResultPanel && (
          <SearchListContainer
            loading={loading}
            error={error}
            movies={movies}
            onClickId={onClickId}
          />
        )}
      </form>
    </header>
  );
}

function SearchListContainer({ movies, error, loading, onClickId }) {
  return (
    <div className="search-list-container">
      {loading && <p>Loading...</p>}
      {error && movies.length < 1 && !loading && (
        <p className="error">{error}</p>
      )}
      {movies.map((movie) => (
        <SearchListItem
          key={movie.imdbID}
          movieDetails={movie}
          onClickId={onClickId}
        />
      ))}
    </div>
  );
}

function SearchListItem({ movieDetails, onClickId }) {
  return (
    <div
      className="search-list-item"
      onClick={() => onClickId(movieDetails.imdbID)}
    >
      <img
        className="search-item-img"
        src={movieDetails.Poster}
        onError={(e) => {
          e.currentTarget.src = FALLBACK_POSTER;
        }}
        alt={`${movieDetails.Title} poster`}
      />
      <div className="search-item-details">
        <h2>{movieDetails.Title}</h2>
        <h4>{movieDetails.Year}</h4>
        <p>{movieDetails.Type}</p>
      </div>
    </div>
  );
}

function Main({ imdbId = "tt0260100" }) {
  // Initialize as null to represent "No Data Yet"
  const [movieData, setMovieData] = useState(null);
  const [movieLoading, setMovieLoading] = useState(false);

  useEffect(
    function () {
      if (!imdbId) return; // Don't fetch if no ID is selected

      async function fetchMovieData() {
        setMovieLoading(true);
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`
          );
          const data = await res.json();
          setMovieData(data);
        } catch (err) {
          console.error(err);
        } finally {
          setMovieLoading(false);
        }
      }

      fetchMovieData();
    },
    [imdbId]
  );

  // Early return for cleaner JSX
  if (movieLoading)
    return (
      <p
        style={{
          fontSize: "44px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </p>
    );

  // If no movie is selected yet, show a welcome message
  if (!movieData)
    return <p className="welcome">Start by searching for a movie!</p>;

  return (
    <main id="movie-display" className="movie-container">
      <div className="backdrop-layer">
        <img src={movieData.Poster} alt="Background" />
        <div className="backdrop-overlay"></div>
      </div>

      {!movieLoading ? (
        <div className="content-card">
          <div className="poster-wrapper">
            <img
              src={
                movieData.Poster === "N/A" ? FALLBACK_POSTER : movieData.Poster
              }
              onError={(e) => {
                e.currentTarget.src = FALLBACK_POSTER;
              }}
              alt="Poster"
              className="main-poster"
            />
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
                movieData.Genre?.split(",").map((genre) => (
                  <span className="genre" key={genre.trim()}>
                    {genre.trim()}
                  </span>
                ))}
            </div>

            <div className="action-row">
              <a
                // Fix this
                href={`https://www.youtube.com/results?search_query=${movieData.Title}+trailer`}
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
      ) : (
        <p style={{ fontSize: "44px" }}>Loading...</p>
      )}
    </main>
  );
}
