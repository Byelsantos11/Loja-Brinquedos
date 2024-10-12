package lojaBrinquedo.com.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import lojaBrinquedo.com.Model.Produtos;

public interface ProdutoRepository extends JpaRepository<Produtos, String> {
    List<Produtos> findByCategoria(String categoria);
}
