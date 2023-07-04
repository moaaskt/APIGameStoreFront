import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import GameForm from './component/GameForm';
import Home from './component/Home';
import Carrinho from './component/Carrinho';






function App() {
  const [games, setGames] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const adicionarAoCarrinho = (jogoComprado) => {
    setCartItems((prevItems) => [...prevItems, jogoComprado]);
    setCartTotal((prevTotal) => prevTotal + jogoComprado.preco);
  };

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
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/users');
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
        <Route path='*' element={<Home />}></Route>
        <Route path='/GameForm' element={<GameForm />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route
          path="*"
          element={<Home adicionarAoCarrinho={adicionarAoCarrinho} />}
        />
      </Routes>

    </div>
  );
}

export default App;
