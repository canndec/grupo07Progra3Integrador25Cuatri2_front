let formulario = document.getElementById("formIngreso"); //del login el nombre
let inputNombre = document.getElementById("inputNombre"); //nombre ingresado


formulario.addEventListener("submit", function (event) {
/**
 * 
 * variable patron: // ^: tiene que iniciar con lo que esta [A-Z]. +: puede erepetirse un caracter.
 * $: tiene que finalizar con un caracter del []. i: es lo mismo minuscula o mayuscula
 */
    let nombreIngresado = inputNombre.value.trim(); //para eliminar espacios raros, sino los toma como caracter
    let patron = /^[A-Z]+$/i; //que debe tener
    
    if(nombreIngresado.length < 3 || nombreIngresado.length > 20 || !patron.test(nombreIngresado)) { //test no aplica en string solo sobre regex(por eso lo usa patron)
        event.preventDefault();  //previene el envio por defecto del formulario
        alert("Ingrese un nombre correcto");
        return;
    }
}
);