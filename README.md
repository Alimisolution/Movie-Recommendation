# Movie Recommendation System

A comprehensive React-based movie recommendation system with machine learning concepts, built for final year projects. This application provides personalized movie recommendations, user authentication, rating and review systems, and an admin dashboard.

## 🎬 Features

### Core Features
- **User Authentication**: Secure login/register system with role-based access
- **Movie Discovery**: Browse and search through a curated collection of movies
- **Personalized Recommendations**: ML-based recommendation algorithm using user preferences
- **Rating & Review System**: Rate movies and write detailed reviews
- **Advanced Search**: Search by title, director, genre, and more
- **Responsive Design**: Beautiful UI that works on all devices

### User Features
- **User Profiles**: Manage personal information and movie preferences
- **Activity Tracking**: View your rated movies and written reviews
- **Movie Details**: Comprehensive movie information with cast, director, and reviews
- **Genre Preferences**: Set your favorite genres for better recommendations

### Admin Features
- **Dashboard**: Overview of system statistics and user activity
- **User Management**: View and manage user accounts
- **Movie Management**: Add, edit, and manage movie entries
- **Review Management**: Moderate user reviews and ratings
- **System Settings**: Configure application settings

## 🚀 Technologies Used

- **Frontend**: React 18, React Router DOM
- **Styling**: CSS3 with modern animations and responsive design
- **State Management**: React Context API
- **UI Components**: Custom components with Framer Motion animations
- **Icons**: React Icons
- **Rating System**: React Star Rating Component
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 14 or higher)
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
   npm start
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

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

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

## 🎯 Machine Learning Concepts

This project implements several ML concepts:

1. **Collaborative Filtering**: User-based recommendations
2. **Content-Based Filtering**: Genre-based recommendations
3. **Hybrid Approach**: Combines multiple recommendation strategies
4. **Preference Learning**: Adapts to user behavior over time

## 🚀 Deployment

To deploy this application:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**:
   - **Netlify**: Drag and drop the `build` folder
   - **Vercel**: Connect your GitHub repository
   - **Firebase**: Use Firebase Hosting
   - **AWS S3**: Upload the `build` folder

## 🔒 Security Features

- **Input Validation**: Form validation and sanitization
- **Role-Based Access**: Admin and user role management
- **Secure Authentication**: Mock authentication system
- **Data Protection**: Local storage for demo purposes

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
   # Clear build cache
   npm run build -- --reset-cache
   ```

## 📄 License

This project is created for educational purposes as a final year project.

## 🤝 Contributing

This is a demo project for educational purposes. Feel free to use it as a reference for your own projects.

## 📞 Support

For any questions or issues:
1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Refer to the React documentation for framework-specific questions

---

