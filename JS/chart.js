lista = [];
var ukupna_cena = 0;

function init() {

    for (var i in localStorage) {
            lista.push(localStorage[i]);
    }

    for (var i = 0; i < lista.length; i++) {
        proizvod = JSON.parse(lista[i]);
        if (proizvod['autor']){
            fillChart();
            fillMobileChart();
            ukupna_cena += proizvod['cena'];
            document.getElementById('ukupna_cena').innerText = ukupna_cena + 250 + 'din';
            document.getElementById('ukupna_cena2').innerText = ukupna_cena + 250 + 'din';

       }
    }
};

function fillChart() {
    var tBody = document.getElementById('desktop_body');

    var productRow = document.createElement('tr');
    var imgTd = document.createElement('td');
    imgTd.setAttribute('class', 'mx-0 td-padding0');
    var img = document.createElement('img');
    img.setAttribute('src', proizvod['slika']);
    img.setAttribute('class', 'chart-img mx-2');
    img.setAttribute('alt', 'naslovnica knjige');
    imgTd.appendChild(img);
    var dataTd = document.createElement('td');
    dataTd.setAttribute('calss', 'align-middle text-left font-weight-bold larger-50');
    dataTd.innerText = proizvod['naziv'];
    var dataSpan = document.createElement('span');
    dataSpan.setAttribute('class', 'text-secondary d-block font-weight-normal');
    dataSpan.innerText = proizvod['autor'];
    dataTd.appendChild(dataSpan);
    var priceTd = document.createElement('td');
    priceTd.setAttribute('class', 'align-middle font-weight-bold larger-80');
    priceTd.innerText = proizvod['cena'] + 'din';
    var deleteTd = document.createElement('td');
    deleteTd.setAttribute('class', 'mx-0 align-middle text-center td-padding0');
    var deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'btn text-secondary fas fa-trash-alt larger-250 p-0');
    deleteBtn.setAttribute('data-id', proizvod['id']);
    deleteBtn.onclick = deleteChart;
    deleteTd.appendChild(deleteBtn);
    productRow.appendChild(imgTd);
    productRow.appendChild(dataTd);
    productRow.appendChild(priceTd);
    productRow.appendChild(deleteTd);

    tBody.appendChild(productRow);

    

}
function fillMobileChart() {
    var tBody = document.getElementById('mobile_body');

    var col6 = document.createElement('div');
    col6.setAttribute('class', 'col-6 mx-0');
    var divTable = document.createElement('div');
    divTable.setAttribute('class', 'table-resposive  text-center');
    col6.appendChild(divTable);
    var table = document.createElement('table');
    var body = document.createElement('tbody');
    divTable.appendChild(table);
    table.appendChild(body);
    var imageRow = document.createElement('tr');
    imageRow.setAttribute('class', 'text-center');
    var imgTd = document.createElement('td');
    var img = document.createElement('img');
    img.setAttribute('src', proizvod['slika']);
    img.setAttribute('class', 'w-75');
    img.setAttribute('alt', 'naslovnica knjige');
    imgTd.appendChild(img);
    imageRow.appendChild(imgTd);
    var dataRow = document.createElement('tr');
    dataRow.setAttribute('class', 'text-center');
    var dataTd = document.createElement('td');
    var name = document.createElement('p');
    name.setAttribute('calss', 'mobile-title');
    name.innerText = proizvod['naziv'];
    var writter = document.createElement('p');
    writter.setAttribute('class', 'ttext-muted mb-0');
    writter.innerText = proizvod['autor'];
    var price = document.createElement('p');
    price.setAttribute('class', 'font-weight-bold larger-50');
    price.innerText = proizvod['cena'] + 'din';
    dataTd.appendChild(name);
    dataTd.appendChild(writter);
    dataTd.appendChild(price);
    dataRow.appendChild(dataTd);
    var deleteTr = document.createElement('tr');
    deleteTr.setAttribute('class', 'text-center');
    var deleteTd = document.createElement('td');
    var deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'btn btn-block mb-2');
    deleteBtn.innerText = 'Obrišite';
    deleteBtn.style.backgroundColor = '#99928ebd';
    deleteBtn.setAttribute('data-id', proizvod['id']);
    deleteBtn.onclick = deleteChart;
    deleteTd.appendChild(deleteBtn);
    deleteTr.appendChild(deleteTd);

    body.appendChild(imageRow);
    body.appendChild(dataRow);
    body.appendChild(deleteTr);

    tBody.appendChild(col6);
}
function mobileBtns() {
    parent = document.getElementById('mobile_container');

    div = document.createElement('div');
    div.setAttribute('class', 'row mx-0');
    var buyBtn = document.createElement('button' ,'btn btn-block mt-4');
    buyBtn.style.backgroundColor = '#ff6600bd'; 
    buyBtn.innerText = 'Kupi';
    div.appendChild(buyBtn);
    var back = document.createElement('a');
    back.setAttribute('class' , 'btn btn-block mb-2');
    back.setAttribute('role' , 'button');
    back.style.backgroundColor = '#99928ebd';
    div.appendChild(back);
    parent.appendChild(div);
};


document.getElementById('kupi').addEventListener('click' ,function buy_btn(){
    alert('Uspesno ste kupili sve knjige');
    localStorage.clear();
    location.reload();
} );

document.getElementById('kupiMobile').addEventListener('click' ,function buy_btn(){
    alert('Uspesno ste kupili sve knjige');
    localStorage.clear();
    location.reload();
} );

function deleteChart(){
    var btn = this;
    var id = btn.getAttribute('data-id');
    if (confirm("Da li zelite da ukolnite knjigu iz korpe?") == true){
        localStorage.removeItem(id);
        location.reload();
    }
};

init();
mobileBtns();


