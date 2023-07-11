import React from 'react';

const Carrinho = ({ cartItems, cartTotal }) => {
  const calcularTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.jogo.preco * item.quantidade;
    });
    return total.toFixed(2);
  };

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
          <p>Valor Total: R${calcularTotal()}</p>
        </div>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </div>
  );
};

export default Carrinho;
