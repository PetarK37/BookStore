var firebaseUrl = 'https://bookstore-73c91-default-rtdb.firebaseio.com';
var listaKnjiga = [];
var knjige = {};

function getBooks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                knjige = JSON.parse(xhttp.responseText);
                for (k in knjige) {
                    knjige[k]['id'] = k;
                    listaKnjiga.push(knjige[k]);
                }

                for (var i = 0; i < listaKnjiga.length; i++) {
                    createBookBox(i);
                }

                removeFirstBookBox();
            } else {
                alert('Desila se greška prilikom učitavanja stranice. Molim vas ponovo pokrenite sajt.');
            }
        }
    }

    xhttp.open('GET', firebaseUrl + '/knjige.json');
    xhttp.send();
}



function createBookBox(i) {

    var coverPicture = document.getElementById('cover_picture');
    coverPicture.setAttribute('src', listaKnjiga[i]['slika']);

    var naziv = ''

    function naziv_knjige() {
        if (listaKnjiga[i]['naziv'].length > 20) {
            naziv = listaKnjiga[i]['naziv'].substring(0, 20) + '...';
        }
        else {
            naziv = listaKnjiga[i]['naziv'];
        }
    };
    naziv_knjige();

    var bookTitle = document.getElementById('book_title');
    bookTitle.innerText = naziv;
    bookTitle.setAttribute('title', listaKnjiga[i]['naziv']);
    var bookAuthor = document.getElementById('book_author');
    bookAuthor.innerText = listaKnjiga[i]['autor'];
    var bookRating = document.getElementById('book_rating');
    bookRating.innerText = listaKnjiga[i]['ocena'];
    var price = document.getElementById('price');
    price.innerText = listaKnjiga[i]['cena'];
    var buyBtn = document.getElementById('buyBtn');
    buyBtn.setAttribute('data-id', listaKnjiga[i]['id']);
    var book_link = document.getElementById('book_title');
    var picture_link = document.getElementById('picture_link');
    picture_link.setAttribute('href', 'about_book.html?id=' + listaKnjiga[i]['id']);
    book_link.setAttribute('href', 'about_book.html?id=' + listaKnjiga[i]['id']);
    var rating_div = document.getElementById('rating_div');

    stars = rating_div.childNodes;

    for (k = 0; k < stars.length; k++) {
        if (stars[k].classList && stars[k].classList.contains('before_rating')){
            stars[k].classList.remove("before_rating");
        };
        if (listaKnjiga[i]['ocena'] == stars[k].id) {
            stars[k].classList.add("before_rating");
        };
    };

    let box = document.querySelector('.book_box');
    box.setAttribute('id', listaKnjiga[i]['id']);
    let clone = box.cloneNode(true);
    document.getElementById('book_row').appendChild(clone);
}

function dodajUStorage(id, knjiga) {
    localStorage.setItem(id, JSON.stringify(knjiga));
}


function removeFirstBookBox() {
    var parent = document.getElementById('book_row');
    parent.removeChild(parent.firstElementChild);
}
getBooks();
