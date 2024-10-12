// Requisição para buscar todos os produtos Masculino
async function requisition() {
    try {
        const categoria = "Meninas";
        const response = await fetch(`http://localhost:8080/api/produtos/categoria/${categoria}`);
        
        // Verifique se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        
        const brinquedos = await response.json();
		console.log(brinquedos)
        const container = document.querySelector(".geral-produto");
        container.innerHTML = "";

        brinquedos.forEach(produto => {
            const div = document.createElement("div");
            div.className = "Produto";
            div.setAttribute("data-id", produto.codigo);
            div.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h4>${produto.nome}</h4>
                <span>R$: ${produto.valor}</span>
            `;
            container.appendChild(div);
        });

    } catch (e) {
        console.error("Erro ao buscar produto:", e);
    }
}

// Chama a função assim que o DOM estiver carregado
document.addEventListener("DOMContentLoaded", requisition);
