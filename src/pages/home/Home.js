import RecipesList from "../../components/RecipesList";
//import { useFetch } from "../../hooks/useFetch";
import { useCollection } from "../../hooks/useCollection";
import "./Home.css";

const Home = () => {
  // const { data, isPending, error } = useFetch("http://localhost:3001/recipes");
  const { data, isPending, error } = useCollection("foodies");
  console.log(data);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipesList recipes={data} />}
    </div>
  );
};

export default Home;
