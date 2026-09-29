import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getMovieDetails } from "../services/movieApi";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  return (
    <div className="app">
      <Navbar />

      <main className="details-page">
        {loading && <Loading />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && movie && (
          <div className="movie-details">
            <div className="details-poster">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
              />
            </div>

            <div className="details-content">
              <h1>{movie.title}</h1>

              <p className="rating">
                ⭐ {movie.vote_average?.toFixed(1)} / 10
              </p>

              <p>
                <strong>Release Date:</strong>{" "}
                {movie.release_date || "N/A"}
              </p>

              <p>
                <strong>Runtime:</strong>{" "}
                {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
              </p>

              <p>
                <strong>Genres:</strong>{" "}
                {movie.genres?.map((genre) => genre.name).join(", ") ||
                  "N/A"}
              </p>

              <h2>Overview</h2>

              <p className="overview">
                {movie.overview || "No description available."}
              </p>

              <Link to="/" className="back-button">
                ← Back to Movies
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MovieDetails;