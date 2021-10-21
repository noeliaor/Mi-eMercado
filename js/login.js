//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var AccessButton = document.getElementsByClassName("AccessButton")[0];

document.addEventListener("DOMContentLoaded", function (e) {
  localStorage.clear(); //Cada vez que se ingresa al login limpio los datos de sesión almacenados;
  TxtUser="";
  Txtpassword="";
  let information = [{ names:"", lastnames: "", age:"", email:"", telnum:""}]; //Cuando se ingresa a la página por primera vez la información del perfil está vacía
 localStorage.setItem('Profileinfo', JSON.stringify(information));//El item de la información también tiene los campos nulos
  AccessButton.addEventListener("click", () => { //Al presionar en el botón de ingreso:
    //Se extraen los datos que permiten autenticar la sesión, puede ser mediante Google o directamente desde la página:

    var Txtuser = document.getElementById('datauser').value;//Ingreso directo en la página
    var Txtpassword = document.getElementById('datapassword').value;

    var Googleuser = localStorage.getItem('Guser');//Autenticación con Google
    var Googlemail = localStorage.getItem('Gmail'); //NOTA: contraseña es una denominación, 
                                                              //se almacena el email.

    if (Boolean((Txtuser && Txtpassword)) || Boolean((Googleuser && Googlemail))) {  //Controlo que se haya realizado alguna de las autenticaciones
      window.location.href = "index.html"; //si se autenticó redirige al index (página inicial de la tienda)
      
      localStorage.setItem('user', Txtuser); //Almacena como datos de sesión el usuario y contraseña ingresados en el formulario de la página.
      localStorage.setItem('password', Txtpassword);

    }
    else {
      alert("Debes completar todos los campos.") //
    }

  })
});