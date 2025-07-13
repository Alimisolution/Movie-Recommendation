import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import { FaUsers, FaFilm, FaStar, FaComments, FaChartBar, FaCog, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './Admin.css';

const Admin = () => {
  const { currentUser } = useAuth();
  const { movies, ratings, reviews } = useMovies();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock users for admin panel
  const mockUsers = [
    { id: 1, name: 'Admin User', email: 'admin@movie.com', role: 'admin', status: 'active', joinDate: '2024-01-01' },
    { id: 2, name: 'John Doe', email: 'user@movie.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
    { id: 3, name: 'Jane Smith', email: 'jane@movie.com', role: 'user', status: 'active', joinDate: '2024-02-01' },
    { id: 4, name: 'Bob Johnson', email: 'bob@movie.com', role: 'user', status: 'inactive', joinDate: '2024-01-20' }
  ];

  // Check if user is admin
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="content-wrapper">
        <div className="container">
          <div className="admin-access-denied">
            <h2>Access Denied</h2>
            <p>You need administrator privileges to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => user.status === 'active').length;
  const totalMovies = movies.length;
  const totalRatings = ratings.length;
  const totalReviews = reviews.length;
  const averageRating = ratings.length > 0 
    ? (ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length).toFixed(1)
    : 0;

  const topRatedMovies = movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const mostReviewedMovies = movies
    .map(movie => ({
      ...movie,
      reviewCount: reviews.filter(review => review.movieId === movie.id).length
    }))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
    { id: 'users', label: 'Users', icon: FaUsers },
    { id: 'movies', label: 'Movies', icon: FaFilm },
    { id: 'reviews', label: 'Reviews', icon: FaComments },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  return (
    <div className="content-wrapper">
      <div className="container">
        {/* Admin Header */}
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {currentUser.name}</p>
        </motion.div>

        {/* Admin Navigation */}
        <motion.div
          className="admin-nav"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            className="admin-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Statistics Cards */}
            <div className="stats-grid">
              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <FaUsers className="stat-icon" />
                <div className="stat-content">
                  <h3>{totalUsers}</h3>
                  <p>Total Users</p>
                  <span className="stat-subtitle">{activeUsers} active</span>
                </div>
              </motion.div>

              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <FaFilm className="stat-icon" />
                <div className="stat-content">
                  <h3>{totalMovies}</h3>
                  <p>Total Movies</p>
                  <span className="stat-subtitle">In database</span>
                </div>
              </motion.div>

              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <FaStar className="stat-icon" />
                <div className="stat-content">
                  <h3>{totalRatings}</h3>
                  <p>Total Ratings</p>
                  <span className="stat-subtitle">Avg: {averageRating}/5</span>
                </div>
              </motion.div>

              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <FaComments className="stat-icon" />
                <div className="stat-content">
                  <h3>{totalReviews}</h3>
                  <p>Total Reviews</p>
                  <span className="stat-subtitle">User feedback</span>
                </div>
              </motion.div>
            </div>

            {/* Top Movies Section */}
            <div className="admin-sections">
              <motion.div
                className="admin-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2>Top Rated Movies</h2>
                <div className="movie-list">
                  {topRatedMovies.map((movie, index) => (
                    <div key={movie.id} className="movie-item">
                      <img src={movie.poster} alt={movie.title} />
                      <div className="movie-info">
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <div className="rating">
                          <FaStar />
                          {movie.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="admin-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2>Most Reviewed Movies</h2>
                <div className="movie-list">
                  {mostReviewedMovies.map((movie, index) => (
                    <div key={movie.id} className="movie-item">
                      <img src={movie.poster} alt={movie.title} />
                      <div className="movie-info">
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <div className="review-count">
                          {movie.reviewCount} reviews
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            className="admin-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="section-header">
              <h2>User Management</h2>
              <button className="btn btn-primary">Add User</button>
            </div>

            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <img src={`https://via.placeholder.com/40/667eea/ffffff?text=${user.name.charAt(0)}`} alt={user.name} />
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view">
                            <FaEye />
                          </button>
                          <button className="action-btn edit">
                            <FaEdit />
                          </button>
                          <button className="action-btn delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Movies Tab */}
        {activeTab === 'movies' && (
          <motion.div
            className="admin-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="section-header">
              <h2>Movie Management</h2>
              <button className="btn btn-primary">Add Movie</button>
            </div>

            <div className="movies-grid grid grid-4">
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  className="admin-movie-card card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                    <div className="movie-actions">
                      <button className="action-btn edit">
                        <FaEdit />
                      </button>
                      <button className="action-btn delete">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <div className="movie-stats">
                      <span className="rating">
                        <FaStar />
                        {movie.rating}
                      </span>
                      <span className="reviews">
                        {reviews.filter(r => r.movieId === movie.id).length} reviews
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <motion.div
            className="admin-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="section-header">
              <h2>Review Management</h2>
            </div>

            <div className="reviews-list">
              {reviews.map((review, index) => {
                const movie = movies.find(m => m.id === review.movieId);
                return (
                  <motion.div
                    key={review.id}
                    className="admin-review-item card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="review-header">
                      <div className="reviewer-info">
                        <img src={`https://via.placeholder.com/40/667eea/ffffff?text=${review.userName.charAt(0)}`} alt={review.userName} />
                        <div>
                          <h3>{review.userName}</h3>
                          <p>{movie?.title}</p>
                        </div>
                      </div>
                      <div className="review-rating">
                        <FaStar />
                        {review.rating}/5
                      </div>
                    </div>
                    <div className="review-content">
                      <p>{review.review}</p>
                      <span className="review-date">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="review-actions">
                      <button className="action-btn view">
                        <FaEye />
                      </button>
                      <button className="action-btn delete">
                        <FaTrash />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            className="admin-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="section-header">
              <h2>System Settings</h2>
            </div>

            <div className="settings-grid">
              <div className="setting-card card">
                <h3>General Settings</h3>
                <div className="setting-item">
                  <label>Site Name</label>
                  <input type="text" defaultValue="Movie Recommendation System" />
                </div>
                <div className="setting-item">
                  <label>Admin Email</label>
                  <input type="email" defaultValue="admin@movie.com" />
                </div>
                <button className="btn btn-primary">Save Changes</button>
              </div>

              <div className="setting-card card">
                <h3>Content Settings</h3>
                <div className="setting-item">
                  <label>Movies per page</label>
                  <input type="number" defaultValue="12" min="1" max="50" />
                </div>
                <div className="setting-item">
                  <label>Enable user registration</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin; 