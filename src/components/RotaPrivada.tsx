import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface RotaPrivadaProps {
  children: React.ReactNode;
}

/**
 * Componente para proteger rotas que precisam de autenticação
 * Redireciona para login se o usuário não estiver autenticado
 */
const RotaPrivada: React.FC<RotaPrivadaProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo
  return <>{children}</>;
};

export default RotaPrivada;