import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { carregarPlaylists, salvarPlaylist, excluirPlaylist } from '../store/playlistsSlice';
import { gerarId } from '../utils/storage';
import type { Playlist } from '../types';

/**
 * Página para gerenciar playlists do usuário
 * Permite criar, editar, visualizar e excluir playlists
 */
const Playlists: React.FC = () => {
  const { usuario } = useAppSelector((state) => state.auth);
  const { playlists, carregando, erro } = useAppSelector((state) => state.playlists);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Estados para modal de criação/edição
  const [showModal, setShowModal] = useState(false);
  const [playlistEditando, setPlaylistEditando] = useState<Playlist | null>(null);
  const [nomePlaylist, setNomePlaylist] = useState('');
  const [erroValidacao, setErroValidacao] = useState('');

  // Carregar playlists ao montar e tratar criação automática
  useEffect(() => {
    if (usuario) {
      dispatch(carregarPlaylists(usuario.id));
    }
  }, [dispatch, usuario]);

  // Abrir modal automaticamente se vier de Home com state.autoNovaPlaylist
  useEffect(() => {
    const state = location.state as { autoNovaPlaylist?: boolean } | null;
    if (state?.autoNovaPlaylist) {
      abrirModalNovaPlaylist();
      // Limpar o state da navegação para evitar reabertura ao voltar
      navigate(location.pathname, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  // Função para abrir modal de nova playlist
  const abrirModalNovaPlaylist = () => {
    setPlaylistEditando(null);
    setNomePlaylist('');
    setErroValidacao('');
    setShowModal(true);
  };

  // Função para abrir modal de edição
  const abrirModalEdicao = (playlist: Playlist) => {
    setPlaylistEditando(playlist);
    setNomePlaylist(playlist.nome);
    setErroValidacao('');
    setShowModal(true);
  };

  // Função para fechar modal
  const fecharModal = () => {
    setShowModal(false);
    setPlaylistEditando(null);
    setNomePlaylist('');
    setErroValidacao('');
  };

  // Função para validar nome da playlist
  const validarNome = (nome: string): boolean => {
    if (!nome.trim()) {
      setErroValidacao('Nome da playlist é obrigatório');
      return false;
    }
    if (nome.trim().length < 2) {
      setErroValidacao('Nome deve ter pelo menos 2 caracteres');
      return false;
    }
    
    // Verificar se já existe uma playlist com este nome
    const nomeExiste = playlists.some(p => 
      p.nome.toLowerCase() === nome.trim().toLowerCase() && 
      p.id !== playlistEditando?.id
    );
    
    if (nomeExiste) {
      setErroValidacao('Já existe uma playlist com este nome');
      return false;
    }
    
    setErroValidacao('');
    return true;
  };

  // Função para salvar playlist
  const handleSalvarPlaylist = async () => {
    if (!usuario || !validarNome(nomePlaylist)) {
      return;
    }

    const playlistData: Playlist = {
      id: playlistEditando?.id || gerarId(),
      nome: nomePlaylist.trim(),
      usuarioId: usuario.id,
      musicas: playlistEditando?.musicas || [],
      dataCriacao: playlistEditando?.dataCriacao || new Date().toISOString(),
      dataModificacao: new Date().toISOString()
    };

    try {
      await dispatch(salvarPlaylist(playlistData));
      fecharModal();
    } catch (error) {
      console.error('Erro ao salvar playlist:', error);
    }
  };

  // Função para excluir playlist
  const handleExcluirPlaylist = async (playlistId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta playlist?')) {
      try {
        await dispatch(excluirPlaylist(playlistId));
      } catch (error) {
        console.error('Erro ao excluir playlist:', error);
      }
    }
  };

  return (
    <Container className="py-4">
      {/* Cabeçalho */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-success mb-0">Minhas Playlists</h2>
            <Button variant="success" onClick={abrirModalNovaPlaylist}>
              + Nova Playlist
            </Button>
          </div>
        </Col>
      </Row>

      {/* Exibir erro se houver */}
      {erro && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">
              <Alert.Heading className="h6">Erro</Alert.Heading>
              <p className="mb-0">{erro}</p>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Loading */}
      {carregando ? (
        <Row>
          <Col className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2">Carregando playlists...</p>
          </Col>
        </Row>
      ) : playlists.length === 0 ? (
        /* Nenhuma playlist */
        <Row>
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <h4 className="text-muted mb-3">Nenhuma playlist criada</h4>
                <p className="text-muted mb-4">
                  Crie sua primeira playlist e comece a organizar suas músicas favoritas!
                </p>
                <Button variant="success" onClick={abrirModalNovaPlaylist}>
                  Criar Primeira Playlist
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        /* Lista de playlists */
        <Row>
          {playlists.map((playlist) => (
            <Col key={playlist.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-success mb-2">
                    {playlist.nome}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {playlist.musicas.length} música{playlist.musicas.length !== 1 ? 's' : ''}
                  </Card.Text>
                  <Card.Text>
                    <small className="text-muted">
                      Criada em: {new Date(playlist.dataCriacao).toLocaleDateString('pt-BR')}
                    </small>
                  </Card.Text>
                  <Card.Text>
                    <small className="text-muted">
                      Modificada em: {new Date(playlist.dataModificacao).toLocaleDateString('pt-BR')}
                    </small>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-transparent">
                  <div className="d-flex gap-2">
                    <Link to={`/playlists/${playlist.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="outline-success" size="sm" className="flex-grow-1">
                        Abrir
                      </Button>
                    </Link>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => abrirModalEdicao(playlist)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleExcluirPlaylist(playlist.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal para criar/editar playlist */}
      <Modal show={showModal} onHide={fecharModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {playlistEditando ? 'Editar Playlist' : 'Nova Playlist'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome da Playlist</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome da playlist"
                value={nomePlaylist}
                onChange={(e) => setNomePlaylist(e.target.value)}
                isInvalid={!!erroValidacao}
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                {erroValidacao}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                {nomePlaylist.length}/100 caracteres
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button 
            variant="success" 
            onClick={handleSalvarPlaylist}
            disabled={!nomePlaylist.trim() || !!erroValidacao}
          >
            {playlistEditando ? 'Salvar Alterações' : 'Criar Playlist'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Playlists;