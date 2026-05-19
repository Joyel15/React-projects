# 🎬 Movie App

A simple React application that allows users to browse popular movies, search for movies, and save their favorite movies.

## Features

* View popular movies
* Search movies by title
* Add movies to favorites
* Remove movies from favorites
* Favorites are saved using Local Storage
* Responsive user interface

## Technologies Used

* React
* JavaScript (ES6+)
* Tailwind CSS
* TMDB API
* Local Storage

## Project Structure

```
src/
│── components/
│   └── MovieCard.jsx
│
│── contexts/
│   └── MovieContext.jsx
│
│── pages/
│   ├── Home.jsx
│   └── Favorites.jsx
│
│── services/
│   └── api.js
│
│── App.jsx
│── main.jsx
```

## Installation

1. Clone the repository.

```bash
git clone <repository-url>
```

2. Navigate to the project folder.

```bash
cd movie-app
```

3. Install dependencies.

```bash
npm install
```

4. Start the development server.

```bash
npm run dev
```

The application will run on:

```
http://localhost:5173
```

## How It Works

* The app loads popular movies when it starts.
* Users can search for movies using the search bar.
* Clicking the heart icon adds or removes a movie from Favorites.
* Favorite movies are stored in the browser using Local Storage, so they remain available after refreshing the page.

## Future Improvements

* Movie details page
* Genre filtering
* Pagination
* Dark/Light theme
* Movie trailers and ratings

## Author

Developed by Joyel
