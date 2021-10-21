const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
let ToUser = document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between")[0]; //Identifico barra superior que contiene las opciones (prod,cat,etc)
ToUser.removeChild(ToUser.lastElementChild); //Elimino el último hijo agregado al div (que es la opción "Mi carrito" y se agrega al menú desplegable)

let content = ToUser.innerHTML; //Extraigo contenido del elemento


if (localStorage.getItem('user')!="" && localStorage.getItem('password')!=""){//Almaceno el usuario, según modo de autenticación empleado
  var user=localStorage.getItem('user') //En caso de que haya usuario y contraseña en el formulario
}else{ 
  var user=localStorage.getItem('Guser')
}



//Agrego al contenido extraido un elemento span que contendrá el nombre de usuario
 content+= `<div class="dropdown">
 <a class="btn btn-secondary dropdown-toggle, d-none d-md-inline-block" id="User" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <img class="circular--square" src="img/user.png" /> ${user} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
 </a>

 <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
   <a class="dropdown-item" id="ToCart" href="cart.html">Mi carrito</a>
   <a class="dropdown-item" id="ToProfile" href="my-profile.html">Mi perfil</a>
   <a class="dropdown-item" id="ToLogin" href="login.html">Cerrar sesión</a>
 </div>`;
 ToUser.innerHTML = content; //Redefino el contenido en la barra superior, incluyendo el usuario
 
});