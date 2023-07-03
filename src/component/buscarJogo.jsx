import React, { useState, useEffect } from 'react';

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
<div>
<h1>GameStore©</h1>
      {(
        <ul>
          {games.map((game) => (
            <li key={game.game_id}>
              <h3>{game.nome}</h3>
              <p>{game.descricao}</p>
              <p>Preço: R${game.preco}</p>
              <p>Plataforma: {game.plataforma}</p>
              <p>Imagem<br/><img src={game.url_jogo} alt="Imagem do Jogo" style={{ width: '200px', height: '150px' }} /></p>
             
            </li>
          ))}
        </ul>
      )}
   
    </div>
  );
};

export default GameForm;


