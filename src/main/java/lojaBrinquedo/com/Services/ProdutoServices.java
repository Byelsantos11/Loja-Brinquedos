package lojaBrinquedo.com.Services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lojaBrinquedo.com.Model.Produtos;
import lojaBrinquedo.com.Repository.ProdutoRepository;



@Service
public class ProdutoServices {
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	public List<Produtos> listarBrinquedo() {
		return produtoRepository.findAll();
	}
	
	public Produtos buscarCodigo(String codigo) {
		return produtoRepository.findById(codigo).orElse(null);
	};
	
	public Produtos adicionarProduto(Produtos produto) {
		return produtoRepository.save(produto);
	}
	
	public void deletarProduto(String codigo) {
		produtoRepository.deleteById(codigo);
	}
	
	public Produtos editarProduto(String codigo, Produtos produtoAtualizado) {
	    Produtos produtoExistente = buscarCodigo(codigo);
	    if (produtoExistente != null) {
	        produtoExistente.setImagem(produtoAtualizado.getImagem());
	        produtoExistente.setNome(produtoAtualizado.getNome());
	        produtoExistente.setValor(produtoAtualizado.getValor());
	        produtoExistente.setDescricao(produtoAtualizado.getDescricao());
	        produtoExistente.setCategoria(produtoAtualizado.getCategoria());
	        return produtoRepository.save(produtoExistente);
	    }
	    return null; 
	}
	
	
	public List<Produtos> selecionarProduto(String categoria){
		return produtoRepository.findByCategoria(categoria);
	}

				
}  