let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let fecha = JSON.parse(localStorage.getItem("fecha"));
let nombreDeCliente = localStorage.getItem("nombreDeCliente");

let totalGlobal = 0;

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
    totalGlobal = 0;
    console.table(carrito);
    carrito.forEach( p => {
        let subtotal = p.precio * p.cantidad;
        totalGlobal += subtotal;

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
    totalTicket.textContent = `Total: $${totalGlobal}`;

    productosTicket.innerHTML = html;
}

descargarPdf.addEventListener("click", function() {
    alert("Descargando ticket en formato PDF");
});

descargarExcel.addEventListener("click", function(){
    alert("Descargando ticket en formto EXCEL");
});

finalizarCompra.addEventListener("click", async function(){
    
    if (totalGlobal <= 0) {
        alert("No se puede finalizar la compra con un total de $0.");
        return;
    }

    // LLAMO A LA API DEL BACKEND PARA CREAR LA VENTA
    try {
        const response = await fetch("http://localhost:3500/api/ventas/crear", {
            
            method: "POST", // CREO METODO POST 
            
            headers: {
                "Content-type" : "application/json", // INDICO QUE ENVIO JSON
            },
            
            body: JSON.stringify({
                nombre_usuario: nombreDeCliente,
                monto_total: totalGlobal,
                carrito: carrito 
            })
        });
        // MANEJO DE ERRORES DE LA API
        if (!response.ok) { 
            let result = await response.json(); 
            console.error("Error al registrar la venta:", result); 
            alert(`No se pudo registrar la venta: ${result.message || 'Error desconocido'}`); 
            return;
        }
        //EXITO
        const data = await response.json();
        console.log("Venta registrada con éxito. ID:", data.ventaId);
        
        // VACIAR EL CARRITO DEL LOCAL STORAGE AL COMPRAR!!
        localStorage.removeItem("carrito"); // ¡Vaciar el carrito!
        
        alert(`¡Gracias ${nombreDeCliente}! Compra finalizada. N° Venta: ${data.ventaId}`);

    } catch(error) { 
        console.error("Error de conexión o al procesar la solicitud:", error);
        alert("Error al conectar con el servidor. Verifique si el Back-end está corriendo.");
        return;
    }

    // VOLVER AL INDEX SOLO SI SALIO TODO OK
    window.location.href = `index.html`; 
});

mostrarProductosTicket();