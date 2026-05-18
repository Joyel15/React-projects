import MovieCard from "../components/MovieCard";
import React,{useState,useEffect} from "react";
import { searchMovies , getPopularMovies } from "../services/api";

function Home(){

  const [searchQuery,setSearchQuery] = useState("");
  const [movies,setMovies] = useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch(err){
        console.log(err)
        setError("Failed to load movies")
      }
      finally{
        setLoading(false)
      }
    }
    loadPopularMovies()
  },[])
 
  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()) return
    if(loading) return
    
    setLoading(true)
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults)
      setError(null)
    }catch(err) {
      console.log(err)
      setError("Failed to search movies");
    } finally {
      setLoading(false)
    }
  };

return (
  <div>
    <div className="flex justify-center items-center gap-2 m-8">
      <form onSubmit={handleSearch} className="flex gap-3">
        <input type="text"  placeholder="Search for movies..."  onChange={(e)=> setSearchQuery(e.target.value)} 
        className="text-gray-200 p-3 bg-gray-700 rounded-lg outline-none text-lg hover:bg-gray-600"/>
      <button type="submit" className="bg-red-600 text-white p-3 rounded-xl text-lg hover:bg-red-700">Search</button>
      </form>

      {error && <div className="text-2xl text-red-600 font-bold">{error}</div>}
    </div>

    {loading? 
    (<div className="">Loading.....</div>) 
     :
    (<div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 w-full">
      {movies.map((movie) => ( 
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>)}
  </div>
 );
}

export default Home;