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
        <div class="infoProductoTicket">
        <p class="nombreProducto">${p.nombre} </p>
        <p>x${p.cantidad}</p>
        <p>$${subtotal}</p>
        </div>
        `
    });

    let fecha = new Date().toLocaleString();
    fechaTicket.textContent = fecha;
    localStorage.setItem("fecha", JSON.stringify(fecha)); // no se si deberia estar aca o en la de carrito


    clienteTicket.textContent = `Cliente: ${nombreDeCliente}`;
    totalTicket.textContent = `Total: $${total}`;

    productosTicket.innerHTML = html;
}
//<p></p>

mostrarProductosTicket();