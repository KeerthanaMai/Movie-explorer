function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = [
    { name: "All", id: null },
    { name: "Action", id: 28 },
    { name: "Comedy", id: 35 },
    { name: "Drama", id: 18 },
    { name: "Horror", id: 27 },
    { name: "Romance", id: 10749 },
    { name: "Science Fiction", id: 878 },
  ];

  return (
    <div className="category-filter">
      <h2>Browse by Category</h2>

      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.name}
            className={
              selectedCategory === category.name ? "active" : ""
            }
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;