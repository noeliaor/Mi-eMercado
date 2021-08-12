// Render Google Sign-in button
function renderButton() {
    gapi.signin2.render('gSignIn', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

// Sign-in success callback
function onSuccess(googleUser) {
    // Get the Google profile data (basic)
    //var profile = googleUser.getBasicProfile();

    // Retrieve the Google account data
    gapi.client.load('oauth2', 'v2', function () {
        var request = gapi.client.oauth2.userinfo.get({
            'userId': 'me'
        });
        request.execute(function (resp) {
            // Display the user details
            var profileHTML = '<h3>Bienvenido/a ' + resp.given_name + '! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>';
            profileHTML += '<img src="' + resp.picture + '"/><p><b>Nombre: </b>' + resp.name + '</p><p><b>Correo electrónico:</b>' + resp.email + '</p><p>';
            document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;

            document.getElementById("gSignIn").style.display = "none";
            document.getElementsByClassName("userContent")[0].style.display = "block";
        });
    });
}

// Sign-in failure callback
function onFailure(error) {
    //alert(error);
}

// Sign out the user
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


var Txtuser = resp.name;
var Txtpassword = resp.email;
if (Txtuser && Txtpassword) { //De haber datos de usuario Y contraseña los almacena como objeto de la sesión
    //redirige al index//página inicial de la tienda
    sessionStorage.setItem('user', Txtuser);
    sessionStorage.setItem('password', Txtpassword);
    window.location.href = "index.html";
}