import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastrarUser.css'

const CadastrarUser = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async (event) => {
    event.preventDefault();

    // Monta o objeto com os dados do usuário
    const novoUser = {
      nome: nome,
      cpf: cpf,
      email: email,
      senha: senha
    };

    try {
      const response = await fetch('http://localhost:3000/cadastrarUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUser),
      });

      if (response.ok) {
        // Cadastro realizado com sucesso
        alert('Usuário cadastrado com sucesso!');
        // Redireciona o usuário para a página de login
        navigate('/login');
      } else {
        // Ocorreu um erro no cadastro
        const errorData = await response.json();
        throw new Error(errorData.erro);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div className='cadastra-user'>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleCadastro}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" value={cpf} onChange={(event) => setCpf(event.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} />
        </div>
        <button type="submit">Cadastrar</button> <br/> <Link to="/Home">
            <button className="cadas-button">Home</button>
          </Link>
      </form>
      <p>Já possui uma conta? <Link to="/login">Faça login</Link></p>

     
    </div>
  );
};

export default CadastrarUser;
