
let form =document.getElementById("formulario")
form.addEventListener("submit", function(event){
    event.preventDefault();
    guardar();
});


document.addEventListener('DOMContentLoaded', function() {
            
    let vacantes = document.getElementById('especialidades');
    let html=''
    db.collection("vacantes").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            var datos = doc.data();
            console.log(datos.nombre);
            html +=`<option value="${datos.nombre}">
                    ${datos.nombre}
                </option>`;
        });
        vacantes.innerHTML = html;
    });
});


/*const addDoc = async({ collection, data }) =>{
    //Una colección
    let collectionRef = firebase.firestore().collection(collection);
    //Guardar el documento
    collectionRef.add(data);
}*/

const upload = async ({ file }) =>{
    let timestamp = Date.now();
    console.log(timestamp);
    nombre = document.getElementById("nombre").value;
    let nombreUnico = `${timestamp}_${nombre}`;
    console.log(nombreUnico);
    //Referencia al espacio en el bucket donde estará el archivo
    let storageRef = firebase.storage().ref().child(`archivos/${nombreUnico}`);
    //Subir el archivo
    await storageRef.put(file);
    //Retornar la referencia
    return storageRef;
}

const publish = async({ file }) => {
    let storageRef = await upload({file});
    return storageRef.fullPath;
    //return addDoc({ collection: 'users', data: {path: storageRef.fullPath}})
}

async function guardar(){
    var ver_tel = parseInt(document.getElementById("telefono").value)
    var ver_edad = parseInt(document.getElementById("edad").value)
    var ver_experiencia = parseInt(document.getElementById("experiencia").value)
    var ver_cedula = parseInt(document.getElementById("cedula").value)

    if (document.getElementById("nombre").value
        && document.getElementById("email").value
        && document.getElementById("telefono").value && !isNaN(ver_tel)
        && document.getElementById("edad").value && !isNaN(ver_edad)
        && document.getElementById("licenciatura").value
        && document.getElementById("experiencia").value && !isNaN(ver_experiencia)
        && document.getElementById("experiencia").value && !isNaN(ver_cedula)){

            let fileInput = form.querySelector("#archivo");
            let file = fileInput.files[0];
            
            try{
                let path = await publish({ file });
                db.collection("candidatos").add({
                    nombre: document.getElementById("nombre").value,
                    email: document.getElementById("email").value,
                    telefono: document.getElementById("telefono").value,
                    edad: document.getElementById("edad").value,
                    licenciatura: document.getElementById("licenciatura").value,
                    años_experiencia: document.getElementById("experiencia").value,
                    casado: document.getElementById("casado").value,
                    hijos: document.getElementById("hijos").value,
                    titulado: document.getElementById("titulado").value,
                    cedula: document.getElementById("cedula").value,
                    especialidad: document.getElementById("especialidades").value,
                    manejo_autocad: document.getElementById("opciones").value,
                    expectativa_economica: document.getElementById("price").value,
                    path: path,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
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
            } catch (error) {
                console.error("Error uploading file: ", error);
                alert("Ocurrió un error al subir el archivo");
              }
            
            
        } else{
            alert("Información inválida");
        }
    
}


console.log('hOLAA');