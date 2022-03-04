var firebaseUrl = 'https://bookstore-73c91-default-rtdb.firebaseio.com';
var userid = getId();
var editForm = document.getElementById('user_edit');

function init() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            korisnik = JSON.parse(xhttp.responseText);
            korisnik['id'] = userid;
            filinData();
            filinMobileData();
        }
    }

    xhttp.open('GET', firebaseUrl + '/korisnici/' + userid + '.json');
    xhttp.send();
}




function getUser() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            korisnik = JSON.parse(xhttp.responseText);
            edit();
            editForm.addEventListener('submit', function (e) {
                e.preventDefault();
                editUser();
                
            });
        }
    }
    xhttp.open('GET', firebaseUrl + '/korisnici/' + userid + '.json');
    xhttp.send();
}

function getId() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return id;
}
function filinData(){
    var name = document.getElementById('name');
    name.innerText = korisnik['ime'];
    var lastname = document.getElementById('lastname');
    lastname.innerText = korisnik['prezime'];
    var username = document.getElementById('usernameDesktop');
    username.innerText = korisnik['username'];
    var email = document.getElementById('emailDesktop');
    email.innerText = korisnik['email'];
    var bithrday = document.getElementById('bithrday');
    bithrday.innerText = korisnik['datumRodjenja'];
    var adress = document.getElementById('adress');
    adress.innerText = korisnik['adresa'];
    var tel = document.getElementById('tel');
    tel.innerText = korisnik['telefon'];

    var user_edit = document.getElementById('user_edit')
    user_edit.setAttribute('href','user_edit.html?id=' + korisnik['id']);
}
function filinMobileData(){
    var mobileName = document.getElementById('mobileName');
    mobileName.innerText = korisnik['ime'];
    var lastnameMobile = document.getElementById('lastnameMobile');
    lastnameMobile.innerText = korisnik['prezime'];
    var usernameMobile = document.getElementById('usernameMobile');
    usernameMobile.innerText = korisnik['username'];
    var emailMobile = document.getElementById('emailMobile');
    emailMobile.innerText = korisnik['email'];
    var bithradyMobile = document.getElementById('bithrdayMobile');
    bithrdayMobile.innerText = korisnik['datumRodjenja'];
    var adressMobile = document.getElementById('adressMobile');
    adressMobile.innerText = korisnik['adresa'];
    var telMobile = document.getElementById('telMobile');
    telMobile.innerText = korisnik['telefon'];

    var user_edit_mobile = document.getElementById('user_edit_mobile')
    user_edit_mobile.setAttribute('href','user_edit.html?id=' + korisnik['id']);

}

function edit() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            korisnik = JSON.parse(xhttp.responseText);
            
            var name = document.getElementById('name_input');
            name.setAttribute('placeholder' , korisnik['ime']);
            var username = document.getElementById('username_input');
            username.innerText =  korisnik['username'];
            var lastname = document.getElementById('lastname_input');
            lastname.setAttribute('placeholder', korisnik['prezime']);
            var e_mail = document.getElementById('e-mail_input');
            e_mail.setAttribute('placeholder', korisnik['email']);
            var adress = document.getElementById('adress_input');
            adress.setAttribute('placeholder', korisnik['adresa']);
            var phone = document.getElementById('phone_input');
            phone.setAttribute('placeholder', korisnik['telefon']);

        }
    }

    xhttp.open('GET', firebaseUrl + '/korisnici/' +  userid + '.json');
    xhttp.send();
}

function editUser() {

    var name = document.getElementById('name_input');
    var lastname = document.getElementById('lastname_input');
    var b_day = document.getElementById('bithrday_input')
    var email = document.getElementById('e-mail_input');
    var adress = document.getElementById('adress_input')
    var phone = document.getElementById('phone_input');
    var password = document.getElementById('password_input')
    
    if (name.classList.contains('changed') && (name.value == '' || name.value.length > 50)) {
        window.alert("Proverite ime");
        return;
    }
    else {
        if (name && name.value != '') {
            korisnik.ime = name.value.trim();
        }
    };
    if (lastname.classList.contains('changed') && (lastname.value == '' || lastname.value.length > 50)) {
        window.alert("Proverite prezime");
        return;
    }
    else {
        if (lastname && lastname.value != '') {
            korisnik.prezime = lastname.value.trim();
        }
    };
    if (b_day.classList.contains('changed') && (b_day.value == '' || b_day.valueAsDate > new Date())) {
        window.alert("Godina unosa je pogresna");
        return;
    }
    else {
        if (b_day && b_day.value != '') {
            korisnik.datumRodjenja = b_day.value.trim();
        }
    };
    if (email.classList.contains('changed') && (email.value == '' || email.value.length > 100)) {
        window.alert(" Proverite email");
        return;
    }
    else {
        if (email && email.value != '') {
            korisnik.email = email.value.trim();
        }
    };
    if (adress.classList.contains('changed') && (adress < 0  || adress.value.length > 200)) {
        window.alert("Proverite unetu adresu");
        return;
    }
    else {
        if (adress && adress.value != '') {
            korisnik.adresa = adress.value.trim();
        }
    };
    if (phone.classList.contains('changed') && (phone.value == '' || phone.value.length > 12)) {
        window.alert("Proverite unet broj telefona");
        return;
    }
    else {
        if (phone && phone.value != '') {
            korisnik.telefon = phone.value.trim();
        }
    };
    if (password.classList.contains('changed') && (password.value == '' || password.value.length > 50)) {
        window.alert("Proverite unetu lozinku");
        return;
    }
    else {
        if (password && password.value != '') {
            korisnik.password = password.value.trim();
        }
    };
   
    var putRequest = new XMLHttpRequest();

    putRequest.onreadystatechange = function (e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Uspesno izmenjeni podaci");
                location.replace('index.html');
            } else {
                alert('Greška prilikom izmene korisnika.');
            }
        }
    }
    putRequest.open('PUT', firebaseUrl + '/korisnici/' + userid + '.json');
    putRequest.send(JSON.stringify(korisnik));
}

var inputs = document.getElementsByClassName('user_edit_input');
for(i=0; i<inputs.length; i++){
    inputs[i].onchange = function(){
        this.className += ' changed';
    };
}

if (document.getElementById('usernameDesktop') || document.getElementById('usernameMobile')){
    init();
}else{
    getUser(); 
};
