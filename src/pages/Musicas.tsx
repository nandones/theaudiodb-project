import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, InputGroup, Modal } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { buscarMusicasPopulares, buscarMusicaEspecifica, limparResultadosBusca } from '../store/musicasSlice';
import { carregarPlaylists } from '../store/playlistsSlice';
import { adicionarMusicaPlaylist } from '../store/playlistsSlice';
import MusicaCard from '../components/MusicaCard';
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

  // Memo da lista de populares para não re-renderizar a cada digitação
  const popularCards = useMemo(() => (
    musicasPopulares.map(m => (
      <Col key={m.id} md={6} lg={4} className="mb-3">
        <MusicaCard
          musica={m}
          showAddButton
          onAdd={abrirModalPlaylist}
          disableAdd={playlists.length === 0}
          animate={false} // não animar populares para evitar "piscar"
        />
      </Col>
    ))
  ), [musicasPopulares, playlists.length]);

  const resultadoCards = useMemo(() => (
    resultadosBusca.map(m => (
      <Col key={m.id} md={6} lg={4} className="mb-3">
        <MusicaCard
          musica={m}
          showAddButton
          onAdd={abrirModalPlaylist}
          disableAdd={playlists.length === 0}
          animate
        />
      </Col>
    ))
  ), [resultadosBusca, playlists.length]);

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
            {resultadoCards}
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
          {popularCards}
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