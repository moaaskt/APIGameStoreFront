
import React from 'react';
import { useHistory } from 'react-router-dom';


const Carrinho = ({ cartItems, cartTotal }) => {
  return (
    <div>
      <h2>Carrinho de Compras</h2>
      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.game_id}>{item.nome}</li>
            ))}
          </ul>
          <p>Valor Total: R${cartTotal.toFixed(2)}</p>
        </div>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </div>
  );
};

export default Carrinho;
