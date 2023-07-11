import React from 'react';

const Carrinho = ({ cartItems, cartTotal, removerDoCarrinho }) => {
  const calcularTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.jogo.preco * item.quantidade;
    });
    return total.toFixed(2);
  };

  const handleGoToHome = () => {
    navigate('/home'); // Use a função navigate para navegar para a página inicial
  };

  return (
    <div>
      
      <h2>Carrinho de Compras</h2>
    
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.jogo.game_id}>
              <img src={item.jogo.url_jogo} alt={item.jogo.nome} />
              <h3>{item.jogo.nome}</h3>
              <p>Plataforma: {item.jogo.plataforma}</p>
              <p>Preço: R${item.jogo.preco}</p>
              <p>Quantidade: {item.quantidade}</p>
              <button onClick={() => removerDoCarrinho(item.jogo.game_id)}>Remover</button>
              <hr />
            </div>
          ))}
          <p>Valor Total: R${calcularTotal()}</p>
        </div>
      ) : (
        <p>O carrinho está vazio.</p>
        
      )}
    </div>
    
  );
};

export default Carrinho;
