let formulario = document.getElementById("formIngreso"); //del login el nombre
let inputNombre = document.getElementById("inputNombre"); //nombre ingresado

formulario.addEventListener("submit", async function (event) {
    
    event.preventDefault();
    console.log("Submit detectado");
    
    let nombreIngresado = inputNombre.value.trim();
    
    // VALIDACIONES TUYAS 
    if (!validarCaracteresInput(nombreIngresado) || !validarTamañoInput(nombreIngresado)) {
        alert("Ingrese un nombre valido");
        return;
    }
    
    console.log("Validado correctamente:", nombreIngresado);
    
    
    //  HOLA SOY SANTIAGO -  HAGO EL FETCH PARA GUARDAR EL USUARIO EN LA BASE DE DATOS
    try {
        const response = await fetch("http://localhost:3500/api/usuarios/crear-sin-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombreIngresado,
                es_admin: 0
            })
        });
        
        if (!response.ok) {
            console.error("Error al guardar usuario:", await response.text());
            alert("No se pudo registrar el usuario en la base de datos");
            return;
        }
        
        const data = await response.json();
        console.log("Usuario guardado en BD:", data);
        
        // Guardar ID de usuario en localStorage
        localStorage.setItem("idUsuario", data.id);
        
    } catch (e) {
        console.error("Error en el fetch:", e);
        alert("Error al conectar con el servidor");
        return;
    }
    ////
    localStorage.setItem("nombreDeCliente", nombreIngresado);
    location.href = "productos.html";
});

function validarCaracteresInput(nombreIngresado){
    let patron = /^[A-Z]+$/i; 
    return patron.test(nombreIngresado); 
}

function validarTamañoInput(nombreIngresado){
    return nombreIngresado.length >= 3 && nombreIngresado.length <= 20;
}