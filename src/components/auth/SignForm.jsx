import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthMode, setUser } from '../../slices/authSlice';
import { SIGN_IN_URL, SIGN_UP_URL } from '../../firebaseConfig';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const SignForm = () => {
  const authMode = useSelector(state => state.auth.authMode);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loggedIn, setLoggedIn] = React.useState(false); // État pour indiquer si l'utilisateur est connecté

  const handleSubmit = (e) => {
    e.preventDefault();

    const URL = authMode === "Se connecter" ? SIGN_IN_URL : SIGN_UP_URL;

    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    };

    axios.post(URL, credentials).then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data.idToken);
      dispatch(setUser(response.data));
      setLoggedIn(true); // Mettre à jour l'état pour indiquer que l'utilisateur est connecté
    });
  };

  return (
    <>
      {loggedIn && <Navigate to="/recipes" replace />} {/* Redirection vers la route /recipes si l'utilisateur est connecté */}
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h3>{authMode}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} />
              </Form.Group>
              <Button variant="primary" type="submit">
                {authMode}
              </Button>
            </Form>
            <Button onClick={() => dispatch(setAuthMode(authMode === "Se connecter" ? "S'inscrire" : "Se connecter"))}>
              {authMode === "Se connecter" ? "S'inscrire" : "Se connecter"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignForm;
