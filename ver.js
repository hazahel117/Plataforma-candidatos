/*var container = document.getElementById("container");



var datos = [
    { nombre: "John Doe", correo: "john@example.com" },
    { nombre: "Jane Smith", correo: "jane@example.com" },
    // Agrega más datos según sea necesario
  ];
*/

var columnas = ['nombre', 'email', 'telefono','edad','casado','hijos','titulado','años_experiencia'];

db.collection("users").get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
        var datos = doc.data();
        mostrar(datos);
    });
});

function mostrar(datos){
    var tabla = document.getElementById('tablaDatos');
    var fila = tabla.insertRow();

    for (var i = 0; i < columnas.length; i++) {
        var columna = columnas[i];
        var celda = fila.insertCell();
        celda.innerHTML = datos[columna];
    }

    /*for (var key in datos){
        if(datos.hasOwnProperty(key)){
            var celda = fila.insertCell();
            celda.innerHTML = datos[key];
        }
    }*/
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
}

function ver(){
    container.style.display ="flex";

    /*
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("mostrar-nombre").innerHTML=`${doc.data().nombre}`
            document.getElementById("mostrar-email").innerHTML=`${doc.data().email}`
            document.getElementById("mostrar-telefono").innerHTML=`${doc.data().telefono}`
            document.getElementById("mostrar-edad").innerHTML=`${doc.data().edad}`
            document.getElementById("mostrar-hijos").innerHTML=`${doc.data().hijos}`
            document.getElementById("mostrar-casado").innerHTML=`${doc.data().casado}`
            document.getElementById("mostrar-titulado").innerHTML=`${doc.data().titulado}`
            document.getElementById("mostrar-experiencia").innerHTML=`${doc.data().años_experiencia}`
        });
    });*/
}