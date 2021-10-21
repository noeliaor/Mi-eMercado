"use strict";
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    let information = JSON.parse(localStorage.getItem('Profileinfo')); //Al cargar el HTML se obtiene la información del perfil almacenada
    document.getElementsByClassName("show-info")[0].innerHTML = ` 
    <div id="toimage"> </div>
    <br></br>
<form>
  <div class="row">
    <div class="col">
    <label for="Names">Nombres:</label>
      <input type="text" id="names" class="form-control" value="${information[0].names}">
    </div>
    <div class="col">
    <label for="Last names">Apellidos: </label>
      <input type="text" id="lastnames" class="form-control"  value="${information[0].lastnames}">
    </div>
  </div>
  <p></p>
  <div class="row">
    <div class="col">
    <label for="Age">Edad:</label>
      <input type="number" id="age" class="form-control"  value="${information[0].age}">
    </div>
    <div class="col">
    <label for="Email">Email: </label>
      <input type="email" id="email" class="form-control" value="${information[0].email}">
    </div>
    <div class="col">
    <label for="number">Teléfono: </label>
      <input type="number" id="telnum" class="form-control"  value="${information[0].telnum}">
    </div>
  </div>
</form>
<p></p>
<button type="submit" id="changeinfo" class="btn btn-primary">Guardar datos</button>` //Contenido del HTML con valores dados por la información de la variable
    document.getElementById("changeinfo").addEventListener("click", () => { //Clickeo sobre el botón de guardar datos
        let namesinfo = document.getElementById("names").value; //Se almacenan valores del formulario
        let lastnamesinfo = document.getElementById("lastnames").value;
        let ageinfo = document.getElementById("age").value;
        let emailinfo = document.getElementById("email").value;
        let telnuminfo = document.getElementById("telnum").value;
        if (Boolean(namesinfo&&lastnamesinfo&&ageinfo&&emailinfo&&telnuminfo)){ //Si no hay campos vacíos
         information = [{ names: namesinfo, lastnames: lastnamesinfo, age: ageinfo, email: emailinfo, telnum: telnuminfo }]; //Completo la lista con el nuevo contenido
        localStorage.setItem('Profileinfo', JSON.stringify(information)); //Convierto y almaceno la información
        alert("Datos guardados correctamente.")
        }else{
          alert("Debes completar todos los campos.")
        }
        
    });
});
