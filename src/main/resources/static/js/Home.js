const produtos = document.querySelectorAll(".Produto");
const menu = document.querySelector(".info-produto");
const overlay = document.querySelector(".overlay");
const fechar = document.querySelector(".info-tit-icone");

// Evento do menu fechar após clicar na tela
document.addEventListener("click", function (event) {
    if (!menu.contains(event.target)) {
        let none = menu.style.display = "none";
        if (none) {
            overlay.style.display = 'none';
        }
    }
});

// Evento de tirar o fundo escuro após o menu sumir
fechar.addEventListener("click", function () {
    let fechou = menu.style.display = 'none';
    if (fechou) {
        overlay.style.display = 'none';
    }
});

// Requisição Busca todos os produtos
async function requisition() {
    try {
        const response = await fetch("http://localhost:8080/api/produtos");
        const brinquedos = await response.json();

        const container = document.querySelector(".geral-produto");
        container.innerHTML = "";

        brinquedos.forEach(produto => {
            const div = document.createElement("div");
            div.className = "Produto";
            div.setAttribute("data-id", produto.codigo);
            div.innerHTML = `<img src="${produto.imagem}" alt="${produto.nome}">
            <h4>${produto.nome}</h4>
            <span>R$: ${produto.valor}</span>`;
            container.appendChild(div);

            // Adiciona evento de clique para abrir detalhes do produto
            div.addEventListener("click", function () {
                buscarProdutoDetalhes(produto.codigo);
            });
        });

    } catch (e) {
        console.error("Erro ao buscar produto:", e);
    }
}

// Função para buscar detalhes do produto
async function buscarProdutoDetalhes(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/produtos/${id}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const produto = await response.json();
        exibirDetalhesProduto(produto);
    } catch (e) {
        console.error("Erro ao buscar detalhes do produto:", e);
    }
}

// Função para exibir detalhes do produto
function exibirDetalhesProduto(produto) {
    // Limpa o conteúdo anterior do menu
    menu.innerHTML = ""; 

    // Título e ícone de fechar
    const infoTit = document.createElement("div");
    infoTit.className = "info-tit";
    infoTit.innerHTML = `
        <div class="tit-style">
            <h3>Produto</h3>
        </div>
        <div class="info-tit-icone" onclick="fecharMenu()">
            <i class="bi bi-x-lg"></i>
        </div>
    `;

    const imagem = document.createElement("div");
    imagem.className = "info-img";
    imagem.innerHTML = `<img src="${produto.imagem}" alt="${produto.nome}">`;

    const infoDescricao = document.createElement("div");
    infoDescricao.className = "info-descrição";
    infoDescricao.innerHTML = `<h2>${produto.nome}</h2>
    <p>R$: ${produto.valor}</p>`;

    const infoDetalhes = document.createElement("div");
    infoDetalhes.className = "info-detalhes";
    infoDetalhes.innerHTML = `<p>${produto.descricao}</p>`;

    // Usando append para adicionar múltiplos elementos
    menu.append(infoTit, imagem, infoDescricao, infoDetalhes);

    // Exibe o menu e o overlay
    menu.style.display = 'block';
    overlay.style.display = 'block';
}

// Função para fechar o menu
function fecharMenu() {
    menu.style.display = 'none';
    overlay.style.display = 'none';
}

// Chama a função para buscar os produtos ao carregar a página
document.addEventListener("DOMContentLoaded", requisition);


