import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CadastrarUser from './CadastrarUser'; 
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    
    alert('login efetuado com sucesso')
    window.location.href = '/dashboard';
  };


  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label className='mail'>Email:</label>
          <input placeholder='example@email.com' type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
  <label className='passWord'>Senha:</label>
  <input type="password" placeholder='Digite sua senha' value={senha} onChange={(event) => setSenha(event.target.value)} />
</div>
        <button type="submit">Entrar</button> <p><Link to="/Home">
            <button className="cadas-button">Home</button>
          </Link></p> 
      </form>
      <p className='crieConta'>Ainda não tem uma conta? <Link to="/CadastrarUser">Cadastrar</Link></p>
    </div>
  );
};

export default Login;
