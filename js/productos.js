let gridProductos = document.getElementById("gridProductos"); //contenedor de todos los productos
let url = "http://localhost:3500";
let productos = [];
let productosMostrados = []; /// Nuestro productos se rompe con los botones de navegacion, creando esta variable globa, siempre va a tener considearcion por los filtros a la hora de renderizar


// variable localsotrage
let nombreDeCliente = localStorage.getItem("nombreDeCliente");
document.getElementById("nombreCliente").textContent = nombreDeCliente ? `¡Hola ${nombreDeCliente}!` : `¡Hola invitado!`; //en donde se va a guardar el mensaje. Hola ...!

// FUNCION OBTENER LOS PRODUCTOS PARA QUE FUNCIONE TODO 
async function obtenerProductos(){
    try{
        console.log("Prueba de traer productos")
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
        posicion = 0;            // <<< lo cambie para reiniciar paginación al filtrar

    mostrarProductos(productoCoincidente);
});

// BOTON DE FILTRO DE PRODUCTOS - consolas y juegos
let botonParaConsolas = document.getElementById("botonConsolas");
botonParaConsolas.addEventListener("click", function(){
    let consolas = productos.filter(p => p.categoria === "consola"); ////LE SAQUE LA S SINO NO ME FUNCIONABA EN MI BD TENGO CONSOLA NO CONSOLAS
    posicion = 0;            // <<< lo cambie para reiniciar paginación al filtrar
    mostrarProductos(consolas);
});

// funciones generales de la vista
let botonParaJuegos = document.getElementById("botonJuegos");
botonParaJuegos.addEventListener("click", function(){
    let juegos = productos.filter(p => p.categoria === "juego"); ////LE SAQUE LA S SINO NO ME FUNCIONABA EN MI BD TENGO JUEGO NO JUEGOS
    posicion = 0;            // <<< lo cambie para reiniciar paginación al filtrar
    mostrarProductos(juegos);
});

let botonTodosProd = document.getElementById("botonTodo")
botonTodosProd.addEventListener("click", function(){
    posicion = 0;            // <<< lo cambie para reiniciar paginación al filtrar
    mostrarProductos(productos);
})

///paginacion

let posicion = 0; //de donde empieza que despues va a incrementar cuando se seleccione la flechita
let limiteAMostrar = 4; //limite de productos a mostrar para paginacion
let arrayActual = productos;

function mostrarProductos(array){
    arrayActual = array;  // cada vez que se llama a mostrar productos, actualiza el array actual

    let productosActivos = arrayActual.filter(p => p.activo === 1); //filtra lo que esta activo antes de paginacion
    let productosAMostrar = productosActivos.slice(posicion, posicion + limiteAMostrar); // basicamente corta desde la posicion hasta el limite a mostrar

    let htmlProductos = ""; //para mostrar ativos
    productosAMostrar.forEach( p => {
        htmlProductos += `
            <div class="cartaProducto">
                <img class="productoImagen"src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p>$${p.precio}</p>
                <button class="productoBoton" onclick="agregarACarrito(${p.id}, ${p.activo})">Agregar al carrito</button>
            </div>`; 
        });

// NO SE SI OBLIGATORIAMENTE NO SE TIENE Q MOSTRAR EL PROD , o que con no hay stock tabien

            //aca solo muestra los productos hasta "limite" puesto
    gridProductos.innerHTML = htmlProductos !== "" ? htmlProductos : `<p>No se encontraron productos</p>`;
}


//esto es para la paginacion
let botonAtras = document.getElementById("botonAtras");
let botonSiguiente = document.getElementById("botonSiguiente");

//////////////////////////////////
botonAtras.addEventListener("click",function(){
    if (posicion >= limiteAMostrar) {
        posicion -= limiteAMostrar;
        mostrarProductos(arrayActual);   ///lo cambie para que tome en cuenta los filtros

    }
});

botonSiguiente.addEventListener("click", function() {
    if (posicion + limiteAMostrar < arrayActual.length) {
        posicion += limiteAMostrar;
        mostrarProductos(arrayActual);  //lo cambie para que tome en cuenta los filtros
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
document.addEventListener("DOMContentLoaded", init); /// INICIO DE TODO EL JS CUANDO CARGA EL DOCUEMNTO
