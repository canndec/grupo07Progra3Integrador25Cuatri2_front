let temaActual = localStorage.getItem("tema"); //

let botonTema = document.getElementById("botonTema"); //modo oscuro
let body = document.querySelector("body");

//modo oscuro 
if (temaActual === "temaOscuro") {
    body.classList.add("temaOscuro"); //si estaba en oscuro mantenerlo
}
//si se toca el boton cambiarlo
botonTema.addEventListener("click", function (){
    oscuroActivo = body.classList.toggle("temaOscuro"); //empieza a usar esa clase .temaOscuro -> adapta a otras clases/id
    //localStorage para que se mantenga al refreskar
    if (oscuroActivo) {
        localStorage.setItem("tema","temaOscuro");
    } else {
        localStorage.setItem("tema", "");
    }
});