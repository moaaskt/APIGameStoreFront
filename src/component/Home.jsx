import React, { useState, useEffect } from 'react';
import './Home.css';

const GameForm = () => {
  const [games, setGames] = useState([]);
  const [gameData, setGameData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    plataforma: '',
    url: '',
  });

  useEffect(() => {
    fetchGames();
  }, []);
  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:4000/games');
      const data = await response.json();
      setGames(data.Dados);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode chamar a função de enviar os dados para a API
    cadastrarJogo(gameData);
    // Limpar os campos do formulário
    setGameData({
      nome: '',
      descricao: '',
      preco: '',
      plataforma: '',
      url: '',
    });
  };

  return (
    <div className="home-container">
    <h1>GameStore©</h1>
    <div className="product-grid">
      {games.map((game) => (
        <div key={game.game_id} className="product-item">
          <img src={game.url_jogo} alt="Imagem do Jogo" />
          <h3>{game.nome}</h3>
          <p>{game.descricao}</p>
          <p className="price">Preço: R${game.preco}</p>
          <p className="platform">Plataforma: {game.plataforma}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default GameForm;


