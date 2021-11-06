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
        'readStatus': 'not read'
    },
    {
        'bookTitle': 'Mistborn',
        'author': 'Brandon Sanderson',
        'pages': 1161,
        'readStatus': 'not read'
    }
];

/* overlay and form */

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

/* book constructor */
function Book(bookTitle, author, pages, readStatus) { // <-- just added parameters
    this.bookTitle = bookTitle,
    this.author = author,
    this.pages = pages,
    this.readStatus = readStatus
};

/* book object creation */

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
    turnOffOverlay();
    updateDisplay();
};

/* myLibrary Display */

// function updateDisplay() {
//     bookContainer.innerHTML = '';
//     for (let i = 0; i < myLibrary.length; i++) {
//         const card = document.createElement('div');
//         card.classList = 'card';
//         card.innerHTML += 
//             `<img class="card-book" src="images/blank-book.png" alt="A blank book">
//             <span class="card-hover">
//                 <div class="card-title">${myLibrary[i].bookTitle}</div>
//                 <div class="card-author">${myLibrary[i].author}</div>
//                 <div class="card-pages">${myLibrary[i].pages} pages</div>
//                 <button class="card-status-button" data-read-status="${myLibrary[i].readStatus}">${myLibrary[i].readStatus}</button>
//             </span>`
//         if (myLibrary[i].readStatus == 'read') {
//             card.innerHTML += `<div id="checked" class="check" onclick="toggleCheck(this)">✓</div>`;
//         } else {
//             card.innerHTML += `<div id="unchecked" class="blank-check" onclick="toggleCheck(this)"></div>`
//         }
//         bookContainer.appendChild(card);
//     }
// }

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
                <div id="checkbox" class="card-status-button" data-readstatus="${myLibrary[i].readStatus}" onclick="toggleCheck(this)"></div>
                <button class="card-status-button" data-read-status="${myLibrary[i].readStatus}">${myLibrary[i].readStatus}</button>
            </span>`
        bookContainer.appendChild(card);
    }
}

updateDisplay();

/* Misc buttons */

function toggleCheck(elem) {
    if (elem.classList.contains('check')) {
        elem.classList.remove('check');
        elem.classList.add('blank-check');
        elem.textContent = '';
    } else {
        elem.classList.remove('blank-check');
        elem.classList.add('check');
        elem.textContent = '✓';
    }
}

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