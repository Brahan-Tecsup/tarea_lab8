// public/script.js
console.log("Script cargado correctamente");

const boton = document.getElementById('boton-saludo');
if (boton) {
    boton.addEventListener('click', () => {
        alert("¡Gracias por visitar mi portafolio!");
    });
}