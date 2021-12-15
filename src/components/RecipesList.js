import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Trashcan from "../assets/trashcan.svg";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./RecipesList.css";

const RecipesList = ({ recipes }) => {
  const { mode } = useTheme();
  const handleClick = async id => {
    const docRef = doc(db, "foodies", id);
    await deleteDoc(docRef);
  };
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className="delete"
            onClick={() => handleClick(recipe.id)}
            src={Trashcan}
            alt="delete icon"
          />
        </div>
      ))}
    </div>
  );
};

export default RecipesList;
