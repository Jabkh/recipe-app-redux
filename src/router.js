// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RecipeList from './components/RecipeList';
import SignForm from './components/auth/SignForm';
import AddRecipe from './components/RecipeForm';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><SignForm /></Layout>} />
        <Route path="/login" element={<Layout><SignForm /></Layout>} />
        <Route path="/recipes" element={<Layout><RecipeList /></Layout>} />
        <Route path="/add-recipe" element={<Layout><AddRecipe /></Layout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
