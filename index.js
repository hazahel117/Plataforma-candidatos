const price = document.querySelector('#price')
const output = document.querySelector('.price-output')

output.textContent = price.value

price.addEventListener('input', function() {
  output.textContent = price.value
});

function mostrarPreguntas() {
    var opcionSeleccionada = document.getElementById("especialidades").value;
    var preguntas = document.getElementsByClassName("pregunta");
    
    // Ocultar todas las preguntas
    for (var i = 0; i < preguntas.length; i++) {
      preguntas[i].style.display = "none";
    }
    
    // Mostrar la pregunta correspondiente a la opción seleccionada
    var preguntaMostrar = document.getElementById(opcionSeleccionada + "_pregunta");
    preguntaMostrar.style.display = "block";
}

