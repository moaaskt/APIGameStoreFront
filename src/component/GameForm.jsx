import React, { useState } from 'react';
import './GameForm.css';

const GameForm = () => {
  const [gameData, setGameData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    plataforma: '',
    url_jogo: '', // Corrigido o nome do campo
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/cadastrarGames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
      if (response.ok) {
        // O jogo foi cadastrado com sucesso
        console.log('Jogo cadastrado com sucesso!');
        alert('Jogo cadastrado com sucesso')
        // Limpar os campos do formulário
        setGameData({
          nome: '',
          descricao: '',
          preco: '',
          plataforma: '',
          url_jogo: '',
        });
      } else {
        // Ocorreu um erro ao cadastrar o jogo
        console.error('Erro ao cadastrar o jogo:', response.status);
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
    }
  };

  return (
    
    <div className="game-form-container">
      
    <h1>Cadastro de Games</h1>
    <form onSubmit={handleFormSubmit}>
      <label>
        Nome:
        <input
          type="text"
          name="nome"
          value={gameData.nome}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Descrição:
        <input
          type="text"
          name="descricao"
          value={gameData.descricao}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Preço:
        <input
          type="number"
          name="preco"
          value={gameData.preco}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Plataforma:
        <input
          type="text"
          name="plataforma"
          value={gameData.plataforma}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        URL do Jogo:
        <input
          type="text"
          name="url_jogo" // Corrigido o nome do campo
          value={gameData.url_jogo}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Cadastrar Jogo</button>
    </form>
  </div>
  );
};

export default GameForm;
