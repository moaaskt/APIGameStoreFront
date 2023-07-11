import React from 'react';

const Carrinho = ({ cartItems, cartTotal }) => {
  const total = typeof cartTotal === 'number' ? cartTotal.toFixed(2) : '0.00';

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.jogo.game_id}>{item.jogo.nome}</li>
            ))}
          </ul>
          <p>Valor Total: R${total}</p>
        </div>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </div>
  );
};

export default Carrinho;
