import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch } from './store/hooks';
import { restaurarSessao } from './store/authSlice';

// Importar componentes
import Header from './components/Header';
import RotaPrivada from './components/RotaPrivada';

// Importar páginas
import Login from './pages/Login';
import Home from './pages/Home';
import Playlists from './pages/Playlists';
import Musicas from './pages/Musicas';
import DetalhesPlaylist from './pages/DetalhesPlaylist';
import Sobre from './pages/Sobre';

// Importar estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/**
 * Componente principal que inicializa a aplicação
 */
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  // Restaurar sessão ao carregar a aplicação
  useEffect(() => {
    dispatch(restaurarSessao());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Rota pública */}
            <Route path="/login" element={<Login />} />
            
            {/* Rotas protegidas */}
            <Route 
              path="/home" 
              element={
                <RotaPrivada>
                  <Home />
                </RotaPrivada>
              } 
            />
            
            <Route 
              path="/playlists" 
              element={
                <RotaPrivada>
                  <Playlists />
                </RotaPrivada>
              } 
            />
            
            <Route 
              path="/musicas" 
              element={
                <RotaPrivada>
                  <Musicas />
                </RotaPrivada>
              } 
            />
            
            <Route 
              path="/playlists/:id" 
              element={
                <RotaPrivada>
                  <DetalhesPlaylist />
                </RotaPrivada>
              } 
            />
            
            <Route 
              path="/sobre" 
              element={
                <RotaPrivada>
                  <Sobre />
                </RotaPrivada>
              } 
            />
            
            {/* Redirecionamento padrão */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Rota para páginas não encontradas */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

/**
 * Componente App principal com Provider do Redux
 */
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
