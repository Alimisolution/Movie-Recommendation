# Movie Recommendation System

A comprehensive React-based movie recommendation system with machine learning concepts, built for final year projects. This application provides personalized movie recommendations, user authentication, rating and review systems, and connects to a real backend API.

## 🎬 Features

### Core Features
- **User Authentication**: Secure login/register system with JWT token authentication
- **Movie Discovery**: Browse and search through a curated collection of movies from backend API
- **Personalized Recommendations**: ML-based recommendation algorithm using user preferences
- **Rating System**: Rate movies with real-time backend integration
- **Review System**: Write detailed reviews (local storage with backend integration planned)
- **Advanced Search**: Search by title, director, genre, and more
- **Responsive Design**: Beautiful UI that works on all devices

### User Features
- **User Profiles**: Manage personal information and movie preferences
- **Activity Tracking**: View your rated movies and written reviews
- **Movie Details**: Comprehensive movie information with cast, director, and reviews
- **Genre Preferences**: Set your favorite genres for better recommendations

### Backend Integration
- **Real API**: Connects to deployed backend at `https://movierecommender-i9ne.onrender.com/api`
- **JWT Authentication**: Secure token-based authentication
- **Movie Data**: Fetches real movie data from backend
- **Rating System**: Real-time rating submission to backend
- **Recommendations**: ML-powered recommendations from backend

## 🚀 Technologies Used

- **Frontend**: React 18, React Router DOM
- **Build Tool**: Vite (Fast build tool and dev server)
- **Styling**: CSS3 with modern animations and responsive design
- **State Management**: React Context API
- **UI Components**: Custom components with Framer Motion animations
- **Icons**: React Icons
- **Rating System**: React Star Rating Component
- **Notifications**: React Hot Toast
- **HTTP Client**: Fetch API (native)
- **Backend**: Python Flask with ML algorithms

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd Movie-Recommendation-System
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## 🔌 API Endpoints

The application connects to a real backend API with the following endpoints:

| Method | Endpoint               | Description                     | Auth |
| ------ |------------------------| ------------------------------- | ---- |
| POST   | `/api/register`        | Register a new user             | ❌    |
| POST   | `/api/login`           | Login and get JWT token         | ❌    |
| GET    | `/api/movies`          | Get list of all movies          | ✅    |
| POST   | `/api/rate`            | Submit a movie rating           | ✅    |
| GET    | `/api/recommendations` | Get recommended movies for user | ✅    |

## 👤 Demo Credentials

### Admin Account
- **Email**: admin@movie.com
- **Password**: admin123

### User Account
- **Email**: user@movie.com
- **Password**: user123

## 🎯 How to Use

### For Users

1. **Register/Login**: Create an account or use the demo credentials
2. **Set Preferences**: Go to your profile and select your favorite movie genres
3. **Browse Movies**: Explore the movie collection on the Movies page
4. **Rate & Review**: Click on any movie to view details and add your rating/review
5. **Get Recommendations**: The home page shows personalized recommendations based on your preferences

### For Admins

1. **Login**: Use the admin credentials to access the admin panel
2. **Dashboard**: View system statistics and user activity
3. **User Management**: Monitor and manage user accounts
4. **Movie Management**: Add or edit movie entries
5. **Review Management**: Moderate user reviews and ratings

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation component
│   ├── MovieCard.js    # Movie card component
│   └── *.css          # Component styles
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state management
│   └── MovieContext.js # Movie data and recommendations
├── pages/              # Application pages
│   ├── Home.js         # Landing page with recommendations
│   ├── Movies.js       # Movie browsing and search
│   ├── MovieDetail.js  # Individual movie page
│   ├── Login.js        # User authentication
│   ├── Register.js     # User registration
│   ├── Profile.js      # User profile management
│   ├── Admin.js        # Admin dashboard
│   └── *.css          # Page styles
├── App.js              # Main application component
├── index.js            # Application entry point
└── *.css              # Global styles
```

## 🎨 Design Features

- **Dark Theme**: Modern dark UI with gradient accents
- **Glass Morphism**: Beautiful glass-like effects
- **Smooth Animations**: Framer Motion powered animations
- **Responsive Layout**: Works perfectly on mobile, tablet, and desktop
- **Interactive Elements**: Hover effects and micro-interactions

## 🔧 Available Scripts

- `npm run dev` - Runs the app in development mode with Vite
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

## 🎯 Machine Learning Concepts

This project implements several ML concepts through the backend API:

1. **Collaborative Filtering**: User-based recommendations
2. **Content-Based Filtering**: Genre-based recommendations
3. **Hybrid Approach**: Combines multiple recommendation strategies
4. **Preference Learning**: Adapts to user behavior over time

## 🔌 Backend Integration

The frontend connects to a real backend API that provides:

- **Movie Data**: Comprehensive movie information with metadata
- **User Authentication**: JWT-based secure authentication
- **Rating System**: Real-time rating submission and retrieval
- **Recommendation Engine**: ML-powered movie recommendations
- **User Management**: User registration and profile management

## 🚀 Deployment

To deploy this application:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**:
   - **Netlify**: Drag and drop the `dist` folder
   - **Vercel**: Connect your GitHub repository
   - **Firebase**: Use Firebase Hosting
   - **AWS S3**: Upload the `dist` folder

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Form validation and sanitization
- **Role-Based Access**: Admin and user role management
- **API Security**: Backend API with proper authentication
- **Data Protection**: Secure data transmission

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill the process using port 3000
   npx kill-port 3000
   ```

2. **Dependencies not installed**:
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**:
   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite
   npm run build
   ```

4. **Vite dev server issues**:
   ```bash
   # Restart the dev server
   npm run dev -- --force
   ```

5. **API Connection Issues**:
   - Check if the backend API is running
   - Verify the API_BASE URL in context files
   - Check network connectivity

## 📄 License

This project is created for educational purposes as a final year project.

## 🤝 Contributing

This is a demo project for educational purposes. Feel free to use it as a reference for your own projects.

## 📞 Support

For any questions or issues:
1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Refer to the React and Vite documentation for framework-specific questions
4. Check the backend API status at the deployed endpoint

---

**Note**: This application connects to a real backend API for movie data and recommendations. The backend is deployed and provides ML-powered movie recommendations based on user preferences and ratings.

