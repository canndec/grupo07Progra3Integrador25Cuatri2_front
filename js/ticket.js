let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let fecha = JSON.parse(localStorage.getItem("fecha"));
let nombreDeCliente = localStorage.getItem("nombreDeCliente");

let fechaTicket = document.getElementById("fechaTicket");
let productosTicket = document.getElementById("productosTicket");
let subtotalTicket = document.getElementById("subtotalTicket");
let totalTicket = document.getElementById("totalTicket");
let clienteTicket = document.getElementById("clienteTicket");

let descargarPdf = document.getElementById("descargarPdf");
let descargarExcel = document.getElementById("descargarExcel");
let finalizarCompra = document.getElementById("botonFinalizar"); 

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

descargarPdf.addEventListener("click", function() {
    alert("Descargando ticket en formato PDF");
});

descargarExcel.addEventListener("click", function(){
    alert("Descargando ticket en formto EXCEL");
});

finalizarCompra.addEventListener("click", function(){
    /*agregar info a tabla de bd . en ventas y ventas_productos
    - ventas: id, nombre_usuario, fecha, monto_total
    - ventas-productos: id_venta, id_producto*/
    window.location.href=`index.html`;
    
    /* TODO ESTO LO TENGO QUE HACER DESDE EL BACK ASI Q KEDA EN PAUSA ****
    let sqlVentas = `INSERT INTO ventas (nombre_usuario, fecha, monto_total) VALUES (?, ?, ?)`;
    return connection.query(sqlVentas, [nombreDeCliente,fecha,total]);
    let sqlVentasProductos = `INSERT INTO ventas_productos ()`*/
});
mostrarProductosTicket();