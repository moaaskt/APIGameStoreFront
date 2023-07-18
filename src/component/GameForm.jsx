import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GameForm.css';




const GameForm = () => {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    plataforma: '',
    url_jogo: '', // Corrigido o nome do campo
  });

  const handleGoToHome = () => {
    navigate('/home'); // Use a função navigate para navegar para a página inicial
  };

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
      const response = await fetch('https://apigamestore.onrender.com/cadastrarGames', {
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

    <div class="game-form-container">
    <h2>Cadastro de Games</h2>
    <form onSubmit={handleFormSubmit}>
      <div class="input-container">
        <label>
          Nome:
          <input
          placeholder='Nome do jogo'
            type="text"
            name="nome"
            value={gameData.nome}
            onChange={handleInputChange}
          />
        </label>
      </div>
  
      <div class="input-container">
        <label>
          Descrição:
          <input
          placeholder='Digite aqui as descriçoes do jogo'
            type="text"
            name="descricao"
            value={gameData.descricao}
            onChange={handleInputChange}
          />
        </label>
      </div>
  
      <div class="input-container">
        <label>
          Preço:
          <input
          placeholder='R$'
            className='input-preco'
            type="number"
            name="preco"
            value={gameData.preco}
            onChange={handleInputChange}
          />
        </label>
      </div>
  
      <div class="input-container">
        <label>
          Plataforma:
          <input
          placeholder='PC,PSP,PS5,XBOX..'
            type="text"
            name="plataforma"
            value={gameData.plataforma}
            onChange={handleInputChange}
          />
        </label>
      </div>
  
      <div class="input-container">
        <label>
          URL do Jogo:
          <input
          placeholder='URL imagem da Capa'
            type="text"
            name="url_jogo"
            value={gameData.url_jogo}
            onChange={handleInputChange}
          />
        </label>
      </div>
  
      <div class="button-container">
        <button type="submit" class="game-submit-button">Cadastrar</button>
        <button class="cadas-button-form" onClick={handleGoToHome}>
          <i class="fa-sharp fa-solid fa-arrow-left"></i> 
        </button>
      </div>
    </form>
  </div>
  
  

  );
};

export default GameForm;
