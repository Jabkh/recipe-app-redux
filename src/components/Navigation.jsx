import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import RecipeList from './RecipeList';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Navigation = () => {

  const user = useSelector(state => state.auth.user);

  return (
    <Container fluid>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Ma Super App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/add-recipe" className="nav-link">Ajouter une recette</Link>
            <Link to="/edit-recipe/:id" className="nav-link">Changer une recette</Link>
          </Nav>
          {/* Afficher le bouton de déconnexion uniquement si l'utilisateur est connecté */}
          {user && <LogoutButton />}
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-5">
        <RecipeList/>
      </Container>
    </Container>
  );
}

export default Navigation;
