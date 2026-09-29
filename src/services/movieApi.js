const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

// Popular Movies
export const getPopularMovies = async (page = 1) => {
  const data = await fetchMovies(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  return {
    movies: data.results,
    page: data.page,
    totalPages: data.total_pages,
  };
};

// Search Movies
export const searchMovies = async (query, page = 1) => {
  const data = await fetchMovies(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false`
  );

  return {
    movies: data.results,
    page: data.page,
    totalPages: data.total_pages,
  };
};

// Movies by Category
export const getMoviesByGenre = async (genreId, page = 1) => {
  const data = await fetchMovies(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );

  return {
    movies: data.results,
    page: data.page,
    totalPages: data.total_pages,
  };
};

// Movie Details
export const getMovieDetails = async (movieId) => {
  const data = await fetchMovies(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );

  return data;
};