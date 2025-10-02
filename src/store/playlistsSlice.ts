import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { PlaylistState, Playlist } from '../types';
import { localStorageUtils, sessionStorageUtils } from '../utils/storage';

// Estado inicial das playlists
const estadoInicial: PlaylistState = {
  playlists: [],
  playlistAtual: null,
  carregando: false,
  erro: null
};

/**
 * Thunk para carregar playlists do localStorage
 */
export const carregarPlaylists = createAsyncThunk(
  'playlists/carregar',
  async (usuarioId: string) => {
    const todasPlaylists = localStorageUtils.carregarPlaylists();
    console.log('[Playlists][Diagnóstico] Total bruto no localStorage:', todasPlaylists.length);
    const filtradas = todasPlaylists.filter(playlist => playlist.usuarioId === usuarioId);
    console.log('[Playlists][Diagnóstico] Para usuarioId', usuarioId, 'retornando', filtradas.length);
    return filtradas;
  }
);

/**
 * Thunk para salvar playlist no localStorage
 */
export const salvarPlaylist = createAsyncThunk(
  'playlists/salvar',
  async (playlist: Playlist) => {
    const todasPlaylists = localStorageUtils.carregarPlaylists();
    const playlistExistente = todasPlaylists.findIndex(p => p.id === playlist.id);
    
    if (playlistExistente >= 0) {
      // Atualizar playlist existente
      todasPlaylists[playlistExistente] = {
        ...playlist,
        dataModificacao: new Date().toISOString()
      };
    } else {
      // Adicionar nova playlist
      todasPlaylists.push({
        ...playlist,
        dataCriacao: new Date().toISOString(),
        dataModificacao: new Date().toISOString()
      });
    }
    
    localStorageUtils.salvarPlaylists(todasPlaylists);
    return playlist;
  }
);

/**
 * Thunk para excluir playlist
 */
export const excluirPlaylist = createAsyncThunk(
  'playlists/excluir',
  async (playlistId: string) => {
    const todasPlaylists = localStorageUtils.carregarPlaylists();
    const playlistsFiltradas = todasPlaylists.filter(p => p.id !== playlistId);
    localStorageUtils.salvarPlaylists(playlistsFiltradas);
    return playlistId;
  }
);

/**
 * Slice para gerenciar playlists
 */
const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: estadoInicial,
  reducers: {
    // Definir playlist atual
    definirPlaylistAtual: (state, action: PayloadAction<Playlist>) => {
      state.playlistAtual = action.payload;
      // Salvar ID da última playlist acessada
      sessionStorageUtils.salvarUltimaPlaylist(action.payload.id);
    },

    // Limpar playlist atual
    limparPlaylistAtual: (state) => {
      state.playlistAtual = null;
    },

    // Adicionar música à playlist atual
    adicionarMusicaPlaylist: (state, action: PayloadAction<{ playlistId: string; musica: any }>) => {
      const { playlistId, musica } = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      
      if (playlist) {
        // Verificar se a música já está na playlist
        const musicaExiste = playlist.musicas.some(m => m.id === musica.id);
        if (!musicaExiste) {
          playlist.musicas.push(musica);
          playlist.dataModificacao = new Date().toISOString();
          
          // Atualizar no localStorage
          const todasPlaylists = localStorageUtils.carregarPlaylists();
          const index = todasPlaylists.findIndex(p => p.id === playlistId);
          if (index >= 0) {
            todasPlaylists[index] = playlist;
            localStorageUtils.salvarPlaylists(todasPlaylists);
          }
        }
      }
    },

    // Remover música da playlist
    removerMusicaPlaylist: (state, action: PayloadAction<{ playlistId: string; musicaId: string }>) => {
      const { playlistId, musicaId } = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      
      if (playlist) {
        playlist.musicas = playlist.musicas.filter(m => m.id !== musicaId);
        playlist.dataModificacao = new Date().toISOString();
        
        // Atualizar no localStorage
        const todasPlaylists = localStorageUtils.carregarPlaylists();
        const index = todasPlaylists.findIndex(p => p.id === playlistId);
        if (index >= 0) {
          todasPlaylists[index] = playlist;
          localStorageUtils.salvarPlaylists(todasPlaylists);
        }
      }
    },

    // Limpar erro
    limparErro: (state) => {
      state.erro = null;
    }
  },
  extraReducers: (builder) => {
    // Carregar playlists
    builder
      .addCase(carregarPlaylists.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(carregarPlaylists.fulfilled, (state, action) => {
        state.carregando = false;
        state.playlists = action.payload;
      })
      .addCase(carregarPlaylists.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.error.message || 'Erro ao carregar playlists';
      });

    // Salvar playlist
    builder
      .addCase(salvarPlaylist.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(salvarPlaylist.fulfilled, (state, action) => {
        state.carregando = false;
        const playlistIndex = state.playlists.findIndex(p => p.id === action.payload.id);
        if (playlistIndex >= 0) {
          state.playlists[playlistIndex] = action.payload;
        } else {
          state.playlists.push(action.payload);
        }
      })
      .addCase(salvarPlaylist.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.error.message || 'Erro ao salvar playlist';
      });

    // Excluir playlist
    builder
      .addCase(excluirPlaylist.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(excluirPlaylist.fulfilled, (state, action) => {
        state.carregando = false;
        state.playlists = state.playlists.filter(p => p.id !== action.payload);
        if (state.playlistAtual?.id === action.payload) {
          state.playlistAtual = null;
        }
      })
      .addCase(excluirPlaylist.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.error.message || 'Erro ao excluir playlist';
      });
  }
});

export const {
  definirPlaylistAtual,
  limparPlaylistAtual,
  adicionarMusicaPlaylist,
  removerMusicaPlaylist,
  limparErro
} = playlistsSlice.actions;

export default playlistsSlice.reducer;