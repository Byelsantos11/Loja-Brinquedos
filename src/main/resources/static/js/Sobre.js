const deivinho = document.getElementById("deivinho");
const flavinho = document.getElementById("flavinho");
const biel = document.getElementById("biel");
const PaginaDevid = document.getElementById("Devid");
const PaginaFlavio = document.getElementById("Flavio");
const PaginaGabryel = document.getElementById("Gabryel");
const fecharDevid=document.getElementById("FecharDevid")
const fecharFlavio=document.getElementById("FecharFlavio")
const fecharGabryel=document.getElementById("FecharGabryel")
const overlay = document.querySelector(".overlay"); 



//Devid

deivinho.addEventListener("click", function() {
    PaginaDevid.style.display = "block";
    overlay.style.display = 'block'; 
});


fecharDevid.addEventListener("click", function(){
    PaginaDevid.style.display="none"
    overlay.style.display = 'none'; 

})



//Flavio
flavinho.addEventListener("click", function() {
    PaginaFlavio.style.display = "block";
    overlay.style.display = 'block'; 
});


fecharFlavio.addEventListener("click", function(){
    PaginaFlavio.style.display="none"
    overlay.style.display = 'none';
})



//Gabryel

biel.addEventListener("click", function() {
    PaginaGabryel.style.display = "block";
    overlay.style.display = 'block'; 
});


fecharGabryel.addEventListener("click", function(){
    PaginaGabryel.style.display="none"
    overlay.style.display = 'none';
})













