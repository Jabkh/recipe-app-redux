import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from './slices/authSlice';
import AppRouter from './router';
// import { auth } from './services/firebase'; // Assurez-vous que firebaseConfig est correctement exporté dans ce fichier

function App() {

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    // Récupérer les informations d'utilisateur depuis le localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Stocker l'utilisateur dans le store Redux
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <AppRouter user={user}/>
  );
}

export default App;
