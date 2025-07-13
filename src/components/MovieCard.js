import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaPlay } from 'react-icons/fa';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const { id, title, year, genre, rating, poster, director } = movie;

  const handleImageError = (e) => {
    // Create a gradient fallback based on the movie title
    const colors = ['#667eea', '#764ba2', '#16213e', '#0f3460', '#667eea', '#764ba2', '#16213e', '#0f3460'];
    const colorIndex = id % colors.length;
    e.target.style.background = `linear-gradient(135deg, ${colors[colorIndex]}, ${colors[(colorIndex + 1) % colors.length]})`;
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <motion.div
      className="movie-card card hover-lift"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="movie-poster">
        <img 
          src={poster} 
          alt={title} 
          className="poster-image" 
          onError={handleImageError}
        />
        <div className="poster-fallback" style={{ display: 'none' }}>
          <div className="fallback-content">
            <h3>{title}</h3>
            <p>{year}</p>
          </div>
        </div>
        <div className="movie-overlay">
          <Link to={`/movie/${id}`} className="play-button">
            <FaPlay />
          </Link>
        </div>
        <div className="movie-rating">
          <FaStar />
          <span>{rating}</span>
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">
          <Link to={`/movie/${id}`}>
            {title}
          </Link>
        </h3>
        
        <div className="movie-meta">
          <span className="movie-year">{year}</span>
          <span className="movie-director">{director}</span>
        </div>
        
        <div className="movie-genres">
          {genre.slice(0, 2).map((g, index) => (
            <span key={index} className="genre-tag">
              {g}
            </span>
          ))}
          {genre.length > 2 && (
            <span className="genre-tag more">+{genre.length - 2}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard; 