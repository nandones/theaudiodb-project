import axios from 'axios';
import type { ResponseAudioDB, Musica, TrackAudioDB } from '../types';
import { musicasPopularesMock } from '../utils/mockData';

// URL base da API TheAudioDB
const API_BASE_URL = 'https://www.theaudiodb.com/api/v1/json/123';

// Instância do axios configurada
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
});

// Interceptor para logar cada requisição enviada à TheAudioDB
api.interceptors.request.use((config) => {
  try {
    const method = (config.method || 'get').toUpperCase();
    const base = config.baseURL?.replace(/\/$/, '') || '';
    const url = config.url || '';
    // Montar query string se existir
    let full = base + url;
    if (config.params) {
      const qs = new URLSearchParams(config.params as Record<string, string>).toString();
      if (qs) full += (full.includes('?') ? '&' : '?') + qs;
    }
    console.log(`📡 [AudioDB][REQ] ${method} ${full}`);
  } catch (e) {
    console.log('[AudioDB][REQ] (falha ao montar log)', e);
  }
  return config;
});

/**
 * Serviço para consumir a API TheAudioDB
 */
export const audioDBService = {
  /**
   * Buscar faixa específica informando banda (artista) e música.
   * Endpoint: /searchtrack.php?s={banda}&t={musica}
   */
  buscarTrack: async (banda: string, musica: string): Promise<Musica[]> => {
    const artista = banda.trim();
    const track = musica.trim();
    if (!artista || !track) return [];
    try {
      const url = `/searchtrack.php?s=${encodeURIComponent(artista)}&t=${encodeURIComponent(track)}`;
      const response = await api.get<ResponseAudioDB>(url);
      if (!response.data.track) return [];
      return response.data.track.map((t: TrackAudioDB) => ({
        id: t.idTrack,
        nome: t.strTrack,
        artista: t.strArtist,
        genero: t.strGenre || 'Desconhecido',
        ano: parseInt(t.intYearReleased) || 0,
        capa: t.strTrackThumb,
        descricao: t.strDescriptionEN
      }));
    } catch (erro) {
      console.error('[AudioDB] Erro buscarTrack:', erro);
      return [];
    }
  },

  /**
   * Obter lista de músicas populares reais (Top10 de alguns artistas) com fallback.
   */
  obterMusicasPopulares: async (): Promise<Musica[]> => {
    const artistas = ['Queen','Iron Maiden','Coldplay','U2','Metallica'];
    const agregadas: Musica[] = [];
    for (const artista of artistas) {
      try {
        const url = `/track-top10.php?s=${encodeURIComponent(artista)}`;
        const response = await api.get<ResponseAudioDB>(url);
        if (response.data.track) {
          const tracksConvertidas = response.data.track.slice(0, 2).map((track: TrackAudioDB) => ({
            id: track.idTrack,
            nome: track.strTrack,
            artista: track.strArtist,
            genero: track.strGenre || 'Desconhecido',
            ano: parseInt(track.intYearReleased) || 0,
            capa: track.strTrackThumb,
            descricao: track.strDescriptionEN
          }));
          agregadas.push(...tracksConvertidas);
        }
      } catch (e) {
        console.warn('Falha ao carregar top10 de', artista, e);
      }
    }
    if (agregadas.length === 0) {
      // Fallback se nada foi obtido
      return musicasPopularesMock;
    }
    return agregadas.slice(0, 10);
  },

};