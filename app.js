const bookContainer = document.getElementById('book-container');
const addBookButton = document.getElementById('add-book-btn');
const submitButton = document.getElementById('submit');
// const removeButton = document.getElementById('remove');
const readButton  = document.getElementById('read-btn');
const modal = document.getElementById('overlay');
const closeModal = document.getElementsByClassName("close")[0];

// modal functions

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


// Book Constructor & Prototypes //

function Book(title, author, pages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
}

Book.prototype.toggleRead = function() {
    console.log('toggleRead activate!');
    console.log(this.isRead);

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

    console.log('toggleRead processed!');
    console.log(this.isRead);
    // this.isRead ? false : true;
}

function addBookToLibrary() {
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('book-author').value;
    let pages = document.getElementById('book-pages').value;
    let isRead = document.getElementById('book-status').value;
    
    const newBook = new Book(title, author, pages, isRead)
    createCard(title, author, pages, isRead);
    
    myLibrary.push(newBook);
    console.log(`current library:`);
    console.log(myLibrary);
}

function deleteBook(card) {
    card.parentNode.parentNode.removeChild(card.parentNode);
    for (let book of myLibrary) {
        if (book.title == card.parentNode.dataset.title && book.author == card.parentNode.dataset.author) {
            let index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1)
        }
    }
    console.log(`resulting library:`);
    console.log(myLibrary);
}

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
        // console.log(this.parentNode);
        for (let book of myLibrary) {
            book.toggleRead();
            
        }
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


// // // // // 

// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 512, true);
// addBookToLibrary('Grit', 'Angela Duckworth', 422, false);
// addBookToLibrary('Outliers', 'Malcom Gladwell', 143, false);