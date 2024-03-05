// Fonction pour enregistrer l'utilisateur dans le localStorage
export const saveUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  // Fonction pour récupérer l'utilisateur depuis le localStorage
  export const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  };
  
  // Fonction pour supprimer l'utilisateur du localStorage
  export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };
  