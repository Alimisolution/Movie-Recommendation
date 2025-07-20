import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const API_BASE = 'https://movierecommender-i9ne.onrender.com/api';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Reviews and ratings are handled by backend, but we keep local state for UI updates
  const [reviews, setReviews] = useState([]); // Not used by backend, but for UI
  const [ratings, setRatings] = useState([]); // Not used by backend, but for UI

  // Fetch all movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/movies`, {
          headers: currentUser?.token ? { Authorization: `Bearer ${currentUser.token}` } : {}
        });
        const data = await res.json();
        if (res.ok) {
          // Normalize movie data
          const rawMovies = data.movies || data;
          const normalized = rawMovies.map((movie) => ({
            ...movie,
            id: movie._id || movie.id || movie.movieId, // always have id
            poster: movie.poster || 'https://via.placeholder.com/300x450?text=No+Image',
            genre: Array.isArray(movie.genre)
              ? movie.genre
              : typeof movie.genre === 'string' && movie.genre.length > 0
                ? movie.genre.split(',').map(g => g.trim())
                : [],
            title: movie.title || 'Untitled',
            year: movie.year || '',
            director: movie.director || '',
            rating: movie.rating || 0,
            description: movie.description || '',
            cast: Array.isArray(movie.cast)
              ? movie.cast
              : typeof movie.cast === 'string' && movie.cast.length > 0
                ? movie.cast.split(',').map(c => c.trim())
                : [],
            duration: movie.duration || '',
            country: movie.country || '',
            language: movie.language || '',
          }));
          setMovies(normalized);
        } else {
          setMovies([]);
          toast.error(data.message || 'Failed to fetch movies');
        }
      } catch (err) {
        setMovies([]);
        toast.error('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentUser]);

  // Get movie by ID
  const getMovieById = (id) => {
    return movies.find(movie => String(movie.id) === String(id));
  };

  // Get recommendations for current user
  const getRecommendations = async () => {
    if (!currentUser || !currentUser.token) return [];
    try {
      const res = await fetch(`${API_BASE}/recommendations`, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      const data = await res.json();
      if (res.ok) {
        return data.recommendations || data;
      } else {
        toast.error(data.message || 'Failed to fetch recommendations');
        return [];
      }
    } catch (err) {
      toast.error('Failed to fetch recommendations');
      return [];
    }
  };

  // Add or update rating for a movie
  const addRating = async (movieId, rating) => {
    if (!currentUser || !currentUser.token) {
      toast.error('Please login to rate movies');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({ movie_id: parseInt(movieId), rating })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Rating submitted!');
      } else {
        toast.error(data.message || 'Failed to submit rating');
      }
    } catch (err) {
      toast.error('Failed to submit rating');
    }
  };

  // Add review (local only, unless backend supports it)
  const addReview = (movieId, review, rating) => {
    // Optionally, you can POST to backend if supported
    setReviews(prev => [
      ...prev,
      {
        id: reviews.length + 1,
        movieId: parseInt(movieId),
        userId: currentUser?.id || 0,
        userName: currentUser?.email || 'User',
        rating,
        review,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    toast.success('Review added (local only)');
  };

  // Get reviews for a movie (local only)
  const getMovieReviews = (movieId) => {
    return reviews.filter(review => review.movieId === parseInt(movieId));
  };

  // Get user's rating for a movie (local only)
  const getUserRating = (movieId, userId) => {
    const rating = ratings.find(r => r.movieId === parseInt(movieId) && r.userId === userId);
    return rating ? rating.rating : 0;
  };

  // Search movies (client-side)
  const searchMovies = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.director?.toLowerCase().includes(lowercaseQuery) ||
      (Array.isArray(movie.genre) ? movie.genre.some(g => g.toLowerCase().includes(lowercaseQuery)) : false)
    );
  };

  // Filter movies by genre (client-side)
  const filterMoviesByGenre = (genre) => {
    return movies.filter(movie => Array.isArray(movie.genre) && movie.genre.includes(genre));
  };

  // Get top rated movies (client-side)
  const getTopRatedMovies = (limit = 10) => {
    return movies
      .slice()
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  };

  // Get latest movies (client-side)
  const getLatestMovies = (limit = 10) => {
    return movies
      .slice()
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, limit);
  };

  const value = {
    movies,
    reviews,
    ratings,
    loading,
    getMovieById,
    getMovieReviews,
    getUserRating,
    addRating,
    addReview,
    getRecommendations,
    searchMovies,
    filterMoviesByGenre,
    getTopRatedMovies,
    getLatestMovies
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}; 