//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var AccessButton = document.getElementsByClassName("AccessButton")[0];

document.addEventListener("DOMContentLoaded", function (e) {

  AccessButton.addEventListener("click", () => { //Al presionar en el botón de ingreso:
    //Se extraen los datos que permiten autenticar la sesión, puede ser mediante Google o directamente desde la página:

    
    var Googleuser = sessionStorage.getItem('Guser');//Autenticación con Google
    var Googlemail = sessionStorage.getItem('Gmail'); //NOTA: contraseña es una denominación, 
                                                              //se almacena el email.

   
    var Txtuser = document.getElementById('datauser').value;//Ingreso directo en la página
    var Txtpassword = document.getElementById('datapassword').value;

    if (Boolean((Txtuser && Txtpassword)) || Boolean((Googleuser && Googlemail))) {  //Controlo que se haya realizado alguna de las autenticaciones
      window.location.href = "index.html"; //si se autenticó redirige al index (página inicial de la tienda)
      
      sessionStorage.setItem('user', Txtuser); //Almacena como datos de sesión el usuario y contraseña ingresados en el formulario de la página.
      sessionStorage.setItem('password', Txtpassword);

    }
    else {
      alert("Debes completar todos los campos.") //
    }

  })
});