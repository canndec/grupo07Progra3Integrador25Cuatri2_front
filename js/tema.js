let temaActual = localStorage.getItem("tema"); //

let botonTema = document.getElementById("botonTema"); //modo oscuro
let body = document.querySelector("body");

//modo oscuro 
botonTema.addEventListener("click", function (){
    oscuroActivo = body.classList.toggle("temaOscuro"); //empieza a usar esa clase .temaOscuro -> adapta a otras clases/id
    //localStorage para que se mantenga al refreskar

});
