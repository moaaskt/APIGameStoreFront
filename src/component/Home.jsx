import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import Carrinho from './Carrinho';
import Login from './Login'; 

const Home = ({ adicionarAoCarrinho }) => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
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
      const response = await fetch('https://apigamestore.onrender.com/games');
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
      alert("Adicionado ao carrinho")
      adicionarAoCarrinho(jogoComprado);
      // navigate('/carrinho');
    } else {
      console.log(`Jogo com ID ${gameId} não encontrado.`);
    }
  };

  const handleGoToCarrinho = () => {
    navigate('/Carrinho'); // Use a função navigate para navegar para a página inicial
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
<nav className="navbar">
  <div className="navbar-container">
    <h1 className="logo">GameStore©</h1>
    <ul className="nav-links">
      <li>
        <input
          type="text"
          className="search-bar"
          placeholder="Pesquise algum jogo..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </li>
      <li>
        <button className="carrinho" onClick={handleGoToCarrinho}>
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </li>
      <li>
        <Link to="/GameForm">
          <i class="fa-solid fa-plus"></i>
        </Link>
      </li>
      <li>
        <Link to="/Login">
          <i class="fa-solid fa-user"></i>
        </Link>
      </li>
    </ul>
  </div>
</nav>


      <div className="product-grid">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div key={game.game_id} className="product-item">
              <img src={game.url_jogo} alt="Imagem do Jogo" />
              <h3>{game.nome}</h3>
              <p>{game.descricao}</p>
              <p className="price">Preço: R${game.preco}</p>
              <p className="platform">Plataforma: {game.plataforma}</p>
              <button className='carrinho-compra' onClick={() => comprarJogo(game.game_id)}>Adicionar no carrinho</button>
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
