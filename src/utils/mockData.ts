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

/**
 * Dados simulados para busca por artista
 */
export const buscarPorArtistaMock = (nomeArtista: string): Musica[] => {
  const termoLower = nomeArtista.toLowerCase();
  
  const resultados: { [key: string]: Musica[] } = {
    'beatles': [
      {
        id: 'beatles-1',
        nome: 'Hey Jude',
        artista: 'The Beatles',
        genero: 'Pop Rock',
        ano: 1968,
        descricao: 'Uma das músicas mais queridas dos Beatles.'
      },
      {
        id: 'beatles-2',
        nome: 'Let It Be',
        artista: 'The Beatles',
        genero: 'Pop Rock',
        ano: 1970,
        descricao: 'Último single lançado antes da separação da banda.'
      },
      {
        id: 'beatles-3',
        nome: 'Come Together',
        artista: 'The Beatles',
        genero: 'Rock',
        ano: 1969,
        descricao: 'Uma das faixas mais marcantes do álbum Abbey Road.'
      }
    ],
    'queen': [
      {
        id: 'queen-1',
        nome: 'Bohemian Rhapsody',
        artista: 'Queen',
        genero: 'Rock',
        ano: 1975,
        descricao: 'Uma obra-prima épica com estrutura operística.'
      },
      {
        id: 'queen-2',
        nome: 'We Will Rock You',
        artista: 'Queen',
        genero: 'Rock',
        ano: 1977,
        descricao: 'Hino de estádio por excelência.'
      },
      {
        id: 'queen-3',
        nome: 'Another One Bites the Dust',
        artista: 'Queen',
        genero: 'Rock',
        ano: 1980,
        descricao: 'Um dos maiores sucessos comerciais da banda.'
      }
    ],
    'michael jackson': [
      {
        id: 'mj-1',
        nome: 'Billie Jean',
        artista: 'Michael Jackson',
        genero: 'Pop',
        ano: 1983,
        descricao: 'O hit que solidificou MJ como o Rei do Pop.'
      },
      {
        id: 'mj-2',
        nome: 'Beat It',
        artista: 'Michael Jackson',
        genero: 'Pop Rock',
        ano: 1983,
        descricao: 'Fusão perfeita de pop e rock.'
      },
      {
        id: 'mj-3',
        nome: 'Thriller',
        artista: 'Michael Jackson',
        genero: 'Pop',
        ano: 1982,
        descricao: 'A música título do álbum mais vendido de todos os tempos.'
      }
    ],
    'elvis presley': [
      {
        id: 'elvis-1',
        nome: 'Can\'t Help Falling in Love',
        artista: 'Elvis Presley',
        genero: 'Pop',
        ano: 1961,
        descricao: 'Uma das canções românticas mais famosas de todos os tempos.'
      },
      {
        id: 'elvis-2',
        nome: 'Hound Dog',
        artista: 'Elvis Presley',
        genero: 'Rock and Roll',
        ano: 1956,
        descricao: 'Um dos primeiros grandes sucessos do rock and roll.'
      }
    ],
    'madonna': [
      {
        id: 'madonna-1',
        nome: 'Like a Prayer',
        artista: 'Madonna',
        genero: 'Pop',
        ano: 1989,
        descricao: 'Uma das músicas mais icônicas da Rainha do Pop.'
      },
      {
        id: 'madonna-2',
        nome: 'Material Girl',
        artista: 'Madonna',
        genero: 'Pop',
        ano: 1984,
        descricao: 'Definiu a persona de Madonna nos anos 80.'
      }
    ]
  };
  
  // Buscar por correspondência exata ou parcial
  for (const [artista, musicas] of Object.entries(resultados)) {
    if (artista.includes(termoLower) || termoLower.includes(artista)) {
      return musicas;
    }
  }
  
  // Se não encontrar nada específico, retornar algumas aleatórias
  return musicasPopularesMock.slice(0, 3);
};

/**
 * Dados simulados para busca por música
 */
export const buscarPorNomeMock = (nomeMusica: string): Musica[] => {
  const termoLower = nomeMusica.toLowerCase();
  
  return musicasPopularesMock.filter(musica => 
    musica.nome.toLowerCase().includes(termoLower)
  );
};