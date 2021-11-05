// variable declarations
const bookContainer = document.querySelector('.book-container');
const addBook_button = document.querySelector('.add-book');
const inputs_form = document.querySelectorAll('input');

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

// button functionality

function turnOnOverlay() {
    document.getElementById('overlay').style.display = 'block';
}

function turnOffOverlay() {
    document.getElementById('overlay').style.display = 'none';
    // inputs_form.forEach(input => input.value = '');
}

// book constructor
function Book(bookTitle, author, pages, readStatus) {
    this.bookTitle = bookTitle,
    this.author = author,
    this.pages = pages,
    this.readStatus = readStatus
};

function addBookToLibrary(bookTitle, author, pages, readStatus) {
    let newBook = new Book(bookTitle, author, pages, readStatus);
    myLibrary.push(newBook);
    // loop through 'myLibrary' and  
};

// display myLibrary on webpage //

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

// myLibrary.forEach(function(object) {
//     const card = document.createElement('div');
//     card.classList = 'card';
//     card.innerHTML = 
//     `
//     <img class="card-book" src="images/blank-book.png" alt="A blank book">
//     <span class="card-hover">
//         <div class="card-title">${myLibrary}</div>
//         <div class="card-author">Frank Hubert</div>
//         <div class="card-pages">412 Pages</div>
//     </span> 
//     `
//     bookContainer.appendChild(card);
// })


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