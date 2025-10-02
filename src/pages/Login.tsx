import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { iniciarLogin, loginSucesso, loginFalha, limparErro } from '../store/authSlice';
import { validarEmail, validarSenha, gerarId } from '../utils/storage';

/**
 * Página de Login
 * Permite autenticação com email e senha estáticos
 */
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errosValidacao, setErrosValidacao] = useState<string[]>([]);

  const { isAuthenticated, carregando, erro } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Dados estáticos para login (conforme especificação)
  const EMAIL_VALIDO = 'usuario@spotifsc.com';
  const SENHA_VALIDA = '123456';

  // Limpar erros quando o componente for desmontado
  useEffect(() => {
    return () => {
      dispatch(limparErro());
    };
  }, [dispatch]);

  // Se já estiver autenticado, redirecionar para home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Função para validar formulário
  const validarFormulario = (): boolean => {
    const erros: string[] = [];

    if (!email.trim()) {
      erros.push('Email é obrigatório');
    } else if (!validarEmail(email)) {
      erros.push('Email deve ter um formato válido');
    }

    if (!senha.trim()) {
      erros.push('Senha é obrigatória');
    } else if (!validarSenha(senha)) {
      erros.push('Senha deve ter pelo menos 6 caracteres');
    }

    setErrosValidacao(erros);
    return erros.length === 0;
  };

  // Função para realizar login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpar erros anteriores
    dispatch(limparErro());
    setErrosValidacao([]);

    // Validar formulário
    if (!validarFormulario()) {
      return;
    }

    // Iniciar processo de login
    dispatch(iniciarLogin());

    // Simular verificação de credenciais
    setTimeout(() => {
      if (email === EMAIL_VALIDO && senha === SENHA_VALIDA) {
        // Login bem-sucedido
        const usuario = {
          id: gerarId(),
          email: email,
          dataLogin: new Date().toISOString()
        };
        dispatch(loginSucesso(usuario));
      } else {
        // Login falhou
        dispatch(loginFalha('Email ou senha incorretos'));
      }
    }, 1000); // Simular delay de rede
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} sm={8} md={6} lg={5} xl={4}>
            <Card className="login-card">
              <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="text-success mb-2">
                  <span className="text-danger">SPOT</span>IFSC
                </h2>
                <p className="text-muted">Entre com sua conta</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={carregando}
                    isInvalid={errosValidacao.some(erro => erro.includes('Email'))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={carregando}
                    isInvalid={errosValidacao.some(erro => erro.includes('Senha'))}
                  />
                </Form.Group>

                {/* Exibir erros de validação */}
                {errosValidacao.length > 0 && (
                  <Alert variant="warning" className="small">
                    <ul className="mb-0">
                      {errosValidacao.map((erro, index) => (
                        <li key={index}>{erro}</li>
                      ))}
                    </ul>
                  </Alert>
                )}

                {/* Exibir erro de autenticação */}
                {erro && (
                  <Alert variant="danger" className="small">
                    {erro}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="success"
                  className="w-100 mb-3"
                  disabled={carregando}
                >
                  {carregando ? 'Entrando...' : 'Entrar'}
                </Button>

                {/* Dados para teste */}
                <Card className="bg-light border-0">
                  <Card.Body className="p-2">
                    <small className="text-muted d-block text-center">
                      <strong>Dados para teste:</strong><br />
                      Email: {EMAIL_VALIDO}<br />
                      Senha: {SENHA_VALIDA}
                    </small>
                  </Card.Body>
                </Card>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default Login;