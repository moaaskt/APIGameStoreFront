import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import GameForm from './component/GameForm';
import Home from './component/Home';
import Carrinho from './component/Carrinho';
import Login from './component/Login';
import CadastroUsuario from './component/CadastrarUser';



function App() {
  const [games, setGames] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const adicionarAoCarrinho = (jogoComprado) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItem = updatedItems.find((item) => item.jogo.game_id === jogoComprado.game_id);
      if (existingItem) {
        existingItem.quantidade += 1;
      } else {
        updatedItems.push({
          jogo: jogoComprado,
          quantidade: 1,
        });
      }
      return updatedItems;
    });
    setCartTotal((prevTotal) => prevTotal + jogoComprado.preco);
  };
  const removerDoCarrinho = (gameId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.jogo.game_id !== gameId));
  };

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

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://apigamestore.onrender.com/users');
      const data = await response.json();
      setUsers(data.dados);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Routes>
        <Route path='*' element={<Home adicionarAoCarrinho={adicionarAoCarrinho} />} />
        <Route path='/GameForm' element={<GameForm />} />
        <Route
          path="/carrinho"
          element={<Carrinho cartItems={cartItems} cartTotal={cartTotal} removerDoCarrinho={removerDoCarrinho} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/CadastrarUser" element={<CadastroUsuario />} />
      </Routes>
    </div>
  );
}

export default App;
