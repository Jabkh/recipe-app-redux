import { createSlice } from '@reduxjs/toolkit';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    formMode: "",
    recipes: [],
    selectedRecipe: null,
    ingredients: [],
    isLoading: false,
    error: null,
    hasChanged: false // Ajouter une propriété pour suivre les changements
  },
  reducers: {
    addRecipe: (state, action) => {
      const newRecipe = {
        id: Date.now(),
        title: action.payload.title,
        instructions: action.payload.instructions,
        cookTime: action.payload.cookTime,
        prepTime: action.payload.prepTime,
        ingredients: action.payload.ingredients,
      };

      state.recipes.push(newRecipe);
      state.hasChanged = true; // Marquer comme modifié après l'ajout d'une recette
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
      state.hasChanged = true; // Marquer comme modifié après la suppression d'une recette
    },
    updateRecipe: (state, action) => {
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      if (index !== -1) {
        state.recipes[index] = action.payload;
        state.hasChanged = true; // Marquer comme modifié après la mise à jour d'une recette
      }
    },
    resetChangeFlag :(state,action) =>{
      state.hasChanged = !state.hasChanged
  }
  }
});

export const { addRecipe, deleteRecipe, updateRecipe, resetChangeFlag } = recipesSlice.actions;
export default recipesSlice.reducer;
