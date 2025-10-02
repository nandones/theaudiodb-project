import type { Playlist, Usuario } from '../types';

// Chaves para armazenamento local
const CHAVES_STORAGE = {
  PLAYLISTS: 'spotifsc_playlists',
  USUARIO_SESSAO: 'spotifsc_usuario_sessao',
  ULTIMA_PLAYLIST: 'spotifsc_ultima_playlist',
  ULTIMO_LOGIN: 'spotifsc_ultimo_login'
};

/**
 * Funções para gerenciar dados no localStorage
 */
export const localStorageUtils = {
  // Salvar playlists no localStorage
  salvarPlaylists: (playlists: Playlist[]): void => {
    try {
      localStorage.setItem(CHAVES_STORAGE.PLAYLISTS, JSON.stringify(playlists));
    } catch (erro) {
      console.error('Erro ao salvar playlists no localStorage:', erro);
    }
  },

  // Carregar playlists do localStorage
  carregarPlaylists: (): Playlist[] => {
    try {
      const playlistsJSON = localStorage.getItem(CHAVES_STORAGE.PLAYLISTS);
      return playlistsJSON ? JSON.parse(playlistsJSON) : [];
    } catch (erro) {
      console.error('Erro ao carregar playlists do localStorage:', erro);
      return [];
    }
  },

  // Limpar playlists do localStorage
  limparPlaylists: (): void => {
    try {
      localStorage.removeItem(CHAVES_STORAGE.PLAYLISTS);
    } catch (erro) {
      console.error('Erro ao limpar playlists do localStorage:', erro);
    }
  }
};

/**
 * Funções para gerenciar dados no sessionStorage
 */
export const sessionStorageUtils = {
  // Salvar dados do usuário na sessão
  salvarUsuarioSessao: (usuario: Usuario): void => {
    try {
      sessionStorage.setItem(CHAVES_STORAGE.USUARIO_SESSAO, JSON.stringify(usuario));
    } catch (erro) {
      console.error('Erro ao salvar usuário na sessão:', erro);
    }
  },

  // Carregar dados do usuário da sessão
  carregarUsuarioSessao: (): Usuario | null => {
    try {
      const usuarioJSON = sessionStorage.getItem(CHAVES_STORAGE.USUARIO_SESSAO);
      return usuarioJSON ? JSON.parse(usuarioJSON) : null;
    } catch (erro) {
      console.error('Erro ao carregar usuário da sessão:', erro);
      return null;
    }
  },

  // Salvar última playlist acessada
  salvarUltimaPlaylist: (playlistId: string): void => {
    try {
      sessionStorage.setItem(CHAVES_STORAGE.ULTIMA_PLAYLIST, playlistId);
    } catch (erro) {
      console.error('Erro ao salvar última playlist:', erro);
    }
  },

  // Carregar última playlist acessada
  carregarUltimaPlaylist: (): string | null => {
    try {
      return sessionStorage.getItem(CHAVES_STORAGE.ULTIMA_PLAYLIST);
    } catch (erro) {
      console.error('Erro ao carregar última playlist:', erro);
      return null;
    }
  },

  // Salvar data do último login
  salvarUltimoLogin: (): void => {
    try {
      const agora = new Date().toISOString();
      sessionStorage.setItem(CHAVES_STORAGE.ULTIMO_LOGIN, agora);
    } catch (erro) {
      console.error('Erro ao salvar último login:', erro);
    }
  },

  // Carregar data do último login
  carregarUltimoLogin: (): string | null => {
    try {
      return sessionStorage.getItem(CHAVES_STORAGE.ULTIMO_LOGIN);
    } catch (erro) {
      console.error('Erro ao carregar último login:', erro);
      return null;
    }
  },

  // Limpar todos os dados da sessão
  limparSessao: (): void => {
    try {
      sessionStorage.removeItem(CHAVES_STORAGE.USUARIO_SESSAO);
      sessionStorage.removeItem(CHAVES_STORAGE.ULTIMA_PLAYLIST);
      sessionStorage.removeItem(CHAVES_STORAGE.ULTIMO_LOGIN);
    } catch (erro) {
      console.error('Erro ao limpar dados da sessão:', erro);
    }
  }
};

/**
 * Função para validar email
 */
export const validarEmail = (email: string): boolean => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
};

/**
 * Função para validar senha
 */
export const validarSenha = (senha: string): boolean => {
  return senha.length >= 6;
};

/**
 * Função para gerar ID único
 */
export const gerarId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};