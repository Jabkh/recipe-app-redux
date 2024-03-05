import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_DB_URL } from "../config/firebaseConfig";
import { addRecipe } from "../slices/recipesSlice";

const RecipeForm = () => {
  const titleRef = useRef();
  const instructionsRef = useRef();
  const cookTimeRef = useRef();
  const prepTimeRef = useRef();
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      title: titleRef.current.value,
      instructions: instructionsRef.current.value,
      cookTime: parseInt(cookTimeRef.current.value),
      prepTime: parseInt(prepTimeRef.current.value),
      ingredients: [],
    };

    if (user.idToken) {
      axios.post(`${BASE_DB_URL}recipes.json?auth=${user.idToken}`, newRecipe)
        .then((response) => {
          console.log(response.data);
          dispatch(addRecipe(newRecipe));
        })
        .catch((error) => {
          console.error('Error adding recipe:', error);
        });
    }
  }

  return ( 
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="recipeTitle">
        <Form.Label>Titre</Form.Label>
        <Form.Control type="text" placeholder="Titre" ref={titleRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="recipeInstructions">
        <Form.Label>Instructions</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Instructions" ref={instructionsRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="recipeCookTime">
        <Form.Label>Temps de cuisson (minutes)</Form.Label>
        <Form.Control type="number" placeholder="Temps de cuisson" ref={cookTimeRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="recipePrepTime">
        <Form.Label>Temps de préparation (minutes)</Form.Label>
        <Form.Control type="number" placeholder="Temps de préparation" ref={prepTimeRef} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Ajouter
      </Button>
    </Form>
   );
}
 
export default RecipeForm;
