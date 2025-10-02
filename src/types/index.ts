// Tipos de dados utilizados em toda a aplicação

export interface Usuario {
  id: string;
  email: string;
  dataLogin?: string;
}

export interface Musica {
  id: string;
  nome: string;
  artista: string;
  genero: string;
  ano: number;
  capa?: string;
  descricao?: string;
}

export interface Playlist {
  id: string;
  nome: string;
  usuarioId: string;
  musicas: Musica[];
  dataCriacao: string;
  dataModificacao: string;
}

// Tipos para a API TheAudioDB
export interface TrackAudioDB {
  idTrack: string;
  strTrack: string;
  strArtist: string;
  strGenre: string;
  intYearReleased: string;
  strDescriptionEN?: string;
  strTrackThumb?: string;
}

export interface ResponseAudioDB {
  track: TrackAudioDB[] | null;
}

// Estados para Redux
export interface AuthState {
  isAuthenticated: boolean;
  usuario: Usuario | null;
  carregando: boolean;
  erro: string | null;
}

export interface PlaylistState {
  playlists: Playlist[];
  playlistAtual: Playlist | null;
  carregando: boolean;
  erro: string | null;
}

export interface MusicaState {
  musicasPopulares: Musica[];
  resultadosBusca: Musica[];
  musicaAtual: Musica | null;
  carregando: boolean;
  erro: string | null;
}

export interface RootState {
  auth: AuthState;
  playlists: PlaylistState;
  musicas: MusicaState;
}