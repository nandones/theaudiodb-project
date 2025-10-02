import React from 'react';
import { Card, Button } from 'react-bootstrap';
import type { Musica } from '../types';

export interface MusicaCardProps {
  musica: Musica;
  showAddButton?: boolean;
  onAdd?: (musica: Musica) => void;
  disableAdd?: boolean;
  animate?: boolean; // anima apenas quando for resultado de busca
}

const MusicaCardComponent: React.FC<MusicaCardProps> = ({
  musica,
  showAddButton = true,
  onAdd,
  disableAdd,
  animate = false
}) => {
  return (
    <Card className={`musica-card h-100 ${animate ? 'fade-in' : ''}`}> {/* anima somente quando solicitado */}
      <Card.Body>
        <Card.Title className="h6 text-success">{musica.nome}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{musica.artista}</Card.Subtitle>
        <Card.Text>
          <small className="text-muted">
            <strong>Gênero:</strong> {musica.genero}<br />
            <strong>Ano:</strong> {musica.ano || 'N/A'}
          </small>
        </Card.Text>
        {musica.descricao && (
            <Card.Text>
              <small className="text-muted">
                {musica.descricao.substring(0, 100)}
                {musica.descricao.length > 100 && '...'}
              </small>
            </Card.Text>
        )}
      </Card.Body>
      {showAddButton && onAdd && (
        <Card.Footer className="bg-transparent">
          <Button
            variant="success"
            size="sm"
            className="w-100"
            onClick={() => onAdd(musica)}
            disabled={disableAdd}
          >
            {disableAdd ? 'Criar playlist primeiro' : 'Adicionar à playlist'}
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

// Memo para evitar re-render desnecessário; compara id e campos principais
export const MusicaCard = React.memo(MusicaCardComponent, (prev, next) => {
  return (
    prev.musica.id === next.musica.id &&
    prev.musica.nome === next.musica.nome &&
    prev.musica.artista === next.musica.artista &&
    prev.showAddButton === next.showAddButton &&
    prev.disableAdd === next.disableAdd &&
    prev.animate === next.animate
  );
});

MusicaCard.displayName = 'MusicaCard';

export default MusicaCard;
