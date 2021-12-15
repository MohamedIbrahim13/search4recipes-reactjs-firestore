import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

import "./Navbar.css";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const { color } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Search 4 Recipes</h1>
        </Link>
        <Searchbar />
        <Link to="/cook-recipe">Cook Recipe</Link>
      </nav>
    </div>
  );
};

export default Navbar;
