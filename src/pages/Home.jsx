import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import CategoryFilter from "../components/CategoryFilter";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
} from "../services/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError("Unable to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadPopularMovies();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchMovies(searchQuery);
      setMovies(data);
    } catch (err) {
      setError("Unable to search movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      loadPopularMovies();
      return;
    }

    const genreIds = {
      Action: 28,
      Comedy: 35,
      Drama: 18,
      Horror: 27,
      Romance: 10749,
      "Science Fiction": 878,
    };

    try {
      setLoading(true);
      setError("");

      const data = await getMoviesByGenre(genreIds[category]);
      setMovies(data);
    } catch (err) {
      setError("Unable to load category movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main className="home-page">
        <section className="hero">
          <h1>Discover Movies</h1>

          <p>
            Search and explore your favorite movies.
          </p>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </section>

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />

        <section className="movies-section">
          {loading && <Loading />}

          {error && <ErrorMessage message={error} />}

          {!loading && !error && (
            <MovieGrid movies={movies} />
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;