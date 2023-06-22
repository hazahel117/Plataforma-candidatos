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
var collecRef = db.collection("users");

//var query = collecRef.where("especialidad", "==", document.getElementById("buscador").value);


var seleccion = document.getElementById('buscador')
var buscarNombre = document.getElementById('input-nombre')

seleccion.addEventListener('change',function(){
    var filasLength = filas.length;
    for (var i = filasLength - 1; i > 0; i--) {
        console.log(i)
        tabla.deleteRow(i);
    }
    var opcSeleccionada = seleccion.value;
    if (opcSeleccionada == "Todos"){
        db.collection("users").orderBy("nombre").get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                var datos = doc.data();
                
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
})



/*db.collection("users").where("especialidad", "==", document.getElementById("buscador").value).get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
        var datos = doc.data();
        mostrar(datos);
    });
});*/


function mostrar(datos){
    
    //var cuerpoTabla = document.getElementById('tabla-body');
    
    
    /*for (var i = 0; i < datos.length; i++) {
        var fila = '<tr>';
        for (var j = 0; j < columnas.length; j++) {
          var columna = columnas[j];
          fila += '<td>' + datos[i][columna] + '</td>';
        }
        fila += '</tr>';
        cuerpoTabla.innerHTML += fila;
      }*/

    
    var fila = tabla.insertRow();

    
    for (var i = 0; i < columnas.length; i++) {
        var columna = columnas[i];
        var celda = fila.insertCell();
        celda.innerHTML = datos[columna];
    }

    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
    
}


function buscar(){
    var nombreBuscar = document.getElementById("input-nombre").value;
    var filasLength = filas.length;
    for (var i = filasLength - 1; i > 0; i--) {
        console.log(i)
        tabla.deleteRow(i);
    }

    db.collection("users")
    .where("nombre","==", nombreBuscar)
    //.where("nombre","<",nombreBuscar)
    .get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            var datos = doc.data();
            
            mostrar(datos);
            
        });
    });
}