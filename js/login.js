let formulario = document.getElementById("formIngreso"); //del login el nombre
let inputNombre = document.getElementById("inputNombre"); //nombre ingresado


formulario.addEventListener("submit", function (event) {
    if (inputNombre.value.trim().length < 3) { //si no elimina los espacios los toma como caracter
        event.preventDefault(); 
        alert("Ingrese un nombre correcto");
        return;
    }
});