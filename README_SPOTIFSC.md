# SPOTIFSC - Sistema de Gerenciamento de Playlists

🎵 Uma aplicação web desenvolvida em React para gerenciar playlists de músicas, integrando com a API TheAudioDB.

## 📋 Sobre o Projeto

O SPOTIFSC é uma aplicação web que permite aos usuários criar, gerenciar e consultar playlists de músicas. Foi desenvolvido como parte da Avaliação I, demonstrando o uso de múltiplas tecnologias do ecossistema React moderno.

### 🎯 Funcionalidades Principais

- ✅ **Autenticação de usuários** com email e senha
- ✅ **Rotas protegidas** para acesso às funcionalidades
- ✅ **CRUD completo de playlists** (Criar, Ler, Atualizar, Deletar)
- ✅ **Busca de músicas** por gênero, artista, ano ou nome
- ✅ **Top 10 músicas populares**
- ✅ **Integração com API externa** (TheAudioDB)
- ✅ **Gerenciamento de estado** com Redux Toolkit
- ✅ **Persistência local** com LocalStorage
- ✅ **Armazenamento temporário** com SessionStorage

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca principal para interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e desenvolvimento
- **Redux Toolkit** - Gerenciamento de estado global
- **React Router** - Roteamento da aplicação
- **Bootstrap 5** - Framework CSS
- **Axios** - Cliente HTTP para APIs
- **Yarn 4** - Gerenciador de pacotes

## 🎨 Design e Tema

- **Cores principais**: Branco, Verde (#28a745) e Vermelho (#dc3545)
- **Nome**: SPOTIFSC (com destaque em vermelho para "SPOT")
- **Interface responsiva** com Bootstrap
- **Experiência do usuário otimizada**

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- Yarn 4+ configurado

### Instalação

1. Configure o Yarn (se necessário):
```bash
yarn set version 4.9.2
```

2. Instale as dependências:
```bash
yarn install
```

3. Execute em modo de desenvolvimento:
```bash
yarn dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

## 🔐 Como Usar

### Login
- **Email**: `usuario@spotifsc.com`
- **Senha**: `123456`

### Funcionalidades Disponíveis

1. **Dashboard**: Visualize músicas populares e acesso rápido às funcionalidades
2. **Playlists**: Crie, edite e gerencie suas playlists
3. **Explorar Músicas**: Busque músicas da API TheAudioDB e adicione às playlists
4. **Navegação**: Todos os dados são persistidos localmente

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Navegação principal
│   └── RotaPrivada.tsx # Proteção de rotas
├── pages/              # Páginas da aplicação
│   ├── Login.tsx       # Página de autenticação
│   ├── Home.tsx        # Dashboard principal
│   ├── Playlists.tsx   # Gerenciamento de playlists
│   └── Musicas.tsx     # Exploração de músicas
├── store/              # Estado global Redux
│   ├── index.ts        # Configuração do store
│   ├── hooks.ts        # Hooks tipados do Redux
│   ├── authSlice.ts    # Estado de autenticação
│   ├── playlistsSlice.ts # Estado das playlists
│   └── musicasSlice.ts # Estado das músicas
├── services/           # Integração com APIs
│   └── audioDBService.ts # Cliente da API TheAudioDB
├── types/              # Definições TypeScript
│   └── index.ts        # Interfaces e tipos
├── utils/              # Utilitários
│   └── storage.ts      # Funções para Storage
└── assets/             # Recursos estáticos
```

## 🧪 Funcionalidades Implementadas

### ✅ Requisitos Atendidos

1. **Login com validação** ✅
   - Email e senha estáticos
   - Validação de formato
   - Redirecionamento pós-login

2. **Rotas protegidas** ✅
   - PrivateRoute implementado
   - Redirecionamento para login

3. **CRUD de Playlists** ✅
   - Criar, listar, editar, excluir
   - Persistência no LocalStorage
   - Filtro por usuário

4. **Integração TheAudioDB** ✅
   - Busca por artista/música
   - Top 10 populares
   - Adição às playlists

5. **Redux para estado** ✅
   - Store configurado
   - Slices organizados
   - Sincronização com Storage

6. **SessionStorage** ✅
   - Dados de sessão
   - Última playlist acessada
   - Histórico de login

## 🎯 Critérios de Avaliação

- **Organização e boas práticas**: ✅ Código modular e documentado
- **Login com validação**: ✅ Implementado conforme especificação
- **Rotas protegidas**: ✅ PrivateRoute funcional
- **Redux**: ✅ Estado global gerenciado
- **CRUD de playlists**: ✅ Funcionalidades completas
- **Integração API + Storage**: ✅ Dados persistidos e sincronizados

---

**SPOTIFSC** - Sistema de Gerenciamento de Playlists
Desenvolvido com ❤️ usando React + TypeScript