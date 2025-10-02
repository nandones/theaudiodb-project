import type { Musica } from '../types';

/**
 * Dados simulados de músicas populares
 * Usado como fallback quando a API não está disponível
 */
export const musicasPopularesMock: Musica[] = [
  {
    id: 'mock-1',
    nome: 'Bohemian Rhapsody',
    artista: 'Queen',
    genero: 'Rock',
    ano: 1975,
    descricao: 'Uma das músicas mais icônicas do rock de todos os tempos, com uma estrutura única e operística.'
  },
  {
    id: 'mock-2',
    nome: 'Stairway to Heaven',
    artista: 'Led Zeppelin',
    genero: 'Rock',
    ano: 1971,
    descricao: 'Considerada uma das maiores músicas de rock já escritas, com uma progressão épica.'
  },
  {
    id: 'mock-3',
    nome: 'Imagine',
    artista: 'John Lennon',
    genero: 'Pop',
    ano: 1971,
    descricao: 'Uma música atemporal sobre paz e união mundial, com uma mensagem poderosa.'
  },
  {
    id: 'mock-4',
    nome: 'Hotel California',
    artista: 'Eagles',
    genero: 'Rock',
    ano: 1976,
    descricao: 'Um clássico do rock americano com letra misteriosa e solo de guitarra memorável.'
  },
  {
    id: 'mock-5',
    nome: 'Billie Jean',
    artista: 'Michael Jackson',
    genero: 'Pop',
    ano: 1983,
    descricao: 'Um dos maiores hits do Rei do Pop, com uma batida contagiante e dança icônica.'
  },
  {
    id: 'mock-6',
    nome: 'Like a Rolling Stone',
    artista: 'Bob Dylan',
    genero: 'Folk Rock',
    ano: 1965,
    descricao: 'Considerada uma das músicas mais influentes da história do rock.'
  },
  {
    id: 'mock-7',
    nome: 'Purple Haze',
    artista: 'Jimi Hendrix',
    genero: 'Rock',
    ano: 1967,
    descricao: 'Um marco na história da guitarra elétrica e do rock psicodélico.'
  },
  {
    id: 'mock-8',
    nome: 'Hey Jude',
    artista: 'The Beatles',
    genero: 'Pop Rock',
    ano: 1968,
    descricao: 'Uma das músicas mais queridas dos Beatles, com um final épico e coral.'
  },
  {
    id: 'mock-9',
    nome: 'Smells Like Teen Spirit',
    artista: 'Nirvana',
    genero: 'Grunge',
    ano: 1991,
    descricao: 'O hino de uma geração que definiu o movimento grunge dos anos 90.'
  },
  {
    id: 'mock-10',
    nome: 'What\'s Going On',
    artista: 'Marvin Gaye',
    genero: 'Soul',
    ano: 1971,
    descricao: 'Uma obra-prima da música soul com uma mensagem social profunda.'
  }
];
