import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { BASE_DB_URL } from "../firebaseConfig";
import { updateRecipe, deleteRecipe,resetChangeFlag } from "../slices/recipesSlice";



const RecipeItem = ({ recipe }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const nameRef = useRef();
  const instructionsRef = useRef();
  const cookTimeRef = useRef();
  const prepTimeRef = useRef();
  const user = useSelector(state => state.auth.user);

  const updateRecipeHandler = async () => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const updatedRecipe = {
      id: recipe.id,
      title: nameRef.current.value,
      instructions: instructionsRef.current.value,
      cookTime: parseInt(cookTimeRef.current.value),
      prepTime: parseInt(prepTimeRef.current.value),
      ingredients: recipe.ingredients, // Garder les ingrédients inchangés pour l'exemple
    };

    try {
      await axios.put(`${BASE_DB_URL}recipes/${recipe.id}.json?auth=${user.idToken}`, updatedRecipe);
      dispatch(updateRecipe(updatedRecipe));
      dispatch(resetChangeFlag());
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const deleteRecipeHandler = async () => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await axios.delete(`${BASE_DB_URL}recipes/${recipe.id}.json?auth=${user.idToken}`);
      dispatch(deleteRecipe(recipe.id));
      dispatch(resetChangeFlag());
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <>
      {isEditing ? (
        <tr>
          <td>
            <input
              type="text"
              className="form-control"
              ref={nameRef}
              defaultValue={recipe.title}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              ref={instructionsRef}
              defaultValue={recipe.instructions}
            />
          </td>
          <td>
            <input
              type="number"
              className="form-control"
              ref={cookTimeRef}
              defaultValue={recipe.cookTime}
            />
          </td>
          <td>
            <input
              type="number"
              className="form-control"
              ref={prepTimeRef}
              defaultValue={recipe.prepTime}
            />
          </td>
          <td>
            <button
              onClick={updateRecipeHandler}
              className="btn btn-success"
            >
              Valider
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-danger"
            >
              Annuler
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{recipe.title}</td>
          <td>{recipe.instructions}</td>
          <td>{recipe.cookTime}</td>
          <td>{recipe.prepTime}</td>
          <td>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-warning"
            >
              Modifier
            </button>
            <button
              onClick={deleteRecipeHandler}
              className="btn btn-danger"
            >
              Supprimer
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default RecipeItem;
