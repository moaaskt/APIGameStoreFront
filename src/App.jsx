import React, { useState, useEffect } from 'react';
import {Routes, Route } from 'react-router-dom'
import GameForm from './component/GameForm';
import Home from './component/Home';





function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

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
   <Route path='/GameForm' element={<GameForm/>}></Route>
   <Route path='/Home' element={<Home/>}></Route>


    </Routes>

    </div>
  );
}

export default App;
