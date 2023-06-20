document.getElementById("formulario").addEventListener("submit", function(event){
    event.preventDefault();
    guardar();
});


function guardar(){
    var ver_tel = parseInt(document.getElementById("telefono").value)
    var ver_edad = parseInt(document.getElementById("edad").value)

    if (document.getElementById("nombre").value
        && document.getElementById("email").value
        && document.getElementById("telefono").value && !isNaN(ver_tel)
        && document.getElementById("edad").value && !isNaN(ver_edad)){
            db.collection("users").add({
                nombre: document.getElementById("nombre").value,
                email: document.getElementById("email").value,
                telefono: document.getElementById("telefono").value,
                edad: document.getElementById("edad").value,
                casado: document.getElementById("casado").value,
                hijos: document.getElementById("hijos").value,
                titulado: document.getElementById("titulado").value,
                especialidad: document.getElementById("especialidades").value,
                expectativa_economica: document.getElementById("price").value,
                años_experiencia: document.getElementById("experiencia").value
            })
            .then((docRef) => {
                alert("Registro exitoso")
                document.getElementById("formulario").reset();
                window.location.href = "#";
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert("Ocurrió un error en el registro")
            });
        } else{
            alert("Información inválida")
        }
    
}


console.log('hOLAA');