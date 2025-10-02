import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { buscarMusicasPopulares } from '../store/musicasSlice';
import { carregarPlaylists } from '../store/playlistsSlice';
import { sessionStorageUtils } from '../utils/storage';

/**
 * Página inicial do usuário logado
 * Exibe músicas populares e acesso rápido às funcionalidades
 */
const Home: React.FC = () => {
  const { usuario } = useAppSelector((state) => state.auth);
  const { musicasPopulares, carregando: carregandoMusicas, erro: erroMusicas } = useAppSelector((state) => state.musicas);
  const { playlists, carregando: carregandoPlaylists } = useAppSelector((state) => state.playlists);
  const dispatch = useAppDispatch();

  // Carregar dados ao montar o componente
  useEffect(() => {
    if (usuario) {
      // Buscar músicas populares
      dispatch(buscarMusicasPopulares());
      
      // Carregar playlists do usuário
      dispatch(carregarPlaylists(usuario.id));
    }
  }, [dispatch, usuario]);

  // Obter informações da sessão
  const ultimoLogin = sessionStorageUtils.carregarUltimoLogin();
  const ultimaPlaylistId = sessionStorageUtils.carregarUltimaPlaylist();
  const ultimaPlaylist = playlists.find(p => p.id === ultimaPlaylistId);

  return (
    <Container className="py-4">
      {/* Boas-vindas */}
      <Row className="mb-4">
        <Col>
          <Card className="bg-success text-white">
            <Card.Body>
                <h2 className="mb-2">
                Bem-vindo ao <span className="text-danger">SPOT</span>IFSC!
                </h2>
              <p className="mb-0">Olá, <strong>{usuario?.email}</strong></p>
              {ultimoLogin && (
                <small>
                  Último acesso: {new Date(ultimoLogin).toLocaleString('pt-BR')}
                </small>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Última playlist acessada */}
      {ultimaPlaylist && (
        <Row className="mb-4">
          <Col>
            <Alert variant="info">
              <Alert.Heading className="h6">Continue de onde parou</Alert.Heading>
              <p className="mb-2">
                Última playlist: <strong>{ultimaPlaylist.nome}</strong>
              </p>
              <Link to={`/playlists/${ultimaPlaylist.id}`} style={{ textDecoration: 'none' }}>
                <Button 
                  variant="outline-info" 
                  size="sm"
                >
                  Abrir playlist
                </Button>
              </Link>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Ações rápidas */}
      <Row className="mb-4">
        <Col>
          <h4 className="mb-3">Ações Rápidas</h4>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="h-100 border-success">
            <Card.Body className="text-center">
              <Card.Title className="text-success">Minhas Playlists</Card.Title>
              <Card.Text>
                Você tem <strong>{playlists.length}</strong> playlist{playlists.length !== 1 ? 's' : ''}
              </Card.Text>
              <Link to="/playlists" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="success"
                >
                  {carregandoPlaylists ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    'Gerenciar Playlists'
                  )}
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="h-100 border-primary">
            <Card.Body className="text-center">
              <Card.Title className="text-primary">Explorar Músicas</Card.Title>
              <Card.Text>
                Descubra novas músicas e adicione às suas playlists
              </Card.Text>
              <Link to="/musicas" style={{ textDecoration: 'none' }}>
                <Button variant="primary">Explorar</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="h-100 border-warning">
            <Card.Body className="text-center">
              <Card.Title className="text-warning">Nova Playlist</Card.Title>
              <Card.Text>
                Crie uma nova playlist e adicione suas músicas favoritas
              </Card.Text>
              {/* Passar estado para página de playlists abrir modal automaticamente */}
              <Link
                to="/playlists"
                state={{ autoNovaPlaylist: true }}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="warning">Criar Playlist</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Músicas populares */}
      <Row>
        <Col>
          <h4 className="mb-3">Top 10 Músicas Populares</h4>
          
          {carregandoMusicas ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="success" />
              <p className="mt-2">Carregando músicas populares...</p>
            </div>
          ) : erroMusicas ? (
            <Alert variant="danger">
              <Alert.Heading className="h6">Erro ao carregar músicas</Alert.Heading>
              <p>{erroMusicas}</p>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => dispatch(buscarMusicasPopulares())}
              >
                Tentar novamente
              </Button>
            </Alert>
          ) : musicasPopulares.length > 0 ? (
            <Row>
              {musicasPopulares.map((musica, index) => (
                <Col key={musica.id} md={6} lg={4} className="mb-3">
                  <Card className="h-100">
                    <Card.Body>
                      <div className="d-flex align-items-start">
                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                             style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>
                          {index + 1}
                        </div>
                        <div className="flex-grow-1">
                          <Card.Title className="h6 mb-1">{musica.nome}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{musica.artista}</Card.Subtitle>
                          <small className="text-muted">
                            {musica.genero} • {musica.ano}
                          </small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="info">
              <p className="mb-0">Nenhuma música popular encontrada no momento.</p>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;