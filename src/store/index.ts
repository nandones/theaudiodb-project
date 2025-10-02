import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import playlistsReducer from './playlistsSlice';
import musicasReducer from './musicasSlice';

/**
 * Configuração do store Redux
 * Centraliza o estado global da aplicação
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    playlists: playlistsReducer,
    musicas: musicasReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar ações que podem ter valores não serializáveis
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;