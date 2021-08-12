//Al cargar el index este script verifica que hayan datos de usuario y contraseña almacenados en la sesión

document.addEventListener("DOMContentLoaded", function(e){
  if (!(sessionStorage.getItem('user') && sessionStorage.getItem('password'))) {
      window.location.href = "login.html"; //En caso de que no hayan datos de sesión redirige al login
    } else if (!sessionStorage.getItem('Guser')&& sessionStorage.getItem('Gpassword')){
      window.location.href = "login.html"; //En caso de que no hayan datos de sesión redirige al login
      }
  });