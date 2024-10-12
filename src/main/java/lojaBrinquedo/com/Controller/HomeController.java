package lojaBrinquedo.com.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("/")
	public String Home() {
		return "Home";
	}
	
	@GetMapping("/Home.html")
	public String Homezinho() {
		return "Home";
	}
	

	@GetMapping("/Catalogo.html")
	public String Catalogo() {
		return "Catalogo";
	}
	
	
	@GetMapping("/Adm.html")
	public String Adm() {
		return "Adm";
	}
	
	@GetMapping("/Sobre.html")
	public String Sobre() {
		return "Sobre";
	}
	
	@GetMapping("/Meninos.html")
	public String Meninos() {
	    return "Meninos";
	}

	@GetMapping("/Meninas.html")
	public String Meninas() {
	    return "Meninas"; 
	}

}