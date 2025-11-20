let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let productosTicket = document.getElementById("productosTicket");

function mostrarProductosTicket(){
    html = "";

    carrito.forEach( p => {
        htm
        html += `
        <p>${p.nombre}</p>
        <p>${p.cantidad} - ${p.subtotal}</p>
        `
    });
    productosTicket.innerHTML = html;

}