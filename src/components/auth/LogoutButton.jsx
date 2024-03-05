import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from './authSlice'; // Importez l'action removeUser du slice d'authentification

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatchez l'action removeUser lorsque l'utilisateur clique sur le bouton de déconnexion
    dispatch(removeUser());
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
};

export default LogoutButton;
