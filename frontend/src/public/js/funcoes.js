function adicionar(novoItem) {
  console.log('Item novoItem:', { novoItem });
  const carrinho = localStorage.getItem('carrinho')
    ? JSON.parse(localStorage.getItem('carrinho'))
    : [];

  console.log('O carrinho:', { novoItem, carrinho });

  if (carrinho.find((p) => p?.id == novoItem.id)) {
    console.log('achou...', novoItem.quantidade);
    novoItem.quantidade += carrinho.find(
      (p) => p?.id === novoItem.id
    ).quantidade;
  }
  const copia = [novoItem, ...carrinho.filter((p) => p?.id !== novoItem.id)];

  localStorage.setItem('carrinho', JSON.stringify(copia));
}

function remover(itemCarrinho) {
  const carrinho = localStorage.getItem('carrinho')
    ? JSON.parse(localStorage.getItem('carrinho'))
    : [];

  const produtoNoCarrinho = carrinho.find((p) => p.id === itemCarrinho.id);
  if (produtoNoCarrinho) {
    produtoNoCarrinho.quantidade = produtoNoCarrinho.quantidade - 1;
  }

  const copiaCarrinho = carrinho.filter((produto) => produto.quantidade >= 1);
  localStorage.setItem('carrinho', JSON.stringify(copiaCarrinho));
  exibirCarrinho();
}
  console.log('os itens no local e ',localStorage.length)
function exibirCarrinho() {
  const carrinhoTela = document.getElementById('carrinho');

  const carrinho = localStorage.getItem('carrinho')
    ? JSON.parse(localStorage.getItem('carrinho'))
    : [];

  carrinhoTela.innerHTML = '';
  carrinho.map((produto) => {
   const subtotal=(produto.quantidade * produto.valor).toFixed(2) 
    carrinhoTela.innerHTML += ` 
  <article>
    <div class="product-offer-container">
      <div>
          <img class="product-offer-image" src="${produto.foto}" alt="">
      </div>
      <div class="product-offer-details">
          <a>
            ${produto.nome}
          </a>
          <a>
          R$ ${produto.valor}
          </a>
      </div>
      <div class="product-offer-details">
      <a>
        Quantidade:
      <a>
      ${produto.quantidade}
       </a>
         </div>
      <div class="product-offer-details">
      Subtotal R$ :
      <a>
           ${subtotal}
         
    </a>
    
      </div>
      <div class="product-offer-button">
          <button
              onclick="remover({id:'${produto.id}', quantidade:1, nome:'${produto.nome}', valor:'${produto.valor}', foto:'/img/burguer04.jpg'})">Remover</button>
              
      </div>
    </div> 
  </article>
`;
  });

  if (!carrinho.length) {
    carrinhoTela.innerHTML += `  
    <h3 style='text-align: center;'>
        <i> Carrinho vazio </i> - <a href='/'>voltar para promoções </a>
    </h3>`;
  }
}
