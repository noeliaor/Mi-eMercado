//Al cargar el index este script verifica que hayan datos de usuario y contraseña (o email para caso Google) almacenados en la sesión

document.addEventListener("DOMContentLoaded", function(e){
 var bool1 = Boolean(localStorage.getItem('user') && localStorage.getItem('password')); //¿Hay datos de usuario y contraseña en el formulario?
 var bool2 = Boolean(localStorage.getItem('Guser') && localStorage.getItem('Gmail')); //¿Se inició sesión con Google?

  if (!(bool1 || bool2)) {
    window.location.href = "login.html"; //En caso de que no hayan datos de sesión redirige al login
  }
  });