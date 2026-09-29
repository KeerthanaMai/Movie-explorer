import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={imageUrl}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </p>

        <span>
          {movie.release_date
            ? movie.release_date.substring(0, 4)
            : "Unknown"}
        </span>
      </div>
    </Link>
  );
}

export default MovieCard;