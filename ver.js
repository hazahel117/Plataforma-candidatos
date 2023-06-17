function ver(){
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("mostrar-nombre").innerHTML=`${doc.data().nombre}`
            document.getElementById("mostrar-email").innerHTML=`${doc.data().email}`
            document.getElementById("mostrar-telefono").innerHTML=`${doc.data().telefono}`
            document.getElementById("mostrar-edad").innerHTML=`${doc.data().edad}`
            document.getElementById("mostrar-hijos").innerHTML=`${doc.data().hijos}`
            document.getElementById("mostrar-casado").innerHTML=`${doc.data().casado}`
            document.getElementById("mostrar-titulado").innerHTML=`${doc.data().titulado}`
        });
    });
}