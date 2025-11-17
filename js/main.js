
/**
 * claramente no va a funcionar nada no hay ninguna peticion vinculada en el back
 * 
 * ********
 */


let formulario = document.getElementById("formIngreso"); //del login el nombre
let inputNombre = document.getElementById("inputNombre"); //nombre ingresado


formulario.addEventListener("submit", function (event) {
    if (inputNombre.value.trim().length < 3) { //si no elimina los espacios los toma como caracter
        event.preventDefault(); 
        alert("Ingrese un nombre correcto");
        return;
    }
});

//vista de productos
let filtroPorTexto = document.getElementById("inputTexto");//filtro busqueda
filtroPorTexto.addEventListener("keyup",function(){
/* PUNTO 4 
Manejo el input del html desde js. Se le tiene que agregar un "escuchador de evento" y ejecuta:
A medida que el usuario vaya ingresando letras/palabras, estas se van a guardar en una variable
En otra variable lo que se va a hacer es filtrar con .filter() los productos que coincidan en este caso, con el nombre,
se usa el metodo includes(), ya que no necesariamente tiene que escribir la palabra completa para que filtre el producto
Y se va mostrando los productos actualizados
*/
    let palabraABuscar = filtroPorTexto.value.toLowerCase(); // se guarda en una variable lo que ingresa el usuario por input
    let productoCoincidente = frutas.filter(p => p.nombre.toLowerCase().includes(palabraABuscar));
    mostrarProductos(productoCoincidente);
});
function mostrarProductos(array){
/* punto 3
Recibe por parametro un array con el cual aplicara el metodo forEach para que se recorra y poder acceder a sus datos
Con estos crear un div que se incluira al html, con el detalle de cada producto, imagen,nombre y precio
*/
    infoDeProducto = "";
    array.forEach(p => {
        infoDeProducto += `
        <div class="card-producto">
            <img src="${p.ruta_img}" alt="">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button id="botonAgregar"onclick="agregarACarrito(${p.id})">Agregar al carrito</button>
        </div>
        `;
    });
    listadoProductos.innerHTML = infoDeProducto;
    //localStorage
}