import { useLocation } from "react-router-dom";
import RecipesList from "../../components/RecipesList";
import { useFetch } from "../../hooks/useFetch";
import "./Search.css";

const Search = () => {
  const queryString = useLocation().search;
  const searchParams = new URLSearchParams(queryString);
  const query = searchParams.get("q");
  const url = `http://localhost:3001/recipes?q=${query}`;
  const { data, isPending, error } = useFetch(url);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipesList recipes={data} />}
    </div>
  );
};

export default Search;
