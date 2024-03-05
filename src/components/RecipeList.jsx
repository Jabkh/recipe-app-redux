import { useEffect, useState } from "react";
import axios from "axios";
import RecipeItem from "./RecipeItem";
import { BASE_DB_URL } from "../config/firebaseConfig";
import { useSelector, useDispatch } from 'react-redux';
import { resetChangeFlag } from '../slices/recipesSlice';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const hasChanged = useSelector(state => state.recipes.hasChanged);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${BASE_DB_URL}recipes.json`);
        const data = response.data;
        if (data) {
          const fetchedRecipes = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setRecipes(fetchedRecipes);
        }
        dispatch(resetChangeFlag()); // Réinitialiser le drapeau de modification après avoir récupéré les recettes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [hasChanged, dispatch]); // Déclencher l'effet à chaque changement de hasChanged ou de dispatch

  return (
    <>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Instructions</th>
            <th scope="col">Temps de cuisson</th>
            <th scope="col">Temps de préparation</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {recipes.map((recipe) => (
            <RecipeItem recipe={recipe} key={recipe.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecipeList;
