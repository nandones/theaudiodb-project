import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, InputGroup, Modal } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { buscarMusicasPopulares, buscarMusicaEspecifica, limparResultadosBusca } from '../store/musicasSlice';
import { carregarPlaylists } from '../store/playlistsSlice';
import { adicionarMusicaPlaylist } from '../store/playlistsSlice';
import type { Musica } from '../types';

/**
 * Página para explorar e buscar músicas
 * Permite buscar músicas e adicionar às playlists
 */
const Musicas: React.FC = () => {
  const { usuario } = useAppSelector((state) => state.auth);
  const { musicasPopulares, resultadosBusca, carregando, erro } = useAppSelector((state) => state.musicas);
  const { playlists } = useAppSelector((state) => state.playlists);
  const dispatch = useAppDispatch();

  // Estados locais
  const [banda, setBanda] = useState('');
  const [musica, setMusica] = useState('');
  const [musicaSelecionada, setMusicaSelecionada] = useState<Musica | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [showModalPlaylist, setShowModalPlaylist] = useState(false);

  // Carregar dados ao montar o componente
  useEffect(() => {
    if (usuario) {
      dispatch(buscarMusicasPopulares());
      dispatch(carregarPlaylists(usuario.id));
    }
  }, [dispatch, usuario]);

  // Função para realizar busca
  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!banda.trim() || !musica.trim()) return;
    setSearchAttempted(true);
    await dispatch(buscarMusicaEspecifica({ banda: banda.trim(), musica: musica.trim() }));
  };

  // Função para limpar busca
  const handleLimparBusca = () => {
    setBanda('');
    setMusica('');
    dispatch(limparResultadosBusca());
    setSearchAttempted(false);
  };

  // Função para abrir modal de adição à playlist
  const abrirModalPlaylist = (musica: Musica) => {
    setMusicaSelecionada(musica);
    setShowModalPlaylist(true);
  };

  // Função para fechar modal
  const fecharModalPlaylist = () => {
    setMusicaSelecionada(null);
    setShowModalPlaylist(false);
  };

  // Função para adicionar música à playlist
  const adicionarMusicaAPlaylist = (playlistId: string) => {
    if (musicaSelecionada) {
      dispatch(adicionarMusicaPlaylist({
        playlistId,
        musica: musicaSelecionada
      }));
      fecharModalPlaylist();
    }
  };

  // Componente para exibir uma música
  const MusicaCard: React.FC<{ musica: Musica; showAddButton?: boolean }> = ({ 
    musica, 
    showAddButton = true 
  }) => (
    <Card className="musica-card h-100 fade-in">
      <Card.Body>
        <Card.Title className="h6 text-success">{musica.nome}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{musica.artista}</Card.Subtitle>
        <Card.Text>
          <small className="text-muted">
            <strong>Gênero:</strong> {musica.genero}<br />
            <strong>Ano:</strong> {musica.ano || 'N/A'}
          </small>
        </Card.Text>
        {musica.descricao && (
          <Card.Text>
            <small className="text-muted">
              {musica.descricao.substring(0, 100)}
              {musica.descricao.length > 100 && '...'}
            </small>
          </Card.Text>
        )}
      </Card.Body>
      {showAddButton && (
        <Card.Footer className="bg-transparent">
          <Button 
            variant="success" 
            size="sm" 
            className="w-100"
            onClick={() => abrirModalPlaylist(musica)}
            disabled={playlists.length === 0}
          >
            {playlists.length === 0 ? 'Criar playlist primeiro' : 'Adicionar à playlist'}
          </Button>
        </Card.Footer>
      )}
    </Card>
  );

  return (
    <Container className="py-4">
      {/* Cabeçalho e busca */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-success mb-3">Explorar Músicas</h2>
          
          {/* Formulário de busca */}
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleBuscar}>
                <Row className="g-2">
                  <Col md={4}>
                    <Form.Control
                      placeholder="Banda / Artista"
                      value={banda}
                      onChange={(e) => setBanda(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      placeholder="Nome da música"
                      value={musica}
                      onChange={(e) => setMusica(e.target.value)}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="success"
                      type="submit"
                      className="w-100"
                      disabled={carregando || !banda.trim() || !musica.trim()}
                    >
                      {carregando ? <Spinner animation="border" size="sm" /> : 'Buscar'}
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-secondary"
                      className="w-100"
                      onClick={handleLimparBusca}
                      disabled={(!banda && !musica) && resultadosBusca.length === 0}
                    >
                      Limpar
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <small className="text-muted">A busca agora exige os dois campos: banda e música exata.</small>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mensagem se não tiver playlists */}
      {playlists.length === 0 && (
        <Row className="mb-3">
          <Col>
            <Alert variant="warning">
              <Alert.Heading className="h6">Nenhuma playlist encontrada</Alert.Heading>
              <p className="mb-2">
                Você precisa criar pelo menos uma playlist para adicionar músicas.
              </p>
              <Button variant="outline-warning" size="sm" href="/playlists">
                Criar playlist
              </Button>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Exibir erro se houver */}
      {erro && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">
              <Alert.Heading className="h6">Erro na busca</Alert.Heading>
              <p className="mb-0">{erro}</p>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Resultados da busca */}
      {resultadosBusca.length > 0 && (
        <>
          <Row className="mb-3">
            <Col>
              <h4 className="text-primary">
                Resultados da busca ({resultadosBusca.length} encontradas)
              </h4>
            </Col>
          </Row>
          <Row className="mb-5">
            {resultadosBusca.map((musica) => (
              <Col key={musica.id} md={6} lg={4} className="mb-3">
                <MusicaCard musica={musica} />
              </Col>
            ))}
          </Row>
        </>
      )}
      {searchAttempted && !carregando && resultadosBusca.length === 0 && (
        <Row className="mb-4">
          <Col>
            <Alert variant="warning" className="mb-0">
              Nenhuma faixa encontrada para a combinação informada. Verifique a grafia exata da banda e da música.
            </Alert>
          </Col>
        </Row>
      )}

      {/* Músicas populares */}
      <Row className="mb-3">
        <Col>
          <h4 className="text-success">
            {resultadosBusca.length > 0 ? 'Também populares' : 'Top 10 Músicas Populares'}
          </h4>
        </Col>
      </Row>

      {carregando && resultadosBusca.length === 0 ? (
        <Row>
          <Col className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2">Carregando músicas...</p>
          </Col>
        </Row>
      ) : musicasPopulares.length > 0 ? (
        <Row>
          {musicasPopulares.map((musica) => (
            <Col key={musica.id} md={6} lg={4} className="mb-3">
              <MusicaCard musica={musica} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <Alert variant="info">
              <p className="mb-0">Nenhuma música popular disponível no momento.</p>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Modal para escolher playlist */}
      <Modal show={showModalPlaylist} onHide={fecharModalPlaylist} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar à Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {musicaSelecionada && (
            <>
              <div className="mb-3">
                <h6>Música selecionada:</h6>
                <p className="text-muted">
                  <strong>{musicaSelecionada.nome}</strong> - {musicaSelecionada.artista}
                </p>
              </div>
              
              <h6>Escolha uma playlist:</h6>
              <div className="d-grid gap-2">
                {playlists.map((playlist) => (
                  <Button
                    key={playlist.id}
                    variant="outline-success"
                    onClick={() => adicionarMusicaAPlaylist(playlist.id)}
                  >
                    {playlist.nome} ({playlist.musicas.length} músicas)
                  </Button>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModalPlaylist}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Musicas;