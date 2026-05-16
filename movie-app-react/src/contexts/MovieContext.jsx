import { createContext,useState,useContext,useEffect } from "react";
import { searchMovies } from "../services/api";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {

  const [favorites,setFavorites] = useState(() => {
     const storedFavs = localStorage.getItem("favorites");
     if(!storedFavs || storedFavs === "undefined"){
      return [];
     } 
     try{
      return JSON.parse(storedFavs);
     } catch(error){
      console.error("Error parsing favorites from localStorage:",error);
      return [];
     }
     return storedFavs ? JSON.parse(storedFavs) : [] ;
    });
  
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  },[favorites])

  const addToFavorites = (movie) => {
    setFavorites(prev => [...prev,movie])
  }

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId))
  }

  const isFavorite = (movieId) =>{
    return favorites?.some(movie => movie.id === movieId) || false ;
  }

  const values = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }

  return <MovieContext.Provider value={values}>
      {children}
    </MovieContext.Provider>
  
}