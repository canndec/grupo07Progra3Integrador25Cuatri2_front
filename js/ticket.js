let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let fecha = JSON.parse(localStorage.getItem("fecha"));
let nombreDeCliente = localStorage.getItem("nombreDeCliente");

let fechaTicket = document.getElementById("fechaTicket");
let productosTicket = document.getElementById("productosTicket");
let subtotalTicket = document.getElementById("subtotalTicket");
let totalTicket = document.getElementById("totalTicket");
let clienteTicket = document.getElementById("clienteTicket");

console.table(carrito);
function mostrarProductosTicket(){
    html = "";
    total = 0;
    console.table(carrito);
    carrito.forEach( p => {
        let subtotal = p.precio * p.cantidad;
        total += subtotal;

        html += `
        <div id="contenedorDeProducto">
        <p class="descripcionProducto">${p.nombre} </p>
        <p class="descripcionProducto">x${p.cantidad}  $${subtotal}</p>
        </div>
        `
    });
    
    //<p class="descripcionProducto"></p>
    let fecha = new Date().toLocaleString();
    fechaTicket.textContent = fecha;
    localStorage.setItem("fecha", JSON.stringify(fecha)); // no se si deberia estar aca o en la de carrito


    clienteTicket.textContent = `Cliente: ${nombreDeCliente.toUpperCase()}`;
    totalTicket.textContent = `Total: $${total}`;

    productosTicket.innerHTML = html;
}

mostrarProductosTicket();