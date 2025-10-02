import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Alert, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { carregarPlaylists, removerMusicaPlaylist, definirPlaylistAtual } from '../store/playlistsSlice';
import { sessionStorageUtils } from '../utils/storage';

/**
 * Página de detalhes de uma playlist específica
 * Permite visualizar e gerenciar músicas da playlist
 */
const DetalhesPlaylist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { usuario } = useAppSelector((state) => state.auth);
  const { playlists, carregando } = useAppSelector((state) => state.playlists);
  const dispatch = useAppDispatch();

  // Estados locais
  const [showModalRemover, setShowModalRemover] = useState(false);
  const [musicaParaRemover, setMusicaParaRemover] = useState<string | null>(null);

  // Buscar a playlist atual
  const playlist = playlists.find(p => p.id === id);

  // Carregar dados ao montar o componente
  useEffect(() => {
    if (usuario && !playlist) {
      dispatch(carregarPlaylists(usuario.id));
    }
  }, [dispatch, usuario, playlist]);

  // Definir playlist atual quando encontrada
  useEffect(() => {
    if (playlist) {
      dispatch(definirPlaylistAtual(playlist));
    }
  }, [dispatch, playlist]);

  // Se playlist não encontrada, redirecionar
  useEffect(() => {
    if (!carregando && !playlist && playlists.length > 0) {
      navigate('/playlists');
    }
  }, [playlist, playlists.length, carregando, navigate]);

  // Função para confirmar remoção de música
  const confirmarRemocaoMusica = (musicaId: string) => {
    setMusicaParaRemover(musicaId);
    setShowModalRemover(true);
  };

  // Função para remover música
  const removerMusica = () => {
    if (playlist && musicaParaRemover) {
      dispatch(removerMusicaPlaylist({
        playlistId: playlist.id,
        musicaId: musicaParaRemover
      }));
      setShowModalRemover(false);
      setMusicaParaRemover(null);
    }
  };

  // Função para fechar modal
  const fecharModal = () => {
    setShowModalRemover(false);
    setMusicaParaRemover(null);
  };

  // Loading state
  if (carregando) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <h4>Carregando playlist...</h4>
        </div>
      </Container>
    );
  }

  // Se playlist não encontrada
  if (!playlist) {
    return (
      <Container className="py-4">
        <Alert variant="warning">
          <Alert.Heading>Playlist não encontrada</Alert.Heading>
          <p>A playlist solicitada não existe ou não pertence a você.</p>
          <Button variant="outline-warning" onClick={() => navigate('/playlists')}>
            Voltar às playlists
          </Button>
        </Alert>
      </Container>
    );
  }

  const musicaQueSeraRemovida = playlist.musicas.find(m => m.id === musicaParaRemover);

  return (
    <Container className="py-4">
      {/* Cabeçalho da playlist */}
      <Row className="mb-4">
        <Col>
          <Card className="playlist-header shadow">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h2 className="text-white mb-2">{playlist.nome}</h2>
                  <p className="text-white-50 mb-2">
                    {playlist.musicas.length} música{playlist.musicas.length !== 1 ? 's' : ''}
                  </p>
                  <small className="text-white-50">
                    Criada em: {new Date(playlist.dataCriacao).toLocaleDateString('pt-BR')}
                  </small>
                </div>
                <div className="text-end">
                  <Button 
                    variant="outline-light" 
                    size="sm" 
                    className="me-2"
                    onClick={() => navigate('/playlists')}
                  >
                    ← Voltar
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="sm"
                    onClick={() => navigate('/musicas')}
                  >
                    + Adicionar Músicas
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Lista de músicas */}
      {playlist.musicas.length === 0 ? (
        <Row>
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <h4 className="text-muted mb-3">Playlist vazia</h4>
                <p className="text-muted mb-4">
                  Esta playlist ainda não tem músicas. Que tal adicionar algumas?
                </p>
                <Button 
                  variant="success" 
                  onClick={() => navigate('/musicas')}
                >
                  Explorar Músicas
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <h4 className="mb-3">Músicas da Playlist</h4>
            {playlist.musicas.map((musica, index) => (
              <Card key={musica.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={1}>
                      <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" 
                           style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>
                        {index + 1}
                      </div>
                    </Col>
                    <Col xs={8} md={9}>
                      <div>
                        <h6 className="mb-1 text-success">{musica.nome}</h6>
                        <p className="mb-1 text-muted">{musica.artista}</p>
                        <div className="d-flex gap-2">
                          <Badge bg="secondary">{musica.genero}</Badge>
                          {musica.ano && <Badge bg="info">{musica.ano}</Badge>}
                        </div>
                        {musica.descricao && (
                          <small className="text-muted mt-2 d-block">
                            {musica.descricao.substring(0, 150)}
                            {musica.descricao.length > 150 && '...'}
                          </small>
                        )}
                      </div>
                    </Col>
                    <Col xs={3} md={2} className="text-end">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => confirmarRemocaoMusica(musica.id)}
                        title="Remover música"
                      >
                        🗑️ Remover
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      )}

      {/* Modal de confirmação de remoção */}
      <Modal show={showModalRemover} onHide={fecharModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {musicaQueSeraRemovida && (
            <>
              <p>Tem certeza que deseja remover esta música da playlist?</p>
              <div className="bg-light p-3 rounded">
                <strong>{musicaQueSeraRemovida.nome}</strong><br />
                <span className="text-muted">{musicaQueSeraRemovida.artista}</span>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={removerMusica}>
            Remover Música
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DetalhesPlaylist;