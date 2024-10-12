// Função para buscar produtos da API e preencher a tabela
async function requisition() {
    try {
        const response = await fetch("http://localhost:8080/api/produtos");
        const brinquedos = await response.json();

        const tabela = document.getElementById("tabela");
        tabela.innerHTML = "";

        // Adiciona o cabeçalho da tabela
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>Nome do Brinquedo</th>
                <th>Ações</th>
            </tr>`;
        tabela.appendChild(thead); // Adiciona o cabeçalho no topo da tabela

        // Itera sobre cada produto e cria uma linha na tabela
        brinquedos.forEach(produto => {
            const tr = document.createElement("tr");
            const tdNome = document.createElement("td");
            const tdAcoes = document.createElement("td");

            // Define o atributo data-codigo na linha
            tr.setAttribute("data-codigo", produto.codigo);
            tdNome.innerText = produto.nome;

            //Criando botão de exclusão
            const btnExcluir = document.createElement("button");
            btnExcluir.className = "btn btn-danger btn-sm";
            btnExcluir.innerText = "Excluir";

            // Adiciona os botões à célula de ações
            tdAcoes.appendChild(btnExcluir);

            // Adiciona as células à linha
            tr.appendChild(tdNome);
            tr.appendChild(tdAcoes);
            tabela.appendChild(tr);

            // Adiciona evento para o botão de excluir
            btnExcluir.addEventListener("click", async function () {
                const confirme = confirm("Deseja excluir esse produto?");
                if (!confirme) return;

                try {
                    const deleteResponse = await fetch(`http://localhost:8080/api/produtos/${produto.codigo}`, {
                        method: 'DELETE'
                    });

                    if (!deleteResponse.ok) {
                        throw new Error(`Erro ao deletar produto: ${deleteResponse.status}`);
                    }

                    // Remove a linha da tabela após a exclusão
                    tr.remove();
                   	mostrarAlerta()
                } catch (error) {
                    console.error("Erro:", error);
                }
            });
        });
    } catch (e) {
        console.error("Erro ao buscar produtos:", e);
    }
}


// Chama a função para buscar os produtos ao carregar a página
document.addEventListener("DOMContentLoaded", requisition);




//Funções separadas 

//Mostrar Alerta quando excluir
 function mostrarAlerta(){
	const alerta= document.getElementById("alerta")
	alerta.style.display= 'block'
	
	const tempo= 1500
	
	setTimeout(()=>{
		alerta.style.display='none';}, tempo)
};


//Mostrar Alerta quando cadastrar
function mostrarAlertaCadastrar(){
	const alerta= document.getElementById("alerta-cadastrar")
	alerta.style.display='block'
	
	const tempo= 1500
	
	setTimeout(()=>{
		alerta.style.display='none';}, tempo)
};
	

// Faz requisição para cadastrar produto
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("adicionar_produto").addEventListener("click", function () {

        const form = document.getElementById("formulario_enviar");

        const formData = {
            codigo: form.querySelector('#codigo').value.trim(),
            imagem: form.querySelector('#imagemURL').value.trim(),
            nome: form.querySelector('#nomeProduto').value.trim(),
            valor: form.querySelector('#valor').value.trim(),
            descricao: form.querySelector('#descricao').value.trim(),
            categoria: form.querySelector('#genero').value.trim(),
        };

        // Verifica se todos os campos obrigatórios estão preenchidos
        for (const key in formData) {
            if (!formData[key]) {
                alert(`Por favor, preencha o campo: ${key}`);
                return;
            }
        }

 
        fetch("http://localhost:8080/api/produtos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            
            .then(response => {
                if (response.ok) {
                   mostrarAlertaCadastrar()
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert("Erro ao cadastrar produto: " + error.message);
            });
    });
});

	document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("update_produto").addEventListener("click", function() {
        const form = document.getElementById("formulario-update");
        
        const formData = {
            codigo: form.querySelector("#codigo-update").value,
            imagem: form.querySelector('#imagemURL-update').value.trim(),
            nome: form.querySelector('#nomeProduto-update').value.trim(),
            valor: form.querySelector('#valor-update').value.trim(),
            descricao: form.querySelector('#descricao-update').value.trim(),
            categoria: form.querySelector('#genero-update').value.trim(),
        };
        
        console.log(formData);
        
        // Verifica se todos os campos obrigatórios estão preenchidos
        for (const key in formData) {
            if (!formData[key]) {
                alert(`Por favor, preencha o campo: ${key}`);
                return;
            }
        }
        
        const codigo = formData.codigo; // Definindo a variável codigo
        
        fetch(`http://localhost:8080/api/produtos/${codigo}`, { 
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                mostrarAlertaCadastrar();
            } else {
                alert("Erro ao atualizar produto: " + response.statusText);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao atualizar produto: " + error.message);
        });
    });
});
