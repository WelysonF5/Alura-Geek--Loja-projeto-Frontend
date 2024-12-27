//função carregarProdutos
async function carregarProdutos(){
    try {
        console.log('Iniciando carregamento de produtos...');
        const response = await fetch('http://localhost:3000/produtos');
        if (!response.ok) {
           throw new Error("Não foi possível carregar os produtos");
        }
        console.log('Resposta recebida:', response);

        const produtos = await response.json();
        console.log('Dados recebidos:', produtos);

        const container = document.querySelector('.container_view_product_list');
        container.innerHTML = ''; // Limpar o container antes de adicionar novos produtos

        produtos.forEach(produto => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.style.position = 'relative';
            productElement.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.titulo}">
                <div>
                    <h2>${produto.titulo}</h2>
                    <p>R$ ${produto.valor}</p>
                    <div class="trash-icon" onclick="excluirProduto('${produto.id}')">
                        <div class="trash-icon" onclick="excluirProduto('${produto.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="#000000">
                                <path d="M 10 2 L 9 3 L 5 3 L 5 5 L 19 5 L 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.104 5.896 22 7 22 L 17 22 C 18.104 22 19 21.104 19 20 L 19 7 L 5 7 z M 7 9 L 9 9 L 9 19 L 7 19 L 7 9 z M 11 9 L 13 9 L 13 19 L 11 19 L 11 9 z M 15 9 L 17 9 L 17 19 L 15 19 L 15 9 z"/>
                            </svg>
                    </div>
                </div>`;
            console.log('Adicionando Produto:', produto);
            container.appendChild(productElement);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}



//Adicionar Produto ao ga.json
document.addEventListener('DOMContentLoaded', function() { // Adicionar o event listener após o DOM estar completamente carregado
    document.getElementById('add_product_form_id').addEventListener('submit', async function (event) {
        event.preventDefault();
        const titulo = document.getElementById('titulo-id').value;
        const valor = document.getElementById('valor-id').value;
        const imagem = document.getElementById('imagem-id').value.split('\\').pop(); 

        // Gerar um ID único para o novo produto
        const id = Date.now().toString(); // Adicionar um ID único

        const novoProduto = {
            id: id, // Adicionar ID ao objeto
            titulo: titulo,
            valor: valor,
            imagem: `./imgs/${imagem}`
        };
        console.log('Produto a ser adicionado:', novoProduto);
        try{
            const response = await fetch('http://localhost:3000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoProduto)
            });
            console.log('Resposta da solicitação:', response);

            if (response.ok) {
                const responseData = await response.json();
                console.log('Resposta da solicitação JSON:', responseData);
                console.log('Produto adicionado com sucesso');
                adicionarProdutoNaTela(novoProduto);
            } else {
                console.error('Erro ao adicionar produto', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }
    });
});



///função para adicionar o novo produto diretamente na tela
function adicionarProdutoNaTela(produto){
    const container = document.querySelector('.container_view_product_list');
    const productElement = document.createElement('div'); // Correção: criar novo elemento 'div'
    productElement.classList.add('product');
    productElement.style.position = relative;
    productElement.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.titulo}">
        <div>
            <h2>${produto.titulo}</h2>
            <p>R$ ${produto.valor}</p>
            <div class="trash-icon" onclick="excluirProduto('${produto.id}')">
                <div class="trash-icon" onclick="excluirProduto('${produto.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="#000000">
                        <path d="M 10 2 L 9 3 L 5 3 L 5 5 L 19 5 L 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.104 5.896 22 7 22 L 17 22 C 18.104 22 19 21.104 19 20 L 19 7 L 5 7 z M 7 9 L 9 9 L 9 19 L 7 19 L 7 9 z M 11 9 L 13 9 L 13 19 L 11 19 L 11 9 z M 15 9 L 17 9 L 17 19 L 15 19 L 15 9 z"/>
                    </svg>
                </div>   
            </div>`;
    container.appendChild(productElement);
}



//Corrigir excluir Produtos
async function excluirProduto(id) {
    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, { // Correção: adicionar endpoint correto
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Correção: posição correta dos apóstrofos
            }
        });
        if (response.ok) {
            console.log('Produto excluído com sucesso');
            carregarProdutos();
        } else {
            console.error('Erro ao excluir produto');
        }
    } catch (error) {
        console.error('Erro ao enviar requisição:', error); // Correção de sintaxe
    }
}

//função correta para carregar produtos (sem duplicação)
carregarProdutos();
