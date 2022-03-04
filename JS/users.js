var firebaseUrl = 'https://bookstore-73c91-default-rtdb.firebaseio.com';
var listaKorisnika = [];


function getUsers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var korisnici = JSON.parse(xhttp.responseText);
                for (k in korisnici) {
                    korisnici[k]['id'] = k;
                    listaKorisnika.push(korisnici[k]);
                }
                for (i = 0; i < listaKorisnika.length; i++) {
                    appendUSersData(i);
                    appendUSersDataMobile(i);
                }

            }else {
                 alert('Desila se greška prilikom učitavanja stranice. Molim vas ponovo pokrenite sajt.');
            }
        } 

    }
    xhttp.open('GET', firebaseUrl + '/korisnici.json');
    xhttp.send();
}

function appendUSersData(i) {
    var usernameData = document.createElement('td');
    usernameData.setAttribute('class', 'align-middle');
    usernameData.innerText = listaKorisnika[i]['username'];
    var emailData = document.createElement('td');
    emailData.setAttribute('class', 'align-middle');
    emailData.innerText = listaKorisnika[i]['email'];
    var detaljnijeDugmeTd = document.createElement('td');
    var detaljnijeDugme = document.createElement('a');
    detaljnijeDugme.setAttribute('class', 'mx-0 align-middle text-center btn btn-dark');
    detaljnijeDugme.innerText = 'Detaljnije';
    detaljnijeDugme.setAttribute('href', 'Abaut_user.html?id=' + listaKorisnika[i]['id']);
    detaljnijeDugmeTd.appendChild(detaljnijeDugme);
    var deleteTd = document.createElement('td');
    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn text-secondary fas fa-trash-alt  p-0 larger-80');
    deleteButton.setAttribute('title', 'obriši');
    deleteButton.setAttribute('data-id', listaKorisnika[i]['id']);
    deleteButton.onclick = deleteUser;
    deleteTd.appendChild(deleteButton);



    var usernameRow = document.createElement('tr');
    usernameRow.appendChild(usernameData);
    usernameRow.appendChild(emailData);
    usernameRow.appendChild(detaljnijeDugmeTd);
    usernameRow.appendChild(deleteTd);

    document.getElementById('table_body').appendChild(usernameRow);
}

function appendUSersDataMobile(i) {
    var usernameRowMobile = document.createElement('tr');
    var username = document.createElement('td');
    username.setAttribute('class', 'font-weight-bold larger-20 p-2');
    username.innerText = 'Korisnčiko ime:';
    var usernameData = document.createElement('td');
    usernameData.setAttribute('class', 'p-2 text-center larger-20');
    usernameData.innerText = listaKorisnika[i]['username'];
    usernameRowMobile.appendChild(username);
    usernameRowMobile.appendChild(usernameData);

    var emailRowMobile = document.createElement('tr');
    var email = document.createElement('td');
    email.setAttribute('class', 'font-weight-bold larger-20 p-2');
    email.innerText = 'E-mail';
    var emailData = document.createElement('td');
    emailData.setAttribute('class', 'p-2 text-center larger-20');
    emailData.innerText = listaKorisnika[i]['email'];
    emailRowMobile.appendChild(email);
    emailRowMobile.appendChild(emailData);

    var buttonsRow = document.createElement('tr');
    var detaljnijeDugmeTd = document.createElement('td');
    detaljnijeDugmeTd.setAttribute('class', 'text-center');
    var detaljnijeDugme = document.createElement('a');
    detaljnijeDugme.setAttribute('class', 'mx-0 align-middle text-center btn btn-dark');
    detaljnijeDugme.innerText = 'Detaljnije';
    detaljnijeDugme.setAttribute('href', 'Abaut_user.html?id=' + listaKorisnika[i]['id']);
    detaljnijeDugmeTd.appendChild(detaljnijeDugme);
    buttonsRow.appendChild(detaljnijeDugmeTd);
    var deleteTd = document.createElement('td');
    deleteTd.setAttribute('class', 'text-center');
    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn text-secondary fas fa-trash-alt  p-0 larger-80');
    deleteButton.setAttribute('title', 'obriši');
    deleteButton.setAttribute('data-id', listaKorisnika[i]['id']);
    deleteButton.onclick = deleteUser;
    deleteTd.appendChild(deleteButton);
    buttonsRow.appendChild(deleteTd)





    document.getElementById('mobileTableBody').appendChild(usernameRowMobile);
    document.getElementById('mobileTableBody').appendChild(emailRowMobile);
    document.getElementById('mobileTableBody').appendChild(buttonsRow);


}

function deleteUser() {
    var clickedBtn = this;
    var userId = clickedBtn.getAttribute('data-id');
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                location.reload();
            } else {
                alert('Greška prilikom brisanja korisnika.');
            }
        }
    }
    if(confirm("Da li zelite da ukolnite korisinka iz baze?") == true){
        xhttp.open('DELETE', firebaseUrl + '/korisnici/' + userId + '.json');
        xhttp.send();
    }
}

function removeTableRows(body) {
    var tBody = document.getElementById(body);

    while (tBody.firstChild) {
        tBody.removeChild(tBody.lastChild);

    }
}

getUsers();
