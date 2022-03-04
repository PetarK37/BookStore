var firebaseUrl = 'https://bookstore-73c91-default-rtdb.firebaseio.com';
var Bookid = getId();
var knjiga = {};

function init() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            knjiga = JSON.parse(xhttp.responseText);
            fillInBookData();
            knjiga['id'] = Bookid;
            popunjavanje_zvezdica();
        }
    }
    xhttp.open('GET', firebaseUrl + '/knjige/' + Bookid + '.json');
    xhttp.send();
}

function fillInBookData() {
    var img = document.getElementById('cover_picture');
    img.setAttribute('src', knjiga['slika']);
    var title = document.getElementById('book_title');
    title.innerText = knjiga['naziv'];
    var book_author = document.getElementById('book_author');
    book_author.innerText = knjiga['autor'];
    var ISBN = document.getElementById('ISBN_num');
    ISBN.innerText = 'ISBN broj:' + knjiga['isbn'];
    var price = document.getElementById('price');
    price.innerText = knjiga['cena'];
    var bookRating = document.getElementById('book_rating');
    bookRating.innerText = knjiga['ocena'];
    var publisher = document.getElementById('publisher');
    publisher.innerText = knjiga['izdavackaKuca'];
    var year = document.getElementById('year');
    year.innerText = knjiga['godinaIzdavanja'];
    var pages = document.getElementById('pages');
    pages.innerText = knjiga['brojStranica'];
    var covers = document.getElementById('covers');
    covers.innerText = knjiga['tipPoveza'];
    var writting_language = document.getElementById('writting_language');
    writting_language.innerText = knjiga['pismo'];
    var language = document.getElementById('language');
    language.innerText = knjiga['jezik'];
    var description = document.getElementById('description');
    description.innerText = knjiga['opis'];

    var editButton = document.getElementById('btnEdit');
    editButton.setAttribute('href', 'book_edit.html?id=' + Bookid);

}
function getId() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return id;
}

function oceni(ocena,objekat){
    alert("Uspesno ste ocenili knjigu" + " " + knjiga['naziv'] + " " + "sa ocenom" + " " + ocena);
}

function dodajUStorage(id, knjiga) {
    localStorage.setItem(id, JSON.stringify(knjiga));
}

function popunjavanje_zvezdica(){
    stars = document.getElementsByName('rating');
    for (i in stars){
        if (stars[i].value == knjiga['ocena']){
            stars[i].checked = true;
        }     
    };
};


init();

