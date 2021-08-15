/*Este script proviene del siguiente link:
https://www.codexworld.com/login-with-google-account-using-javascript/ (Último acceso 15/8 17:18)
El código incluido en login.html para la autenticación de Google también se extrajo de allí.
*/

function renderButton() { //Crea un botón de inicio de sesión de Google con configuraciones personalizadas.
    gapi.signin2.render('gSignIn', {
        'width': 300,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function onSuccess(googleUser) { //Función de devolución de llamada una vez que se inicia sección,
                                //Obtiene los datos de la cuenta y los muestra en pantalla
    gapi.client.load('oauth2', 'v2', function () {
        var request = gapi.client.oauth2.userinfo.get({
            'userId': 'me'
        });
        request.execute(function (resp) {
            var profileHTML = '<h3>Bienvenido/a ' + resp.given_name + '!</h3>';
            profileHTML += '<p style="color:red">¡Presiona ingresar!</p>' + '<img src="' + resp.picture + '"/><p><b>Nombre: </b></p><p>' + resp.name + '</p><p><b>Correo electrónico:</b></p><p>' + resp.email + '</p> <a href="javascript:void(0);" onclick="signOut();">Cerrar sesión</a><p>';
           
            sessionStorage.setItem('Guser',  resp.name);  //Almaceno como datos de sesión el nombre y email, se emplean para verificar el ingreso en verification.js
            sessionStorage.setItem('Gmail', resp.email); 

            document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
            document.getElementById("gSignIn").style.display = "none";
            document.getElementsByClassName("userContent")[0].style.display = "block";
        });
    });
}

//Función llamada en el ingreso cuando no se logra iniciar correctamente
function onFailure(error) {
    alert("Hubo un error, intente nuevamente.\n Recuerde que sólo puede iniciar sesión con Google en la web: https://noeliaor.github.io/Mi-eMercado/");
}

//Cierra la sesión del usuario en la cuenta de Google.
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.getElementsByClassName("userContent")[0].innerHTML = '';
        document.getElementsByClassName("userContent")[0].style.display = "none";
        document.getElementById("gSignIn").style.display = "block";
        sessionStorage.clear();
    });

    auth2.disconnect();
}

