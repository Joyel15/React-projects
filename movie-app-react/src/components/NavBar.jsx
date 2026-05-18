import { Link } from "react-router-dom";

function NavBar(){
  
  return(
    <nav className="bg-black p-6 flex justify-between items-center">
      <div className="text-blue-700 text-shadow-md text-shadow-red-500 flex justify-start text-3xl">
        <Link to="/" className="hover:text-blue-800">Movie App</Link>
      </div>
      <div className="text-blue-700 flex justify-end gap-x-10 text-3xl">
        <Link to="/" className="hover:text-blue-800">Home</Link>
        <Link to="/favorites" className="hover:text-blue-800">Favorites</Link>
      </div>
    </nav>
  )
}

export default NavBar;