function guardar(){
    db.collection("users").add({
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        edad: document.getElementById("edad").value,
        casado: document.getElementById("casado").value,
        hijos: document.getElementById("hijos").value,
        titulado: document.getElementById("titulado").value,
        especialidad: document.getElementById("especialidades").value,
        expectativa_economica: document.getElementById("price").value
    })
    .then((docRef) => {
        alert("Registro exitoso")
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Ocurrió un error en el registro")
    });
}


console.log('hOLAA');