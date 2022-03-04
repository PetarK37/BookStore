var firebaseUrl = 'https://bookstore-73c91-default-rtdb.firebaseio.com';
var Bookid = getId();
knjiga = {};

var editForm = document.getElementById('book_edit');
editForm.addEventListener('submit', function (e) {
    e.preventDefault();
    edit();
});

var deleteBtn = document.getElementById('deleteBtn');
deleteBtn.onclick = deleteBook;

function getBook() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            knjiga = JSON.parse(xhttp.responseText);
            fillInEditData();
            
        }
    }
    xhttp.open('GET', firebaseUrl + '/knjige/' + Bookid + '.json');
    xhttp.send();
}


function getId() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return id;
}

function fillInEditData() {
    var img = document.getElementById('cover_picture');
    img.setAttribute('src', knjiga['slika']);
    var title = document.getElementById('book_title_input');
    title.setAttribute('placeholder', knjiga['naziv']);
    var book_author = document.getElementById('book_author_input');
    book_author.setAttribute('placeholder', knjiga['autor']);
    var price = document.getElementById('price_input');
    price.setAttribute('placeholder', knjiga['cena']);
    var publisher = document.getElementById('publisher_input');
    publisher.setAttribute('placeholder', knjiga['izdavackaKuca']);
    var year = document.getElementById('year_input');
    year.setAttribute('placeholder', knjiga['godinaIzdavanja']);
    var pages = document.getElementById('pages_input');
    pages.setAttribute('placeholder', knjiga['brojStranica']);
    var language = document.getElementById('language_input');
    language.setAttribute('placeholder', knjiga['jezik']);
    var description = document.getElementById('description_input');
    description.setAttribute('placeholder', knjiga['opis']);
}


function edit() {

    var title = document.getElementById('book_title_input');
    var author = document.getElementById('book_author_input');
    var price = document.getElementById('price_input')
    var publisher = document.getElementById('publisher_input');
    var year = document.getElementById('year_input')
    var pages = document.getElementById('pages_input')
    var cover = document.getElementById('cover_type_input')
    var writLanguage = document.getElementById('writting_language_input')
    var language = document.getElementById('language_input')
    var description = document.getElementById('description_input');

    if (title.classList.contains('changed') && (title.value == '' || title.value.length > 100)) {
        window.alert("Proverite uneti naziv knjige");
        return;
    }
    else {
        if (title && title.value != '') {
            knjiga.naziv = title.value.trim();
        }
    };
    if (author.classList.contains('changed') && (author.value == '' || author.value.length > 100)) {
        window.alert(" Proverite unetog autora");
        return;
    }
    else {
        if (author && author.value != '') {
            knjiga.autor = author.value.trim();
        }
    };
    if (price.classList.contains('changed') && (price.value < 0 || price.value.length > 6)) {
        window.alert("Proverite unetu cenu");
        return;
    }
    else {
        if (price && price.value != '') {
            knjiga.cena = price.value.trim();
        }
    };
    if (publisher.classList.contains('changed') && (publisher.value == '' || publisher.value.length > 100)) {
        window.alert("Proveriteunetu izdavacku kucu");
        return;
    }
    else {
        if (publisher && publisher.value != '') {
            knjiga.izdavackaKuca = publisher.value.trim();
        }
    };
    if (year.classList.contains('changed') && (year.value == '' || year.value < 1800 || year.value > 2022)) {
        window.alert("Proverite unetu godinu");
        return;
    }
    else {
        if (year && year.value != '') {
            knjiga.godinaIzdavanja = year.value.trim();
        }
    };
    if (pages.classList.contains('changed') && (pages.value == 0 || pages.value < 0)) {
        window.alert("Proverite uneti broj stranica");
        return;
    }
    else {
        if (pages && pages.value != '') {
            knjiga.brojStranica = pages.value.trim();
        }
    };
    if (language.classList.contains('changed') && (language.value == '' || language.value.length > 50)) {
        window.alert("Proverite uneti jezik");
        return;
    }
    else {
        if (language && language.value != '') {
            knjiga.jezik = language.value.trim();
        }
    };
    if (description.classList.contains('changed') && (description.value == '' || description.value.length > 800)) {
        window.alert("Proverite uneti opis");
        return;
    }
    else {
        if (description && description.value != '') {
            knjiga.opis = description.value.trim();
        }
    };

    knjiga.tipPoveza = cover.value;
    knjiga.pismo = writLanguage.value;



    var putRequest = new XMLHttpRequest();

    putRequest.onreadystatechange = function (e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Uspesno izmenjeni podaci");
                location.replace('index.html')
            } else {
                alert('Greška prilikom izmene knjiga.');
            }
        }
    }
    putRequest.open('PUT', firebaseUrl + '/knjige/' + Bookid + '.json');
    putRequest.send(JSON.stringify(knjiga));

}

var inputs = document.getElementsByClassName('book_edit_input');

for (i = 0; i < inputs.length; i++) {
    inputs[i].onchange = function () {
        this.className += ' changed';
    };
}

function deleteBook() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                location.replace('index.html');
            } else {
                alert('Greška prilikom brisanja knjiga.');
            }
        }
    }
    if(confirm("Da li zelite da ukolnite knjigu iz baze?") == true){
        xhttp.open('DELETE', firebaseUrl + '/knjige/' + Bookid + '.json');
        xhttp.send();
        localStorage.removeItem(Bookid)

    }
}
getBook();
