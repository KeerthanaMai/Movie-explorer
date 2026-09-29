function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;