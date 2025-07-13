import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

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
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Mock movie data
  const mockMovies = [
    {
      id: 1,
      title: "Inception",
      year: 2010,
      director: "Christopher Nolan",
      genre: ["Sci-Fi", "Action", "Thriller"],
      rating: 8.8,
      poster: "https://picsum.photos/300/450?random=1",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
      duration: "148 min",
      language: "English",
      country: "USA"
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      year: 1994,
      director: "Frank Darabont",
      genre: ["Drama"],
      rating: 9.3,
      poster: "https://picsum.photos/300/450?random=2",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      duration: "142 min",
      language: "English",
      country: "USA"
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
      genre: ["Action", "Crime", "Drama"],
      rating: 9.0,
      poster: "https://picsum.photos/300/450?random=3",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      duration: "152 min",
      language: "English",
      country: "USA"
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      director: "Quentin Tarantino",
      genre: ["Crime", "Drama"],
      rating: 8.9,
      poster: "https://picsum.photos/300/450?random=4",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
      duration: "154 min",
      language: "English",
      country: "USA"
    },
    {
      id: 5,
      title: "Forrest Gump",
      year: 1994,
      director: "Robert Zemeckis",
      genre: ["Drama", "Romance"],
      rating: 8.8,
      poster: "https://picsum.photos/300/450?random=5",
      description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
      cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
      duration: "142 min",
      language: "English",
      country: "USA"
    },
    {
      id: 6,
      title: "The Matrix",
      year: 1999,
      director: "Lana Wachowski",
      genre: ["Sci-Fi", "Action"],
      rating: 8.7,
      poster: "https://picsum.photos/300/450?random=6",
      description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
      cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      duration: "136 min",
      language: "English",
      country: "USA"
    },
    {
      id: 7,
      title: "Goodfellas",
      year: 1990,
      director: "Martin Scorsese",
      genre: ["Biography", "Crime", "Drama"],
      rating: 8.7,
      poster: "https://picsum.photos/300/450?random=7",
      description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
      cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
      duration: "146 min",
      language: "English",
      country: "USA"
    },
    {
      id: 8,
      title: "The Silence of the Lambs",
      year: 1991,
      director: "Jonathan Demme",
      genre: ["Crime", "Drama", "Thriller"],
      rating: 8.6,
      poster: "https://picsum.photos/300/450?random=8",
      description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      cast: ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"],
      duration: "118 min",
      language: "English",
      country: "USA"
    }
  ];

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      movieId: 1,
      userId: 2,
      userName: "John Doe",
      rating: 5,
      review: "Absolutely mind-blowing! The concept of dream-sharing is executed perfectly. Christopher Nolan at his best.",
      date: "2024-01-15"
    },
    {
      id: 2,
      movieId: 1,
      userId: 1,
      userName: "Admin User",
      rating: 4,
      review: "Great movie with amazing visual effects. The plot is complex but rewarding.",
      date: "2024-01-10"
    },
    {
      id: 3,
      movieId: 2,
      userId: 2,
      userName: "John Doe",
      rating: 5,
      review: "A masterpiece of cinema. The story of hope and redemption is beautifully told.",
      date: "2024-01-12"
    }
  ];

  // Mock ratings data
  const mockRatings = [
    { id: 1, movieId: 1, userId: 2, rating: 5 },
    { id: 2, movieId: 1, userId: 1, rating: 4 },
    { id: 3, movieId: 2, userId: 2, rating: 5 },
    { id: 4, movieId: 3, userId: 2, rating: 5 },
    { id: 5, movieId: 4, userId: 1, rating: 4 },
    { id: 6, movieId: 5, userId: 2, rating: 4 },
    { id: 7, movieId: 6, userId: 1, rating: 5 },
    { id: 8, movieId: 7, userId: 2, rating: 4 },
    { id: 9, movieId: 8, userId: 1, rating: 3 }
  ];

  useEffect(() => {
    // Load mock data
    setMovies(mockMovies);
    setReviews(mockReviews);
    setRatings(mockRatings);
    setLoading(false);
  }, [mockMovies, mockReviews, mockRatings]);

  // Get movie by ID
  const getMovieById = (id) => {
    return movies.find(movie => movie.id === parseInt(id));
  };

  // Get reviews for a movie
  const getMovieReviews = (movieId) => {
    return reviews.filter(review => review.movieId === parseInt(movieId));
  };

  // Get user's rating for a movie
  const getUserRating = (movieId, userId) => {
    const rating = ratings.find(r => r.movieId === parseInt(movieId) && r.userId === userId);
    return rating ? rating.rating : 0;
  };

  // Add or update rating
  const addRating = (movieId, rating) => {
    if (!currentUser) {
      toast.error('Please login to rate movies');
      return;
    }

    const existingRating = ratings.find(r => r.movieId === parseInt(movieId) && r.userId === currentUser.id);
    
    if (existingRating) {
      // Update existing rating
      setRatings(prev => prev.map(r => 
        r.id === existingRating.id ? { ...r, rating } : r
      ));
      toast.success('Rating updated successfully');
    } else {
      // Add new rating
      const newRating = {
        id: ratings.length + 1,
        movieId: parseInt(movieId),
        userId: currentUser.id,
        rating
      };
      setRatings(prev => [...prev, newRating]);
      toast.success('Rating added successfully');
    }
  };

  // Add review
  const addReview = (movieId, review, rating) => {
    if (!currentUser) {
      toast.error('Please login to write reviews');
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      movieId: parseInt(movieId),
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      review,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [...prev, newReview]);
    
    // Also add rating if not already rated
    const existingRating = ratings.find(r => r.movieId === parseInt(movieId) && r.userId === currentUser.id);
    if (!existingRating) {
      addRating(movieId, rating);
    }
    
    toast.success('Review added successfully');
  };

  // Get recommendations based on user preferences
  const getRecommendations = (userPreferences = []) => {
    if (!userPreferences.length) {
      return movies.slice(0, 6); // Return top 6 movies if no preferences
    }

    // Simple recommendation algorithm based on genre preferences
    const scoredMovies = movies.map(movie => {
      let score = 0;
      userPreferences.forEach(pref => {
        if (movie.genre.includes(pref)) {
          score += 1;
        }
      });
      return { ...movie, score };
    });

    return scoredMovies
      .filter(movie => movie.score > 0)
      .sort((a, b) => b.score - a.score || b.rating - a.rating)
      .slice(0, 6);
  };

  // Search movies
  const searchMovies = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.director.toLowerCase().includes(lowercaseQuery) ||
      movie.genre.some(g => g.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Filter movies by genre
  const filterMoviesByGenre = (genre) => {
    return movies.filter(movie => movie.genre.includes(genre));
  };

  // Get top rated movies
  const getTopRatedMovies = (limit = 10) => {
    return movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  };

  // Get latest movies
  const getLatestMovies = (limit = 10) => {
    return movies
      .sort((a, b) => b.year - a.year)
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