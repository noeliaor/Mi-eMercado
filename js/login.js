//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var AccessButton = document.getElementsByClassName("AccessButton")[0];

document.addEventListener("DOMContentLoaded", function (e) {

  AccessButton.addEventListener("click", () => {
    var Googleuser = sessionStorage.getItem('Guser');
    var Googlepassword = sessionStorage.getItem('Gpassword');
    var Txtuser = document.getElementById('datauser').value;
    var Txtpassword = document.getElementById('datapassword').value;

    if ((Txtuser && Txtpassword) || (Googleuser && Googlepassword)) { //De haber datos de usuario Y contraseña los almacena como objeto de la sesión
      window.location.href = "index.html";                             //redirige al index//página inicial de la tienda
      sessionStorage.setItem('user', Txtuser);
      sessionStorage.setItem('password', Txtpassword);

      
    }
    else {
      alert("Debes completar todos los campos.")
    }

  })
});