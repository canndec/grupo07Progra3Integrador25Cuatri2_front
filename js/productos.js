let gridProductos = document.getElementById("gridProductos"); //contenedor de todos los productos
let url = "http://localhost:3500";
let productos = [];

// variable localsotrage
let nombreDeCliente = localStorage.getItem("nombreDeCliente");
document.getElementById("nombreCliente").textContent = nombreDeCliente ? `¡Hola ${nombreDeCliente}!` : `¡Hola invitado!`; //en donde se va a guardar el mensaje. Hola ...!

// FUNCION OBTENER LOS PRODUCTOS PARA QUE FUNCIONE TODO 
async function obtenerProductos(){
    try{
        console.log("pruebaprueba")
        let response = await fetch(`${url}/api/productos`);
        console.log(`Solicitud fetch GET a ${url}/api/productos`);

        let data = await response.json();
        productos = data.payload;
        console.log(productos);

        mostrarProductos(productos);
    }catch(error){
        console.error(`Error obteniendo productos ${error}`);
    }
}
// FILTRO DE HEADER  - busqueda de producto
let filtroPorTexto = document.getElementById("inputFiltro");//filtro busqueda
filtroPorTexto.addEventListener("keyup",function(){

    let palabraABuscar = filtroPorTexto.value.toLowerCase(); // se guarda en una variable lo que ingresa el usuario por input
    let productoCoincidente = productos.filter(p => p.nombre.toLowerCase().includes(palabraABuscar));
    mostrarProductos(productoCoincidente);
});

// BOTON DE FILTRO DE PRODUCTOS - consolas y juegos
let botonParaConsolas = document.getElementById("botonConsolas");
botonParaConsolas.addEventListener("click", function(){
    let consolas = productos.filter(p => p.categoria === "consola"); ////LE SAQUE LA S SINO NO ME FUNCIONABA EN MI BD TENGO CONSOLA NO CONSOLAS
    mostrarProductos(consolas);
});

// funciones generales de la vista
let botonParaJuegos = document.getElementById("botonJuegos");
botonParaJuegos.addEventListener("click", function(){
    let juegos = productos.filter(p => p.categoria === "juego"); ////LE SAQUE LA S SINO NO ME FUNCIONABA EN MI BD TENGO JUEGO NO JUEGOS
    mostrarProductos(juegos);
});

let botonTodosProd = document.getElementById("botonTodo")
botonTodosProd.addEventListener("click", function(){
    mostrarProductos(productos);
})



let posicion = 0; //de donde empieza que despues va a incrementar cuando se seleccione la flechita
let limiteAMostrar = 4; //limite de productos a mostrar para paginacion

function mostrarProductos(array){

    let limiteProductos = array.slice(posicion, posicion + limiteAMostrar); // basicamente corta desde la posicion hasta el limite a mostrar

    let htmlProductos = limiteProductos.map( p =>`
        <div class="cartaProducto">
            <img class="productoImagen"src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <p> ${hayStock(p.activo)}</p>  
            <button class="productoBoton" onclick="agregarACarrito(${p.id}, ${p.activo})">Agregar al carrito</button>
        </div>`).join(""); 

// NO SE SI OBLIGATORIAMENTE NO SE TIENE Q MOSTRAR EL PROD , o que con no hay stock tabien

            //aca solo muestra los productos hasta "limite" puesto
    gridProductos.innerHTML = htmlProductos !== "" ? htmlProductos : `<p>No se encontraron productos</p>`;
}
function hayStock(activo){
    return activo == 1 ? `Disponible` : `No hay stock`;
}

//esto es para la paginacion
let botonAtras = document.getElementById("botonAtras");
let botonSiguiente = document.getElementById("botonSiguiente");

//////////////////////////////////
botonAtras.addEventListener("click",function(){
    if (posicion >= limiteAMostrar) {
        posicion -= limiteAMostrar;
        mostrarProductos(productos);
    }
});

botonSiguiente.addEventListener("click", function() {
    if (posicion + limiteAMostrar < productos.length) {
        posicion += limiteAMostrar;
        mostrarProductos(productos);
    }
});


/////////// CARRITO SSSSSSSSS///////////

let carrito = []; //array que contiene los elmentos que se agregan a carrito
let cantidadProducto = []; 

let botonCarrito = document.getElementById("botonCarrito");
botonCarrito.addEventListener("click", () => {
    window.location.href = "carrito.html"; //cambia de vista
});

function agregarACarrito(id,  activo) {
    let producto = productos.find(p => p.id == id); //hay producto con id
    if (!producto || activo === 0) return; //si no ta activo no agrega

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let existe = carrito.find(item => item.id == id);
    
    if (existe) {
        existe.cantidad++; //suma 1 al prod
    } else { //prod nuevo
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            categoria: producto.categoria,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito(); // <<< AGREGue el cCONTADOR!!

    console.log("Carrito actualizado", carrito);
}
window.agregarACarrito = agregarACarrito; //

function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById("contadorCarrito").textContent = total;
}



function init(){
    obtenerProductos();
    actualizarContadorCarrito(); // <<< AGREGUE el CONTADOR!! Y SAQUE LO QUE TENIAS ---nao nao

}
document.addEventListener("DOMContentLoaded", init); ///
