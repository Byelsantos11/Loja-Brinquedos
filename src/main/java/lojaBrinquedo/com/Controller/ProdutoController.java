package lojaBrinquedo.com.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lojaBrinquedo.com.Model.Produtos;
import lojaBrinquedo.com.Services.ProdutoServices;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
	
	@Autowired
	private ProdutoServices produtoService;
	
	@GetMapping
	public List<Produtos> listarBrinquedo() {
		return produtoService.listarBrinquedo();
	}
	
	@PostMapping
	public Produtos adicionarProduto(@RequestBody Produtos produto) {
		return produtoService.adicionarProduto(produto);
	}
	
	@DeleteMapping("/{codigo}")
	public ResponseEntity<Void> deletarProduto(@PathVariable String codigo) {
		produtoService.deletarProduto(codigo);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{codigo}")
	public ResponseEntity<Produtos> buscarProdutoPorCodigo(@PathVariable String codigo) {
		Optional<Produtos> produto = Optional.ofNullable(produtoService.buscarCodigo(codigo));
		return produto.map(ResponseEntity::ok)
		              .orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PutMapping("/{codigo}")
	public ResponseEntity<Produtos> editarProduto(@PathVariable String codigo, @RequestBody Produtos produto) {
		Produtos produtoAtualizado = produtoService.editarProduto(codigo, produto);
		if (produtoAtualizado != null) {
			return ResponseEntity.ok(produtoAtualizado);
		} else {
			return ResponseEntity.notFound().build(); 
		}
	}
	
	@GetMapping("/categoria/{categoria}")
	public ResponseEntity<List<Produtos>> listarPorCategoria(@PathVariable String categoria) {
		List<Produtos> produtos = produtoService.selecionarProduto(categoria);
		return ResponseEntity.ok(produtos);
	}
}
