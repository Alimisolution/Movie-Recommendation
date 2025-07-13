import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { FaPlay, FaStar, FaArrowRight } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const { currentUser } = useAuth();
  const { 
    getRecommendations, 
    getTopRatedMovies, 
    getLatestMovies,
    loading 
  } = useMovies();
  
  const [recommendations, setRecommendations] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    if (!loading) {
      const userPrefs = currentUser?.preferences || [];
      setRecommendations(getRecommendations(userPrefs));
      setTopRated(getTopRatedMovies(6));
      setLatest(getLatestMovies(6));
    }
  }, [loading, currentUser, getRecommendations, getTopRatedMovies, getLatestMovies]);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
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

  return (
    <div className="content-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div 
            className="hero-content"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="hero-title">
              Discover Your Next
              <span className="gradient-text"> Favorite Movie</span>
            </h1>
            <p className="hero-subtitle">
              Get personalized movie recommendations based on your taste and preferences. 
              Rate, review, and discover amazing films from our curated collection.
            </p>
            <div className="hero-buttons">
              <Link to="/movies" className="btn btn-primary">
                <FaPlay />
                Browse Movies
              </Link>
              {!currentUser && (
                <Link to="/register" className="btn btn-secondary">
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        </div>
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
      </section>

      {/* Recommendations Section */}
      {currentUser && recommendations.length > 0 && (
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">
                Recommended for You
                <FaStar className="section-icon" />
              </h2>
              <p className="section-subtitle">
                Based on your preferences: {currentUser.preferences.join(', ')}
              </p>
            </motion.div>
            
            <div className="grid grid-3">
              {recommendations.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
            
            <div className="section-footer">
              <Link to="/movies" className="btn btn-secondary">
                View All Movies
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Top Rated Movies */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              Top Rated Movies
              <FaStar className="section-icon" />
            </h2>
            <p className="section-subtitle">
              The highest rated movies by our community
            </p>
          </motion.div>
          
          <div className="grid grid-3">
            {topRated.map((movie, index) => (
              <motion.div
                key={movie.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Movies */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              Latest Releases
              <FaPlay className="section-icon" />
            </h2>
            <p className="section-subtitle">
              Discover the newest additions to our collection
            </p>
          </motion.div>
          
          <div className="grid grid-3">
            {latest.map((movie, index) => (
              <motion.div
                key={movie.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Choose Movie Rec?</h2>
            <p className="section-subtitle">
              Experience the future of movie discovery
            </p>
          </motion.div>
          
          <div className="grid grid-3">
            <motion.div
              className="feature-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">🎯</div>
              <h3>Personalized Recommendations</h3>
              <p>Get movie suggestions tailored to your taste using advanced machine learning algorithms.</p>
            </motion.div>
            
            <motion.div
              className="feature-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">⭐</div>
              <h3>Rate & Review</h3>
              <p>Share your thoughts and help others discover great movies through your ratings and reviews.</p>
            </motion.div>
            
            <motion.div
              className="feature-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Find exactly what you're looking for with our powerful search and filtering system.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 