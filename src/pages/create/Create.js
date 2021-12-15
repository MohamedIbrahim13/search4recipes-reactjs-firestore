import { useState, useRef } from "react";
//import { useFetch } from "../../hooks/useFetch";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIng, setNewIng] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingInput = useRef(null);
  // const { postData,data } = useFetch("http://localhost:3001/recipes", "POST");
  const navigate = useNavigate();

  const handleAdd = e => {
    e.preventDefault();
    const ing = newIng.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prev => [...prev, ing]);
    }
    setNewIng("");
    ingInput.current.focus();
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const collectionRef = collection(db, "foodies");
    //console.log(title, method, cookingTime)
    await addDoc(collectionRef, {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
    navigate("/");
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        {/* recipe ingredients here */}
        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={e => setNewIng(e.target.value)}
              value={newIng}
              ref={ingInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map(i => (
            <em key={i}>{i}, </em>
          ))}
        </p>
        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={e => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={e => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
};

export default Create;
