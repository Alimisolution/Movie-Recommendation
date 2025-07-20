import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import { FaStar, FaPlay, FaArrowLeft, FaUser, FaCalendar, FaClock, FaGlobe, FaLanguage } from 'react-icons/fa';
import { Rating } from 'react-simple-star-rating';
import './MovieDetail.css';

const API_BASE = 'https://movierecommender-i9ne.onrender.com/api';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { 
    getMovieReviews, 
    getUserRating, 
    addRating, 
    addReview,
    loading: moviesLoading, // rename to avoid conflict
    getMovieById // Added getMovieById to the context
  } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    review: ''
  });

  const handleImageError = (e) => {
    // Create a gradient fallback based on the movie title
    const colors = ['#667eea', '#764ba2', '#16213e', '#0f3460', '#667eea', '#764ba2', '#16213e', '#0f3460'];
    const colorIndex = movie?.id ? movie.id % colors.length : 0;
    e.target.style.background = `linear-gradient(135deg, ${colors[colorIndex]}, ${colors[(colorIndex + 1) % colors.length]})`;
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  const isObjectId = typeof id === 'string' && id.length >= 12;

  useEffect(() => {
    if (isObjectId) {
      // Fetch from backend
      const fetchMovie = async () => {
        setLoading(true);
        try {
          console.log('Fetching movie with id:', id);
          const res = await fetch(`${API_BASE}/movies/${id}`);
          const data = await res.json();
          console.log('API response:', data);
          if (res.ok && data) {
            // Normalize movie data
            const normalized = {
              ...data,
              id: data._id || data.id,
              poster: data.poster || 'https://via.placeholder.com/300x450?text=No+Image',
              genre: Array.isArray(data.genre)
                ? data.genre
                : typeof data.genre === 'string' && data.genre.length > 0
                  ? data.genre.split(',').map(g => g.trim())
                  : [],
              title: data.title || 'Untitled',
              year: data.year || '',
              director: data.director || '',
              rating: data.rating || 0,
              description: data.description || '',
              cast: Array.isArray(data.cast)
                ? data.cast
                : typeof data.cast === 'string' && data.cast.length > 0
                  ? data.cast.split(',').map(c => c.trim())
                  : [],
              duration: data.duration || '',
              country: data.country || '',
              language: data.language || '',
            };
            setMovie(normalized);
          } else {
            setMovie(null);
          }
        } catch (err) {
          console.error('Error fetching movie:', err);
          setMovie(null);
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    } else {
      // Use local movie data from loaded list
      const localMovie = getMovieById(id);
      if (localMovie) {
        setMovie(localMovie);
        setLoading(false);
      } else {
        setMovie(null);
        setLoading(false);
      }
    }
  }, [id, isObjectId, getMovieById]);

  useEffect(() => {
    if (movie) {
      console.log('Local movie object:', movie);
    }
  }, [movie]);

  useEffect(() => {
    if (movie) {
      const movieReviews = getMovieReviews(id);
      setReviews(movieReviews);
      if (currentUser) {
        const rating = getUserRating(id, currentUser.id);
        setUserRating(rating);
      }
    }
  }, [movie, id, currentUser, getMovieReviews, getUserRating]);

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
    addRating(id, newRating);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewForm.rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (reviewForm.review.trim().length < 10) {
      alert('Review must be at least 10 characters long');
      return;
    }

    addReview(id, reviewForm.review, reviewForm.rating);
    setReviewForm({ rating: 0, review: '' });
    setShowReviewForm(false);
    
    // Refresh reviews
    const updatedReviews = getMovieReviews(id);
    setReviews(updatedReviews);
  };

  const handleReviewChange = (e) => {
    setReviewForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="content-wrapper">
        <div className="container">
          <div className="movie-not-found">
            <h2>Movie not found</h2>
            <p>The movie you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/movies')} className="btn btn-primary">
              <FaArrowLeft />
              Back to Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : movie.rating;

  return (
    <div className="content-wrapper">
      <div className="container">
        {/* Show local preview message if not ObjectId */}
        {!isObjectId && (
          <>
            <div className="local-preview-message" style={{marginBottom: '1rem', color: '#b85c00', background: '#fffbe6', padding: '1rem', borderRadius: '8px'}}>
              <p>This is a local preview. Full details are not available for this movie.</p>
            </div>
            <div className="movie-header">
              <div className="movie-poster-section">
                <div className="movie-poster">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    onError={handleImageError}
                  />
                </div>
              </div>
              <div className="movie-info-section">
                <h1 className="movie-title">{movie.title}</h1>
                <div className="movie-meta">
                  <div className="meta-item">
                    <span>{movie.year ? movie.year : ''}</span>
                  </div>
                </div>
                <div className="movie-genres">
                  {movie.genres && (
                    movie.genres.split('|').map((g, i) => (
                      <span key={i} className="genre-tag">{g}</span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {/* Full detail view for ObjectId movies */}
        {isObjectId && (
          <>
            {/* Back Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="back-button"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaArrowLeft />
              Back
            </motion.button>

            {/* Movie Header */}
            <motion.div
              className="movie-header"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="movie-poster-section">
                <div className="movie-poster">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    onError={handleImageError}
                  />
                  <div className="poster-fallback" style={{ display: 'none' }}>
                    <div className="fallback-content">
                      <h3>{movie.title}</h3>
                      <p>{movie.year}</p>
                    </div>
                  </div>
                  <div className="movie-poster-overlay">
                    <button className="play-button">
                      <FaPlay />
                    </button>
                  </div>
                </div>
              </div>

              <div className="movie-info-section">
                <h1 className="movie-title">{movie.title}</h1>
                
                <div className="movie-meta">
                  <div className="meta-item">
                    <FaCalendar />
                    <span>{movie.year ? movie.year : 'Not available'}</span>
                  </div>
                  <div className="meta-item">
                    <FaClock />
                    <span>{movie.duration ? movie.duration : 'Not available'}</span>
                  </div>
                  <div className="meta-item">
                    <FaGlobe />
                    <span>{movie.country ? movie.country : 'Not available'}</span>
                  </div>
                  <div className="meta-item">
                    <FaLanguage />
                    <span>{movie.language ? movie.language : 'Not available'}</span>
                  </div>
                </div>

                <div className="movie-rating-section">
                  <div className="rating-display">
                    <FaStar className="star-icon" />
                    <span className="rating-value">{movie.rating ? movie.rating : 'Not available'}</span>
                    <span className="rating-count">({reviews.length} reviews)</span>
                  </div>
                  
                  {currentUser && (
                    <div className="user-rating">
                      <span>Your rating:</span>
                      <Rating
                        ratingValue={userRating}
                        onClick={handleRatingChange}
                        size={24}
                        fillColor="#ffd700"
                        emptyColor="#333"
                        allowHalfIcon={false}
                      />
                    </div>
                  )}
                </div>

                <div className="movie-genres">
                  {movie.genre && movie.genre.length > 0
                    ? movie.genre.map((genre, index) => (
                        <span key={index} className="genre-tag">
                          {genre}
                        </span>
                      ))
                    : movie.genres
                      ? <span className="genre-tag">{movie.genres}</span>
                      : <span className="genre-tag">Not available</span>
                  }
                </div>

                <div className="movie-description">
                  <h3>Synopsis</h3>
                  <p>{movie.description ? movie.description : "Not available"}</p>
                </div>

                {movie.cast && movie.cast.length > 0 && (
                  <div className="movie-cast">
                    <h3>Cast</h3>
                    <div className="cast-list">
                      {movie.cast.map((actor, index) => (
                        <span key={index} className="cast-member">
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {movie.director
                  ? (
                    <div className="movie-director">
                      <h3>Director</h3>
                      <p>{movie.director}</p>
                    </div>
                  )
                  : (
                    <div className="movie-director">
                      <h3>Director</h3>
                      <p>Not available</p>
                    </div>
                  )
                }
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.section
              className="reviews-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="reviews-header">
                <h2>Reviews ({reviews.length})</h2>
                {currentUser && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="btn btn-primary"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {!currentUser && (
                <div className="login-prompt">
                  <p>Please log in to write reviews and rate movies.</p>
                </div>
              )}

              {showReviewForm && currentUser && (
                <motion.form
                  className="review-form card"
                  onSubmit={handleReviewSubmit}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h3>Write Your Review</h3>
                  
                  <div className="form-group">
                    <label>Rating</label>
                    <Rating
                      ratingValue={reviewForm.rating}
                      onClick={(nextValue) => setReviewForm(prev => ({ ...prev, rating: nextValue }))}
                      size={24}
                      fillColor="#ffd700"
                      emptyColor="#333"
                      allowHalfIcon={false}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea
                      id="review"
                      name="review"
                      value={reviewForm.review}
                      onChange={handleReviewChange}
                      placeholder="Share your thoughts about this movie..."
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}

              <div className="reviews-list">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      className="review-item card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="review-header">
                        <div className="reviewer-info">
                          <FaUser className="user-icon" />
                          <span className="reviewer-name">{review.userName}</span>
                        </div>
                        <div className="review-rating">
                          <Rating
                            ratingValue={review.rating}
                            size={20}
                            fillColor="#ffd700"
                            emptyColor="#333"
                            allowHalfIcon={false}
                            readonly={true}
                          />
                        </div>
                      </div>
                      
                      <div className="review-content">
                        <p>{review.review}</p>
                      </div>
                      
                      <div className="review-date">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="no-reviews">
                    <p>No reviews yet. Be the first to review this movie!</p>
                  </div>
                )}
              </div>
            </motion.section>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetail; 