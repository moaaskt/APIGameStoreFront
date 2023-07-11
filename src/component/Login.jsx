import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CadastrarUser from './CadastrarUser'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    alert('login efetuado com sucesso')
    window.location.href = '/dashboard';
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>Ainda não tem uma conta? <Link to="/CadastrarUser">Cadastrar</Link></p>
    </div>
  );
};

export default Login;
