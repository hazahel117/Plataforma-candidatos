/*var container = document.getElementById("container");


var datos = [
    { nombre: "John Doe", correo: "john@example.com" },
    { nombre: "Jane Smith", correo: "jane@example.com" },
    // Agrega más datos según sea necesario
  ];
*/

var cuerpoTabla = document.getElementById('tabla-body');
var tabla = document.getElementById('tablaDatos');
var filas = tabla.getElementsByTagName('tr');

var columnas = ['nombre', 'especialidad', 'email', 'telefono','edad','licenciatura','años_experiencia','casado','hijos','titulado','cedula','manejo_autocad','expectativa_economica','path'];

//variable que almacena la referencia de la colección 
//var collecRef = db.collection("users");



var seleccion = document.getElementById('buscador');
//seleccion.addEventListener('change',varLeerDatos);
var buscarNombre = document.getElementById('input-nombre');
var nombreBuscar = document.getElementById('buscar-nombre');
var buscarTitCed = document.getElementById('tituloCedula');

const ingresarForm = document.querySelector('#ingresar-form');

ingresarForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const ingresarEmail = document.querySelector('#ingresar-email').value;
    const ingresarContraseña = document.querySelector('#ingresar-contraseña').value;
     
    auth
    .signInWithEmailAndPassword(ingresarEmail, ingresarContraseña)
    .then(userCredential => {

            ingresarForm.reset();
            var myModal = document.getElementById('ingresarModal');
            var ingresarModal = bootstrap.Modal.getInstance(myModal);
            ingresarModal.hide();
            console.log("ingresar");
        })

})

const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() =>{
        console.log('Salir');
    });
});

async function queryFiles(){
    db.collection("files").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            var datos = doc.data();
            //console.log(datos);
            downloadPdf(datos);
        });
    });
    //return downloadPdf(datos);
}
//queryFiles();

async function downloadPdf (docData){
    let url = await firebase.storage().ref(docData.path).getDownloadURL();
    //console.log(url);
    return url;
}

function leerDatos(){
    
    var filasLength = filas.length;
    for (var i = filasLength - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }
    var opcSeleccionada = seleccion.value;
    
    if (opcSeleccionada == "Todos"){
        db.collection("candidatos").orderBy("nombre").get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                var datos = doc.data();
                console.log(doc.id, " => ", doc.data());
                mostrar(datos);
                
            });
        });
    }else{
        db.collection("candidatos").where("especialidad", "==", opcSeleccionada).get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                var datos = doc.data();
                mostrar(datos);
            });
        });
    }
}
//var varLeerDatos = leerDatos();

auth.onAuthStateChanged(user =>{
    if(user){
        mostrarInfo();
        leerDatos();
        //seleccion.addEventListener('change',varLeerDatos);
        //nombreBuscar.addEventListener('click', buscar());
        seleccion.addEventListener('change',leerDatos);
        buscarTitCed.addEventListener('click', buscarTituloCedula);
        nombreBuscar.addEventListener('click',buscar);
        console.log('signin');
    }else{
        ocultarInfo();
        seleccion.removeEventListener('change',leerDatos);
        buscarTitCed.removeEventListener('click', buscarTituloCedula);
        nombreBuscar.removeEventListener('click',buscar);
        console.log('signout');
    }
});



 

/*db.collection("users").where("especialidad", "==", document.getElementById("buscador").value).get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
        var datos = doc.data();
        mostrar(datos);
    });
});*/


function mostrar(datos){

    var fila = tabla.insertRow();

    
    for (var i = 0; i < columnas.length; i++) {
        var columna = columnas[i];
        var celda = fila.insertCell();
        
        if (columna == 'path'){
            downloadPdf(datos)
                .then((url) =>{
                    console.log(url);
                    celda.innerHTML = `<a href=${url} target="_blank">CV</a>`
                })
                .catch((error) =>{
                    console.error(error);
                });
        }else{
            celda.innerHTML = datos[columna];
        }
    }
    
    
}
/*db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });*/
function buscarTituloCedula(){
    var nombreABuscar = document.getElementById("input-nombre").value;
    var filasLength = filas.length;
    for (var i = filasLength - 1; i > 0; i--) {
        console.log(i)
        tabla.deleteRow(i);
    }
    db.collection("candidatos")
    .where("titulado","==", "Sí")
    .where("cedula","!=", "0")
    .get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            var datos = doc.data();
            mostrar(datos);
            console.log("Buscando con titulo y cedula")
        });
    });
}

function buscar(){
    console.log('buscando');
    var nombreABuscar = document.getElementById("input-nombre").value;
    var filasLength = filas.length;
    for (var i = filasLength - 1; i > 0; i--) {
        console.log(i)
        tabla.deleteRow(i);
    }

    db.collection("candidatos")
    .where("nombre","==", nombreABuscar)
    //.where("nombre","<",nombreABuscar)
    .get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            var datos = doc.data();
            mostrar(datos);
        });
    });
}
function mostrarInfo(){
    document.getElementById('buscador1').style.display='block';
    document.getElementById('tabla-container').style.display='block';
    document.getElementById('logout1').style.display='none';
    document.getElementById('login').style.display='none';
    document.getElementById('logout').style.display='block';
}
function ocultarInfo(){
    document.getElementById('buscador1').style.display='none';
    document.getElementById('tabla-container').style.display='none';
    document.getElementById('logout1').style.display='block';
    document.getElementById('login').style.display='block';
    document.getElementById('logout').style.display='none';

}
