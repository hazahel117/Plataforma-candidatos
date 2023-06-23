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

var columnas = ['nombre', 'especialidad', 'email', 'telefono','edad','casado','hijos','titulado','años_experiencia'];

//variable que almacena la referencia de la colección 
//var collecRef = db.collection("users");



var seleccion = document.getElementById('buscador');
var buscarNombre = document.getElementById('input-nombre');
var nombreBuscar = document.getElementById("buscar-nombre");

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

var leerDatos = function(){
    var filasLength = filas.length;
    for (var i = filasLength - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }
    var opcSeleccionada = seleccion.value;
    if (opcSeleccionada == "Todos"){
        db.collection("users").orderBy("nombre").get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                var datos = doc.data();
                console.log(doc.id, " => ", doc.data());
                mostrar(datos);
                
            });
        });
    }else{
        db.collection("users").where("especialidad", "==", opcSeleccionada).get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                var datos = doc.data();
                mostrar(datos);
            });
        });
    }
}

auth.onAuthStateChanged(user =>{
    if(user){
        mostrarInfo();

        seleccion.addEventListener('change',leerDatos);

        //nombreBuscar.addEventListener('click', buscar());

        console.log('signin');
    }else{
        ocultarInfo();
        seleccion.removeEventListener('change',leerDatos());
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
        celda.innerHTML = datos[columna];
    }
    /*db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });*/
    
}


function buscar(){
    console.log('buscando');
    var nombreABuscar = document.getElementById("input-nombre").value;
    var filasLength = filas.length;
    for (var i = filasLength - 1; i > 0; i--) {
        console.log(i)
        tabla.deleteRow(i);
    }

    db.collection("users")
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