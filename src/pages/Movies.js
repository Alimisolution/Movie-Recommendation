import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { FaSearch, FaFilter, FaTimes, FaStar, FaCalendar } from 'react-icons/fa';
import './Movies.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { movies, searchMovies, getTopRatedMovies, getLatestMovies, loading } = useMovies();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Build unique genres from loaded movies
  const genres = React.useMemo(() => {
    const genreSet = new Set();
    movies.forEach(movie => {
      if (Array.isArray(movie.genre)) {
        movie.genre.forEach(g => genreSet.add(g));
      } else if (typeof movie.genre === 'string' && movie.genre.length > 0) {
        genreSet.add(movie.genre);
      }
    });
    return Array.from(genreSet).sort((a, b) => a.localeCompare(b));
  }, [movies]);

  useEffect(() => {
    let results = movies;

    // Apply search filter
    if (searchQuery) {
      results = searchMovies(searchQuery);
    }

    // Apply genre filter
    if (selectedGenre) {
      results = results.filter(movie => movie.genre.includes(selectedGenre));
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredMovies(results);
  }, [movies, searchQuery, selectedGenre, sortBy, searchMovies]);

  useEffect(() => {
    // Update URL when search query changes
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(selectedGenre === genre ? '' : genre);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSortBy('title');
    setShowFilters(false);
  };

  const getTopMovies = () => {
    return getTopRatedMovies(3);
  };

  const getRecentMovies = () => {
    return getLatestMovies(3);
  };

  // Debug: log movies missing id
  filteredMovies.forEach(m => {
    if (!m.id) console.warn('Movie in filteredMovies missing id:', m);
  });

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <div className="container">
        {/* Header */}
        <motion.div
          className="movies-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">
            Discover Movies
            <FaSearch className="section-icon" />
          </h1>
          <p className="section-subtitle">
            Explore our collection of amazing films
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="movies-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="search-container">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search movies by title, director, or genre..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-search"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          <div className="filters-container">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`filter-toggle btn ${showFilters ? 'active' : ''}`}
            >
              <FaFilter />
              Filters
            </button>

            {showFilters && (
              <motion.div
                className="filters-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="filter-section">
                  <h3>Genre</h3>
                  <div className="genre-filters">
                    {genres.map(genre => (
                      <button
                        key={genre}
                        onClick={() => handleGenreFilter(genre)}
                        className={`genre-filter ${selectedGenre === genre ? 'active' : ''}`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-section">
                  <h3>Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="sort-select"
                  >
                    <option value="title">Title</option>
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                  </select>
                </div>

                <button onClick={clearFilters} className="clear-filters">
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Active Filters Display */}
        {(searchQuery || selectedGenre) && (
          <motion.div
            className="active-filters"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>Active filters:</span>
            {searchQuery && (
              <span className="filter-tag">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <FaTimes />
                </button>
              </span>
            )}
            {selectedGenre && (
              <span className="filter-tag">
                Genre: {selectedGenre}
                <button onClick={() => setSelectedGenre('')}>
                  <FaTimes />
                </button>
              </span>
            )}
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          className="results-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p>
            Showing {filteredMovies.length} of {movies.length} movies
          </p>
        </motion.div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <motion.div
            className="movies-grid grid grid-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="no-results-content">
              <h3>No movies found</h3>
              <p>Try adjusting your search criteria or filters</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Featured Sections */}
        {!searchQuery && !selectedGenre && (
          <>
            {/* Top Rated Section */}
            <motion.section
              className="featured-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">
                Top Rated Movies
                <FaStar className="section-icon" />
              </h2>
              <div className="grid grid-3">
                {getTopMovies().map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Latest Movies Section */}
            <motion.section
              className="featured-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">
                Latest Releases
                <FaCalendar className="section-icon" />
              </h2>
              <div className="grid grid-3">
                {getRecentMovies().map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </div>
    </div>
  );
};

export default Movies; 