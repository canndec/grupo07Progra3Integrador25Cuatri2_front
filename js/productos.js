//variables generales del js
let gridProductos = document.getElementById("gridProductos"); //contenedor de todos los productos
let url = "http://localhost:3500"; 
let productos = []; //para tener una variable donde cargan los productos

// variable localsotrage
let nombreDeCliente = localStorage.getItem("nombreDeCliente");
document.getElementById("nombreCliente").textContent = nombreDeCliente ? `¡Hola ${nombreDeCliente}!` : `¡Hola invitado!`; //en donde se va a guardar el mensaje. Hola ...!


// FUNCION OBTENER LOS PRODUCTOS PARA QUE FUNCIONE TODO 
async function obtenerProductos(){
    try{
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
    let consolas = productos.filter(p => p.categoria === "consolas");
    mostrarProductos(consolas);
});

let botonParaJuegos = document.getElementById("botonJuegos");
botonParaJuegos.addEventListener("click", function(){
    let juegos = productos.filter(p => p.categoria === "juegos");
    mostrarProductos(juegos);
});


// funciones generales de la vista
let posicion = 0; //de donde empieza que despues va a incrementar cuando se seleccione la flechita
let limiteAMostrar = 4; //limite de productos a mostrar para paginacion

function mostrarProductos(array){

    let limiteProductos = array.slice(posicion, posicion + limiteAMostrar); // basicamente corta desde la posicion hasta el limite a mostrar

    let htmlProductos = limiteProductos.map( p =>`
        <div class="cartaProducto">
            <img class="productoImagen"src="${p.imagen}" alt="${p.nombre}">
            <h3 class="productoNombre">${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button class="productoBoton" onclick="agregarACarrito(${p.id})">Agregar al carrito</button>
        </div>`).join(""); 
            //aca solo muestra los productos hasta "limite" puesto
        gridProductos.innerHTML = htmlProductos !== "" ? htmlProductos : `<p>No se encontraron productos</p>`;
        /*if(p.activo == 1){
        mostrarDetalles();
        }});*/
        //solo muestra los productos que estan activos
}


//esto es para la paginacion
let botonAtras = document.getElementById("botonAtras");
let botonSiguiente = document.getElementById("botonSiguiente");

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



let carrito = []; //array que contiene los elmentos que se agregan a carrito
let cantidadProducto = []; //array que contiene las cantidades x producto
/*
function agregarACarrito(indice) {
    console.log("llegaste");
    let productoSeleccionado = productos.find(p => p.id == indice);
    let indiceCantidad = carrito.findIndex(p => p.id == indice); //indice donde esta la cant del producto con id{indice}

    if(indiceCantidad === -1 ){ //osea que no encontro indice/no hay
        carrito.push(productoSeleccionado);
        cantidadProducto.push(1); //se pushean al mismo tiempo para coincidir los id
    }else{
        cantidadProducto[indiceCantidad] += 1; //solo suma en 1 la cantidad del producto
    }
    //console.log(`Se agrego un producto al carrito: ${productoSeleccionado.nombre}`);
    mostrarCarrito();
}


let listadoProdCarrito = document.getElementById("botonCarrito"); //productos que van al carrito
function mostrarCarrito(){
    cartaProductoCarrito = "";
    montoTotal = 0;
    carrito.forEach((producto,indice) => {
        montoTotal += producto.precio * cantidadProducto[indice];
        cartaProductoCarrito += `
        <li class="bloque-item">
            <p class="nombre-item">${producto.nombre} - $${producto.precio} - x${cantidadProducto[indice]}</p>
            <button class="boton-eliminar" onclick="eliminarProducto(${indice})">Eliminar</button>
        </li>
        `;
    });
    listadoProdCarrito.innerHTML = cartaProductoCarrito;
    //guardarLocalStorage();
    //document.getElementById("montoTotal").textContent = `Total: $${montoTotal}`;
}*/


function init(){
    obtenerProductos();
    mostrarProductos(productos)
}
init()