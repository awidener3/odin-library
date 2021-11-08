const bookContainer = document.getElementById('book-container');
const addBookButton = document.getElementById('add-book-btn');
const submitButton = document.getElementById('submit');
const readButton  = document.getElementById('read-btn');
const modal = document.getElementById('overlay');
const closeModal = document.getElementsByClassName("close")[0];



// MODAL FUNCTIONS

addBookButton.onclick = function() {
    document.getElementById('input-form').reset();  // reset form
    modal.style.display = 'block';                  // reveal modal
}
closeModal.onclick = function() {
    modal.style.display = 'none';
}
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}
submitButton.onclick = function() {
    addBookToLibrary();
    modal.style.display = 'none';
}

let myLibrary = [];



// BOOK OBJECT HANDLING

function Book(title, author, pages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
}

Book.prototype.toggleRead = function() {
    switch(this.isRead) {
        case 'true':
        case true:
            this.isRead = false;
            break;
        case 'false':
        case false:
            this.isRead = true;
            break;
    }
}

function addBookToLibrary() {
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('book-author').value;
    let pages = document.getElementById('book-pages').value;
    let isRead = document.getElementById('book-status').value;
    
    const newBook = new Book(title, author, pages, isRead)
    createCard(title, author, pages, isRead);
    
    myLibrary.push(newBook);

    // save myLibrary to local storage
    saveLibrary();
}

function deleteBook(card) {
    card.parentNode.parentNode.removeChild(card.parentNode);
    for (let book of myLibrary) {
        if (book.title == card.parentNode.dataset.title && book.author == card.parentNode.dataset.author) {
            let index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1)
        }
    }
}

function changeRead(btn) {
    if (btn.classList.contains('green-btn')) {
        btn.classList.remove('green-btn');
        btn.classList.add('red-btn');
        btn.textContent = 'Not Read';
    } else {
        btn.classList.remove('red-btn');
        btn.classList.add('green-btn');
        btn.textContent = 'Read';
    }

    for (let book of myLibrary) {
        if (book.title == btn.parentNode.dataset.title && book.author == btn.parentNode.dataset.author) {
            book.toggleRead();
        }
    }
}


// LOCAL STORAGE

function saveLibrary() {
    // clear current saved library
    
    // take current library and JSON.stringify it.

    // set it into LocalStorage
}

function loadLibrary () {
    // after page is loaded

    // find stringified library and run it through JSON.Parse

    // set myLibrary to the parsed library
}


// BOOK CARD CREATION

function createCard(title, author, pages, isRead) {
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('h3');
    const bookPages = document.createElement('p');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');

    bookCard.classList.add('card');
    bookCard.setAttribute('data-title', `${title}`);
    bookCard.setAttribute('data-author', `${author}`);
    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    bookPages.classList.add('book-pages');
    readButton.classList.add('read-btn');
    removeButton.classList.add('remove-btn');
    
    removeButton.onclick = function() {
        deleteBook(this);
    }
    readButton.onclick = function() {
        changeRead(this);
    }

    if (isRead === 'true') {
        isRead = 'Read';
        readButton.classList.add('green-btn');
    } else {
        isRead = 'Not Read';
        readButton.classList.add('red-btn');
    }

    bookTitle.textContent = `"${title}"`;
    bookAuthor.textContent = author;
    bookPages.textContent = `${pages} pages`;
    readButton.textContent = isRead;
    removeButton.textContent = 'Remove';

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);
    bookContainer.appendChild(bookCard);
}


// // // DEBUG LAND // // // 

// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 512, true);
// addBookToLibrary('Grit', 'Angela Duckworth', 422, false);
// addBookToLibrary('Outliers', 'Malcom Gladwell', 143, false);


// be sure to uncomment the console.log button in the HTML!

// const consoleButton = document.getElementById('console');

// consoleButton.addEventListener('click', function() {
//     console.log('-------------');
//     console.log('current library:');
//     console.log(myLibrary);
//     console.log('-------------');
// })