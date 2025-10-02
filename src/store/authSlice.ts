import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, Usuario } from '../types';
import { sessionStorageUtils } from '../utils/storage';

// Gera um ID estável a partir do email (evita perder playlists por gerar novo ID a cada login)
const gerarIdEstaticoPorEmail = (email: string) => {
  const base = email.trim().toLowerCase();
  // Hash simples (não criptográfico) só para estabilidade local
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
  }
  return `usr_${hash.toString(36)}`;
};

// Estado inicial da autenticação
const estadoInicial: AuthState = {
  isAuthenticated: false,
  usuario: null,
  carregando: false,
  erro: null
};

/**
 * Slice para gerenciar autenticação
 * Controla login, logout e estado do usuário
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: estadoInicial,
  reducers: {
    // Iniciar processo de login
    iniciarLogin: (state) => {
      state.carregando = true;
      state.erro = null;
    },

    // Login bem-sucedido
    loginSucesso: (state, action: PayloadAction<Usuario>) => {
      state.isAuthenticated = true;
      // Substituir ID aleatório por estável (retrocompatível com futuras sessões)
      const email = action.payload.email;
      const idEstavel = gerarIdEstaticoPorEmail(email);
      state.usuario = { ...action.payload, id: idEstavel };
      state.carregando = false;
      state.erro = null;
      
      // Salvar dados na sessão
      sessionStorageUtils.salvarUsuarioSessao({ ...action.payload, id: idEstavel });
      sessionStorageUtils.salvarUltimoLogin();
    },

    // Falha no login
    loginFalha: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.usuario = null;
      state.carregando = false;
      state.erro = action.payload;
    },

    // Logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.usuario = null;
      state.carregando = false;
      state.erro = null;
      
      // Limpar dados da sessão
      sessionStorageUtils.limparSessao();
    },

    // Restaurar sessão (ao recarregar a página)
    restaurarSessao: (state) => {
      const usuarioSessao = sessionStorageUtils.carregarUsuarioSessao();
      if (usuarioSessao) {
        state.isAuthenticated = true;
        state.usuario = usuarioSessao;
      }
    },

    // Limpar erro
    limparErro: (state) => {
      state.erro = null;
    }
  }
});

export const {
  iniciarLogin,
  loginSucesso,
  loginFalha,
  logout,
  restaurarSessao,
  limparErro
} = authSlice.actions;

export default authSlice.reducer;