import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { MusicaState, Musica } from '../types';
import { audioDBService } from '../services/audioDBService';

// Estado inicial conforme tipos
const estadoInicial: MusicaState = {
  musicasPopulares: [],
  resultadosBusca: [],
  musicaAtual: null,
  carregando: false,
  erro: null
};

// Thunk para buscar faixa específica (banda + música)
export const buscarMusicaEspecifica = createAsyncThunk(
  'musicas/buscarMusicaEspecifica',
  async ({ banda, musica }: { banda: string; musica: string }, { rejectWithValue }) => {
    try {
      const musicas = await audioDBService.buscarTrack(banda, musica);
      return musicas;
    } catch (error) {
      console.error('Erro no thunk buscarMusicaEspecifica:', error);
      return rejectWithValue('Erro ao buscar faixa');
    }
  }
);

export const buscarMusicasPopulares = createAsyncThunk(
  'musicas/buscarPopulares',
  async (_, { rejectWithValue }) => {
    try {
      const musicas = await audioDBService.obterMusicasPopulares();
      return musicas;
    } catch (error) {
      console.error('Erro no thunk buscarMusicasPopulares:', error);
      return rejectWithValue('Erro ao buscar músicas populares');
    }
  }
);


/**
 * Slice para gerenciar músicas
 */
const musicasSlice = createSlice({
  name: 'musicas',
  initialState: estadoInicial,
  reducers: {
    // Definir música atual
    definirMusicaAtual: (state, action: PayloadAction<Musica>) => {
      state.musicaAtual = action.payload;
    },

    // Limpar música atual
    limparMusicaAtual: (state) => {
      state.musicaAtual = null;
    },

    // Limpar resultados da busca
    limparResultadosBusca: (state) => {
      state.resultadosBusca = [];
    },

    // Limpar erro
    limparErro: (state) => {
      state.erro = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarMusicasPopulares.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(buscarMusicasPopulares.fulfilled, (state, action: PayloadAction<Musica[]>) => {
        state.carregando = false;
        state.musicasPopulares = action.payload;
      })
      .addCase(buscarMusicasPopulares.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload as string || 'Erro ao buscar músicas populares';
      })
      .addCase(buscarMusicaEspecifica.pending, (state) => {
        state.carregando = true; // reutiliza mesmo flag
        state.erro = null;
        state.resultadosBusca = [];
      })
      .addCase(buscarMusicaEspecifica.fulfilled, (state, action: PayloadAction<Musica[]>) => {
        state.carregando = false;
        state.resultadosBusca = action.payload;
      })
      .addCase(buscarMusicaEspecifica.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload as string || 'Erro ao buscar faixa';
      });
  }
});

export const {
  definirMusicaAtual,
  limparMusicaAtual,
  limparResultadosBusca,
  limparErro
} = musicasSlice.actions;

export default musicasSlice.reducer;