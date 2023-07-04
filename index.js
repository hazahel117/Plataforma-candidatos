document.addEventListener('DOMContentLoaded', function() {
            
  let container = document.getElementById('container');
  let html=''
  db.collection("vacantes_disponibles").orderBy("orden", "asc").get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
          var datos = doc.data();
          console.log(datos.nombre);
          if  (datos.orden == '1'){
            html +=`<div class='vacante orden1'>
                  <label>${datos.nombre}</label>
              </div>`;
          }else if (datos.orden == '2'){
          html +=`<div class='vacante orden2'>
                  <label>${datos.nombre}</label>
              </div>`;
          }else if (datos.orden == '3'){
            html +=`<div class='vacante orden3'>
                    <label>${datos.nombre}</label>
                </div>`;
            }
      });
      container.innerHTML = html;
      var buttons = document.getElementsByClassName('vacante');

      var redirectToLink = function() {
          window.location.href = 'form.html';
          
      };

      for (var i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener('click', redirectToLink);
      }
  });
});

