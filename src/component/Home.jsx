import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [gameData, setGameData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    plataforma: '',
    url_jogo: '',
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
    cadastrarJogo(gameData);
    setGameData({
      nome: '',
      descricao: '',
      preco: '',
      plataforma: '',
      url_jogo: '',
    });
  };
  const comprarJogo = (gameId) => {
    const jogoComprado = games.find((game) => game.game_id === gameId);
  
    if (jogoComprado) {
      console.log(`Jogo ${jogoComprado.nome} comprado!`);
      adicionarAoCarrinho(jogoComprado);
      navigate('/Carrinho');
    } else {
      console.log(`Jogo com ID ${gameId} não encontrado.`);
    }
  };
  
  
  

  const filteredGames = games.filter((game) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      game.nome.toLowerCase().includes(searchTermLower) ||
      game.descricao.toLowerCase().includes(searchTermLower) ||
      game.plataforma.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="home-container">
      <h1>GameStore©</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar jogo..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={handleFormSubmit}>
          Procurar
        </button>
      </div>
      <div className="product-grid">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div key={game.game_id} className="product-item">
              <img src={game.url_jogo} alt="Imagem do Jogo" />
              <h3>{game.nome}</h3>
              <p>{game.descricao}</p>
              <p className="price">Preço: R${game.preco}</p>
              <p className="platform">Plataforma: {game.plataforma}</p>
              <button onClick={() => comprarJogo(game.game_id)}>Comprar</button>
            </div>
          ))
        ) : (
          <p className="no-results">Nenhum jogo encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
