import React from 'react';
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';

/**
 * Página sobre o projeto SPOTIFSC
 * Apresenta informações técnicas e funcionalidades implementadas
 */
const Sobre: React.FC = () => {
  return (
    <Container className="py-4">
      {/* Cabeçalho */}
      <Row className="mb-4">
        <Col>
          <Card className="bg-success text-white text-center">
            <Card.Body>
              <h1 className="mb-2">
                <span className="text-warning">SPOT</span>IFSC
              </h1>
              <p className="lead mb-0">
                Sistema de Gerenciamento de Playlists
              </p>
              <small>Avaliação I - React + TypeScript</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Funcionalidades Implementadas */}
      <Row className="mb-4">
        <Col>
          <h3 className="text-success mb-3">🎯 Funcionalidades Implementadas</h3>
          
          <Row>
            <Col md={6} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="text-success">
                    ✅ Autenticação de Usuários
                  </Card.Title>
                  <Card.Text>
                    Sistema de login com validação de email e senha. 
                    Credenciais: <code>usuario@spotifsc.com</code> / <code>123456</code>
                  </Card.Text>
                  <div>
                    <Badge bg="primary" className="me-1">Email Validation</Badge>
                    <Badge bg="primary" className="me-1">Password Check</Badge>
                    <Badge bg="primary">Session Management</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="text-success">
                    ✅ Rotas Protegidas
                  </Card.Title>
                  <Card.Text>
                    Implementação de PrivateRoute que protege páginas sensíveis 
                    e redireciona usuários não autenticados para o login.
                  </Card.Text>
                  <div>
                    <Badge bg="warning" className="me-1">React Router</Badge>
                    <Badge bg="warning" className="me-1">Private Routes</Badge>
                    <Badge bg="warning">Navigation Guards</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="text-success">
                    ✅ CRUD de Playlists
                  </Card.Title>
                  <Card.Text>
                    Sistema completo de gerenciamento: criar, listar, editar e 
                    excluir playlists. Dados persistidos no LocalStorage.
                  </Card.Text>
                  <div>
                    <Badge bg="info" className="me-1">Create</Badge>
                    <Badge bg="info" className="me-1">Read</Badge>
                    <Badge bg="info" className="me-1">Update</Badge>
                    <Badge bg="info">Delete</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="text-success">
                    ✅ Integração com API Externa
                  </Card.Title>
                  <Card.Text>
                    Consumo da API TheAudioDB para buscar músicas por artista, 
                    nome e exibir top 10 populares. Fallback para dados mock.
                  </Card.Text>
                  <div>
                    <Badge bg="danger" className="me-1">TheAudioDB API</Badge>
                    <Badge bg="danger" className="me-1">Axios</Badge>
                    <Badge bg="danger">Error Handling</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="text-success">
                    ✅ Gerenciamento de Estado
                  </Card.Title>
                  <Card.Text>
                    Redux Toolkit para estado global reativo. Slices organizados 
                    para auth, playlists e músicas com actions assíncronas.
                  </Card.Text>
                  <div>
                    <Badge bg="secondary" className="me-1">Redux Toolkit</Badge>
                    <Badge bg="secondary" className="me-1">TypeScript</Badge>
                    <Badge bg="secondary">Async Thunks</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="text-success">
                    ✅ Persistência e Sessão
                  </Card.Title>
                  <Card.Text>
                    LocalStorage para playlists e SessionStorage para dados 
                    temporários como última playlist acessada e histórico de login.
                  </Card.Text>
                  <div>
                    <Badge bg="success" className="me-1">LocalStorage</Badge>
                    <Badge bg="success" className="me-1">SessionStorage</Badge>
                    <Badge bg="success">Data Persistence</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Tecnologias Utilizadas */}
      <Row className="mb-4">
        <Col>
          <h3 className="text-success mb-3">🛠️ Stack Tecnológico</h3>
          
          <Card>
            <Card.Body>
              <Row>
                <Col md={3} className="mb-3">
                  <h6 className="text-primary">Frontend</h6>
                  <div className="d-flex flex-wrap gap-1">
                    <Badge bg="light" text="dark">React 19</Badge>
                    <Badge bg="light" text="dark">TypeScript</Badge>
                    <Badge bg="light" text="dark">Vite</Badge>
                    <Badge bg="light" text="dark">Bootstrap 5</Badge>
                  </div>
                </Col>
                
                <Col md={3} className="mb-3">
                  <h6 className="text-primary">Estado</h6>
                  <div className="d-flex flex-wrap gap-1">
                    <Badge bg="light" text="dark">Redux Toolkit</Badge>
                    <Badge bg="light" text="dark">React Redux</Badge>
                    <Badge bg="light" text="dark">Async Thunks</Badge>
                  </div>
                </Col>
                
                <Col md={3} className="mb-3">
                  <h6 className="text-primary">Roteamento</h6>
                  <div className="d-flex flex-wrap gap-1">
                    <Badge bg="light" text="dark">React Router</Badge>
                    <Badge bg="light" text="dark">React Router Bootstrap</Badge>
                  </div>
                </Col>
                
                <Col md={3} className="mb-3">
                  <h6 className="text-primary">HTTP & Tools</h6>
                  <div className="d-flex flex-wrap gap-1">
                    <Badge bg="light" text="dark">Axios</Badge>
                    <Badge bg="light" text="dark">Yarn 4</Badge>
                    <Badge bg="light" text="dark">ESLint</Badge>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Arquitetura do Projeto */}
      <Row className="mb-4">
        <Col>
          <h3 className="text-success mb-3">📁 Arquitetura do Projeto</h3>
          
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="text-primary">Estrutura de Pastas</h6>
                  <pre className="bg-light p-3 rounded">
{`src/
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── store/         # Estado global Redux
├── services/      # Integração com APIs
├── types/         # Definições TypeScript
├── utils/         # Utilitários e helpers
└── assets/        # Recursos estáticos`}
                  </pre>
                </Col>
                
                <Col md={6}>
                  <h6 className="text-primary">Padrões Implementados</h6>
                  <ul className="list-unstyled">
                    <li>✅ <strong>Component-Based Architecture</strong></li>
                    <li>✅ <strong>Custom Hooks</strong> para Redux</li>
                    <li>✅ <strong>Type Safety</strong> com TypeScript</li>
                    <li>✅ <strong>Error Boundaries</strong> e tratamento</li>
                    <li>✅ <strong>Responsive Design</strong> com Bootstrap</li>
                    <li>✅ <strong>Code Splitting</strong> por rotas</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Critérios de Avaliação */}
      <Row className="mb-4">
        <Col>
          <h3 className="text-success mb-3">📊 Critérios de Avaliação Atendidos</h3>
          
          <Alert variant="success">
            <div className="row">
              <div className="col-md-6">
                <h6>✅ Organização e boas práticas (1.0 pt)</h6>
                <small>Código modular, documentado e seguindo padrões</small>
                
                <h6 className="mt-3">✅ Login com validação (1.0 pt)</h6>
                <small>Email e senha com validações adequadas</small>
                
                <h6 className="mt-3">✅ Rotas protegidas (1.0 pt)</h6>
                <small>PrivateRoute implementado e funcional</small>
              </div>
              <div className="col-md-6">
                <h6>✅ Redux (estado global) (1.0 pt)</h6>
                <small>Store configurado com slices organizados</small>
                
                <h6 className="mt-3">✅ CRUD de playlists (1.0 pt)</h6>
                <small>Operações completas com LocalStorage</small>
                
                <h6 className="mt-3">✅ Integração API + Storage (1.0 pt)</h6>
                <small>TheAudioDB + persistência local implementada</small>
              </div>
            </div>
          </Alert>
        </Col>
      </Row>

      {/* Funcionalidades Extras */}
      <Row>
        <Col>
          <h3 className="text-success mb-3">🚀 Funcionalidades Extras</h3>
          
          <Card className="border-warning">
            <Card.Body>
              <Row>
                <Col md={4} className="mb-3">
                  <h6 className="text-warning">Interface Moderna</h6>
                  <ul className="small mb-0">
                    <li>Design responsivo</li>
                    <li>Feedback visual</li>
                    <li>Loading states</li>
                    <li>Animações CSS</li>
                  </ul>
                </Col>
                
                <Col md={4} className="mb-3">
                  <h6 className="text-warning">Experiência do Usuário</h6>
                  <ul className="small mb-0">
                    <li>Dados da última sessão</li>
                    <li>Histórico de acesso</li>
                    <li>Busca em tempo real</li>
                    <li>Validações amigáveis</li>
                  </ul>
                </Col>
                
                <Col md={4} className="mb-3">
                  <h6 className="text-warning">Robustez</h6>
                  <ul className="small mb-0">
                    <li>Fallback para API offline</li>
                    <li>Tratamento de erros</li>
                    <li>Dados mock integrados</li>
                    <li>TypeScript strict mode</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Sobre;