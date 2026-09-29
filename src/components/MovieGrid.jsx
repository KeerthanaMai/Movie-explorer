import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  const movieList = Array.isArray(movies)
    ? movies
    : movies?.movies || movies?.results || [];

  if (movieList.length === 0) {
    return <p className="no-movies">No movies found.</p>;
  }

  return (
    <div className="movie-grid">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;