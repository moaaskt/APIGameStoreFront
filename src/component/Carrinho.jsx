import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Carrinho.css';

const Carrinho = ({ cartItems, cartTotal, removerDoCarrinho }) => {
  const calcularTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.jogo.preco * item.quantidade;
    });
    return total.toFixed(2);
  };

  const handleGoToHome = () => {
    const navigate = useNavigate();
    navigate('/home');
  };

  const handleRemoverUnidade = (gameId) => {
    const item = cartItems.find((item) => item.jogo.game_id === gameId);
    if (item && item.quantidade > 1) {
      // Se a quantidade for maior que 1, diminua a quantidade em 1 unidade
      removerDoCarrinho(gameId, 1);
    }
  };

  return (
    <div className='carrinho-de-compra'>
      <h2>Carrinho de Compras</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.jogo.game_id}>
              <img src={item.jogo.url_jogo} alt={item.jogo.nome} />
              <div>
                <h3>{item.jogo.nome}</h3>
                <p>Plataforma: {item.jogo.plataforma}</p>
                <p>Preço: R${item.jogo.preco}</p>
                <p>Quantidade: {item.quantidade}</p>
                <button onClick={() => handleRemoverUnidade(item.jogo.game_id)}>Remover 1 unidade</button>
              </div>
              <hr />
              
            </div>
            
            
          ))}
          
          <p>Valor Total: R${calcularTotal()}</p>   <Link to="/home">
          <button className="cadas-button">Voltar</button>
        </Link>
        </div>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
      <Link to="/home">
        <button className="cadas-button">Voltar</button>
      </Link>
    </div>
  );
};

export default Carrinho;
