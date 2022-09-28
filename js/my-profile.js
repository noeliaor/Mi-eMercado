"use strict";
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  let information = JSON.parse(localStorage.getItem('Profileinfo')); //Al cargar el HTML se obtiene la información del perfil almacenada
  document.getElementById("name-lastname").innerHTML= `<center><h4 style="color:#008CBA;">${information.names} ${information.lastnames}</h4></center>` //Muestro la información principal
  document.getElementsByClassName("show-info")[0].innerHTML = ` 
    <div id="toimage"> </div>
<form>
  <div class="row">
    <div class="col">
    <label for="Names">Nombres:</label>
      <input type="text" id="names" class="form-control" value="${information.names}">
    </div>
    <div class="col">
    <label for="Last names">Apellidos: </label>
      <input type="text" id="lastnames" class="form-control"  value="${information.lastnames}">
    </div>
  </div>
  <p></p>
  <div class="row">
    <div class="col">
    <label for="Age">Edad:</label>
      <input type="number" id="age" class="form-control"  value="${information.age}">
    </div>
    <div class="col">
    <label for="Email">Email: </label>
      <input type="email" id="email" class="form-control" value="${information.email}">
    </div>
    <div class="col">
    <label for="number">Teléfono: </label>
      <input type="number" id="telnum" class="form-control"  value="${information.telnum}">
    </div>
  </div>
</form>
<p></p>
<button type="submit" id="changeinfo" class="btn btn-primary">Guardar datos</button>` //Contenido del HTML con valores dados por la información almacenada inicialmente
                                                                                      
  document.getElementById("changeinfo").addEventListener("click", () => { //Clickeo en botón para guardar datos
    let namesinfo = document.getElementById("names").value; //Se almacenan valores del formulario
    let lastnamesinfo = document.getElementById("lastnames").value;
    let ageinfo = document.getElementById("age").value;
    let emailinfo = document.getElementById("email").value;
    let telnuminfo = document.getElementById("telnum").value;
    if (Boolean(namesinfo && lastnamesinfo && ageinfo && emailinfo && telnuminfo)) { //Si no hay campos vacíos
      information = { names: namesinfo, lastnames: lastnamesinfo, age: ageinfo, email: emailinfo, telnum: telnuminfo }; //Completo la lista con el nuevo contenido
      localStorage.setItem('Profileinfo', JSON.stringify(information)); //Convierto y almaceno la información
      document.getElementById("name-lastname").innerHTML=`
       <center><h4 style="color:#008CBA">${namesinfo} ${lastnamesinfo}</h4></center>`

      alert("Datos guardados correctamente.")

    } else {
      alert("Debes completar todos los campos.") //Si hay campos vacíos solicito que se completen todos los campos
    }

  });

  //Almacenamiento de la imagen en el local storage

  //Identifico elemento imagen
  let usericon = document.getElementById("image-to-storage");

    let imgCanvas = document.createElement("canvas"), //Creo elemento canvas
      imgContext = imgCanvas.getContext("2d");

    //Igualo ancho y altura
    imgCanvas.width = usericon.width;
    imgCanvas.height = usericon.height;

    // Draw image
    imgContext.drawImage(usericon, 0, 0, usericon.width, usericon.height);

    // Obtengo contenido canvas como HTML
    let imgAsDataURL = imgCanvas.toDataURL("image/png");

    //Guardo imagen en local storage
    try {
      localStorage.setItem("usericon", imgAsDataURL);
    }
    catch (e) {
      console.log("Storage failed: " + e);
    }
    //En el elemento figura sustituyo el contenido por la imagen almacenada en el localstorage
 document.getElementById("usericon").innerHTML=`<center> <img class="user-profile" src=${localStorage.getItem("usericon")} alt="User icon" border="0"></center>` //Una vez que se almacenó la imagen paso a mostrarla desde el localstorage
});
