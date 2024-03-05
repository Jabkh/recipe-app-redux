import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthMode, setUser } from '../../slices/authSlice';
import { SIGN_IN_URL, SIGN_UP_URL } from '../../firebaseConfig';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const AuthForm = ({ isSignUp }) => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = isSignUp ? SIGN_UP_URL : SIGN_IN_URL;

    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(URL, credentials);
      localStorage.setItem('token', response.data.idToken);
      console.log(response.data.idToken);
      dispatch(setUser(response.data));
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{isSignUp ? "Inscription" : "Connexion"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Mot de passe:</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef} />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isSignUp ? "S'inscrire" : "Se connecter"}
        </Button>
      </Form>
      <p className="mt-3">
        {isSignUp ? "Vous avez déjà un compte ?" : "Vous n'avez pas de compte ?"}
        <Button variant="link" onClick={() => dispatch(setAuthMode(isSignUp ? "Se connecter" : "S'inscrire"))}>
          {isSignUp ? "Se connecter" : "S'inscrire"}
        </Button>
      </p>
    </div>
  );
};

export default AuthForm;
