import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({movie}){

  const {isFavorite,addToFavorites,removeFromFavorites} = useMovieContext()
  const favorite = isFavorite(movie.id)

  function onFavoriteClick(e){
    e.preventDefault()
    if(favorite) {
      removeFromFavorites(movie.id)
    }else {
      addToFavorites(movie)
    }
  }

  return(
  <div>
      <div className="bg-gray-900 flex flex-col rounded-xl overflow-hidden px-1 py-2 hover:outline outline-white relative group">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="{movie.title}"  className="w-full h-full object-cover object-center rounded-lg"/>

        <button onClick={onFavoriteClick}  className="absolute top-3 right-3 z-10 p-2 bg-black/40 backdrop-blur-sm rounded-full  hover:bg-black/60 transition-colors">
              {favorite ? '❤' : '🤍'}
        </button>

        <h3 className="text-xl text-gray-200 font-serif font-bold text-center my-1">{movie.title}</h3>
        <p className="text-lg text-gray-400 font-bold text-center">{movie.release_date?.split("-")[0]}</p>
      </div>
  </div>
  )
}

export default MovieCard;