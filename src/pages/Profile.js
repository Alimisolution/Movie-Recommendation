import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes, FaStar, FaHeart, FaEye } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { currentUser, updateProfile, updatePreferences } = useAuth();
  const { movies, ratings, reviews } = useMovies();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || ''
  });
  const [selectedPreferences, setSelectedPreferences] = useState(
    currentUser?.preferences || []
  );

  const availableGenres = [
    'Action', 'Drama', 'Sci-Fi', 'Thriller', 'Crime', 
    'Romance', 'Comedy', 'Biography', 'Horror', 'Adventure'
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      updateProfile(editForm);
      updatePreferences(selectedPreferences);
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: currentUser?.name || '',
      email: currentUser?.email || ''
    });
    setSelectedPreferences(currentUser?.preferences || []);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePreferenceToggle = (genre) => {
    setSelectedPreferences(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const getUserRatings = () => {
    if (!currentUser) return [];
    return ratings.filter(rating => rating.userId === currentUser.id);
  };

  const getUserReviews = () => {
    if (!currentUser) return [];
    return reviews.filter(review => review.userId === currentUser.id);
  };

  const getRatedMovies = () => {
    const userRatings = getUserRatings();
    return userRatings.map(rating => {
      const movie = movies.find(m => m.id === rating.movieId);
      return { ...movie, userRating: rating.rating };
    }).filter(movie => movie.id);
  };

  const getReviewedMovies = () => {
    const userReviews = getUserReviews();
    return userReviews.map(review => {
      const movie = movies.find(m => m.id === review.movieId);
      return { ...movie, review: review };
    }).filter(movie => movie.id);
  };

  if (!currentUser) {
    return (
      <div className="content-wrapper">
        <div className="container">
          <div className="profile-not-found">
            <h2>Please log in to view your profile</h2>
            <p>You need to be logged in to access your profile page.</p>
          </div>
        </div>
      </div>
    );
  }

  const ratedMovies = getRatedMovies();
  const reviewedMovies = getReviewedMovies();

  return (
    <div className="content-wrapper">
      <div className="container">
        {/* Profile Header */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="profile-avatar">
            <img src={currentUser.avatar} alt={currentUser.name} />
            <div className="avatar-overlay">
              <FaUser />
            </div>
          </div>
          
          <div className="profile-info">
            <h1>{currentUser.name}</h1>
            <p className="user-email">
              <FaEnvelope />
              {currentUser.email}
            </p>
            <p className="user-role">
              Role: {currentUser.role === 'admin' ? 'Administrator' : 'User'}
            </p>
          </div>
        </motion.div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Personal Information */}
          <motion.section
            className="profile-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="section-header">
              <h2>Personal Information</h2>
              <button
                onClick={handleEditToggle}
                className={`edit-button btn ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
              >
                {isEditing ? <FaSave /> : <FaEdit />}
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="profile-form">
              <div className="form-group">
                <label>Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="info-value">{currentUser.name}</p>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="info-value">{currentUser.email}</p>
                )}
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button
                    onClick={handleCancelEdit}
                    className="btn btn-secondary"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </motion.section>

          {/* Movie Preferences */}
          <motion.section
            className="profile-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="section-header">
              <h2>Movie Preferences</h2>
              <span className="preferences-count">
                {selectedPreferences.length} selected
              </span>
            </div>

            <div className="preferences-grid">
              {availableGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => isEditing && handlePreferenceToggle(genre)}
                  className={`preference-tag ${selectedPreferences.includes(genre) ? 'selected' : ''} ${!isEditing ? 'disabled' : ''}`}
                  disabled={!isEditing}
                >
                  {genre}
                </button>
              ))}
            </div>

            {!isEditing && (
              <p className="preferences-note">
                Click "Edit" to modify your movie preferences
              </p>
            )}
          </motion.section>

          {/* User Activity */}
          <motion.section
            className="profile-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="section-header">
              <h2>Your Activity</h2>
            </div>

            <div className="activity-stats">
              <div className="stat-card">
                <FaStar className="stat-icon" />
                <div className="stat-content">
                  <h3>{ratedMovies.length}</h3>
                  <p>Movies Rated</p>
                </div>
              </div>

              <div className="stat-card">
                <FaHeart className="stat-icon" />
                <div className="stat-content">
                  <h3>{reviewedMovies.length}</h3>
                  <p>Reviews Written</p>
                </div>
              </div>

              <div className="stat-card">
                <FaEye className="stat-icon" />
                <div className="stat-content">
                  <h3>{selectedPreferences.length}</h3>
                  <p>Preferred Genres</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Rated Movies */}
          {ratedMovies.length > 0 && (
            <motion.section
              className="profile-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2>Your Rated Movies</h2>
              <div className="movies-grid grid grid-3">
                {ratedMovies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    className="rated-movie-card card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="movie-poster">
                      <img src={movie.poster} alt={movie.title} />
                      <div className="rating-badge">
                        <FaStar />
                        {movie.userRating}
                      </div>
                    </div>
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <p className="movie-year">{movie.year}</p>
                      <div className="movie-genres">
                        {movie.genre.slice(0, 2).map((genre, idx) => (
                          <span key={idx} className="genre-tag">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Reviewed Movies */}
          {reviewedMovies.length > 0 && (
            <motion.section
              className="profile-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2>Your Reviews</h2>
              <div className="reviews-list">
                {reviewedMovies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    className="review-item card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="review-movie-info">
                      <img src={movie.poster} alt={movie.title} className="review-movie-poster" />
                      <div className="review-movie-details">
                        <h3>{movie.title}</h3>
                        <p className="movie-year">{movie.year}</p>
                        <div className="review-rating">
                          <FaStar />
                          {movie.review.rating}/5
                        </div>
                      </div>
                    </div>
                    <div className="review-content">
                      <p>{movie.review.review}</p>
                      <span className="review-date">
                        {new Date(movie.review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 