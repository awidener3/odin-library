// variable declarations
const bookContainer = document.querySelector('.book-container');
const addBook_button = document.querySelector('.add-book');
const submitBook_button = document.getElementById('submit');
const inputs_form = document.querySelectorAll('input');
const overlay_div = document.getElementById('overlay');

// book storage
let myLibrary = [
    {
        'bookTitle': 'The Hobbit',
        'author': 'J.R.R. Tolkien',
        'pages': 297,
        'readStatus': 'read'
    },
    {
        'bookTitle': 'Dune',
        'author': 'Frank Hubert',
        'pages': 412,
        'readStatus': 'in-progress'
    },
    {
        'bookTitle': 'Mistborn',
        'author': 'Brandon Sanderson',
        'pages': 1161,
        'readStatus': 'not read'
    }
];

/* Overlay and Form */

function turnOnOverlay() {
    document.getElementById('overlay').style.display = 'block';
}

function turnOffOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

// closes overlay if clicked anywhere but form
window.onclick = function(event) {
    if (event.target == overlay_div) {
        overlay_div.style.display = 'none';
    }
}

/* Book Constructor */
function Book() {
    this.bookTitle = bookTitle,
    this.author = author,
    this.pages = pages,
    this.readStatus = readStatus
};

/* Book Object Creation */

function addBookToLibrary() {
    if (document.getElementById('book-title').value == '') {
        return;
    }
    this.bookTitle = document.getElementById('book-title').value;
    this.author = document.getElementById('book-author').value;
    this.pages = document.getElementById('book-pages').value;
    this.readStatus = document.getElementById('book-status').value;
    let newBook = new Book();
    myLibrary.push(newBook);
    console.log(myLibrary);
    turnOffOverlay();
    updateDisplay();
};

console.log(myLibrary);

/* myLibrary Display */

function updateDisplay() {
    bookContainer.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement('div');
        card.classList = 'card';
        card.innerHTML += 
            `<img class="card-book" src="images/blank-book.png" alt="A blank book">
            <span class="card-hover">
                <div class="card-title">${myLibrary[i].bookTitle}</div>
                <div class="card-author">${myLibrary[i].author}</div>
                <div class="card-pages">${myLibrary[i].pages} pages</div>
            </span>`
        if (myLibrary[i].readStatus == 'read') {
            card.innerHTML += `<div class="check">✓</div>`;
        }
        bookContainer.appendChild(card);
    }
}

updateDisplay();

// sample books //

// 'Outliers', 'Malcolm Gladwell', 309, 'not read'
// 'Grit', 'Angela Duckworth', 277, 'in-progress'
// 'The Hobbit', 'J.R.R. Tolkien', 297, 'read'
// 'Dune', 'Frank Hubert', 412, 'in-progress'
// 'Mistborn', 'Brandon Sanderson', 1161, 'not read'

// {
//     'bookTitle': 'The Hobbit',
//     'author': 'J.R.R. Tolkien',
//     'pages': 297,
//     'readStatus': 'read'
// },
// {
//     'bookTitle': 'Dune',
//     'author': 'Frank Hubert',
//     'pages': 412,
//     'readStatus': 'in-progress'
// },
// {
//     'bookTitle': 'Mistborn',
//     'author': 'Brandon Sanderson',
//     'pages': 1161,
//     'readStatus': 'not read'
// }