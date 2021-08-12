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

    var Googleuser = resp.name;
    var Googlepassword = resp.email;

    sessionStorage.setItem('Guser', Googleuser);
    sessionStorage.setItem('Gpassword', Googlepassword);

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
            var profileHTML = '<h3>Bienvenido/a ' + resp.given_name + '!</h3>';
            profileHTML += '<p style="color:red">¡Presiona ingresar!</p>' + '<img src="' + resp.picture + '"/><p><b>Nombre: </b></p><p>' + resp.name + '</p><p><b>Correo electrónico:</b></p><p>' + resp.email + '</p> <a href="javascript:void(0);" onclick="signOut();">Cerrar sesión</a><p>';

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

