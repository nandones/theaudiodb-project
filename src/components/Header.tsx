import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';

/**
 * Componente Header/Navbar da aplicação
 * Exibe navegação e informações do usuário logado
 */
const Header: React.FC = () => {
  const { isAuthenticated, usuario } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Função para fazer logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to={isAuthenticated ? "/home" : "/"}
          className="fw-bold text-success"
        >
          <span className="text-danger">SPOT</span>IFSC
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAuthenticated ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/home">Início</Nav.Link>
                <Nav.Link as={Link} to="/playlists">Minhas Playlists</Nav.Link>
                <Nav.Link as={Link} to="/musicas">Explorar Músicas</Nav.Link>
                <Nav.Link as={Link} to="/sobre">Sobre o Projeto</Nav.Link>
              </Nav>
              <Nav>
                <span className="navbar-text me-3">
                  Olá, <strong>{usuario?.email}</strong>
                </span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <Button 
                variant="success" 
                onClick={() => navigate('/login')}
              >
                Entrar
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;