import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CadastrarUser from './CadastrarUser'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('https://apigamestore.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      if (response.ok) {
        // Autenticação bem-sucedida
        alert('Login efetuado com sucesso!');
        window.location.href = '/dashboard';
      } else {
        // Autenticação falhou
        const errorData = await response.json();
        const errorMessage = errorData.erro;
        alert('Falha no login: ' + errorMessage);
      }
    } catch (error) {
      // Trate erros de rede ou outras exceções
      console.error('Erro de rede:', error);
      alert('Erro de rede ao fazer login. Por favor, tente novamente.');
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>Ainda não tem uma conta? <Link to="/CadastrarUser">Cadastrar</Link></p>
    </div>
  );
};

export default Login;
