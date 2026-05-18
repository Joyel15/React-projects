import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 w-full">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    );
  } else {
    return(
    <div className="flex flex-col justify-center items-center m-8">
      <h2 className="text-2xl text-gray-400">No Favorite Movies yet</h2>
      <p className="text-3xl text-gray-200">
        Start adding movies to your favorites and they will appear hear
      </p>
    </div>
    )
  }
}

export default Favorites;
