var firebaseUrl = 'https://bookstore-73c91-default-rtdb.firebaseio.com';
var loginForm = document.getElementById('login_form');
var lista = [];
var register = {}

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('emailAdress').value.trim();
    var password = document.getElementById('loginpassword').value.trim();
    
    if (email == '' || password == '') {
        alert('Morate uneti sve podatke da bi ste se prijavili');
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var users = JSON.parse(xhttp.responseText);
                    var name = '';
                    var lastname = '';
                    for (k in users) {
                        lista.push(users[k]);
                    }
                    for (var i = 0; i < lista.length; i++) {
                        var user = lista[i];
                        if (user.email == email && user.password == password) {
                            name = user.ime;
                            lastname = user.prezime;
                            break;
                        }
                    }

                    if (name == '') {
                        alert('Nesipravni korisnicki podaci!');
                    }
                     else {
                        alert("Uaspesno ste ulogovani kao: " + name + '|' + lastname);
                    }
                } else {
                    alert('Desila se greska:' + this.status);
                }
            }
        };

        xhttp.open('GET', firebaseUrl + '/korisnici.json');
        xhttp.send();

    }
});

var registerForm = document.getElementById('register_form');

registerForm.addEventListener('submit' , function(e){
    e.preventDefault();

    var name = document.getElementById('ime').value.trim();
    var lastname = document.getElementById('prezime').value.trim();
    var username = document.getElementById('username').value.trim();
    var email = document.getElementById('email2').value.trim();
    var password = document.getElementById('password2').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var birthday = document.getElementById('godinaRodjenja');
    var adress = document.getElementById('adresa').value.trim();

    if(name == '' || lastname == '' || username == '' || email == '' || password == '' || phone == '' || birthday.value.trim() == '' || adress == ''){
        alert('Morate uneti sve podatke');
    } else if (name.length > 50){
        alert("Provetire uneto ime");
    }else if (lastname.length > 50){
        alert("Provetire uneto prezime");
    }else if (username.length > 50){
        alert("Korisnicko ime je predugacko");
    }else if (phone.length > 20){
        alert("Provetire unet broj");
    }else if ( birthday.valueAsDate > new Date()){
        alert('Proverite godinu rodjenja')
    }
    else{
        register['Ime:'] = name;
        register['Prezime:'] = lastname;
        register['Korisnicko ime:'] = username;
        register['Email:'] = email;
        register['Lozinka:'] = password;
        register['Telefon:'] = phone;
        register['Datum rodjenja:'] = birthday.value.trim();
        register['Adresa:'] = adress;

        console.log(register);
        alert("Uspesno ste registrovani kao " + '\n' + username)
    }
});