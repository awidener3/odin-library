const bookContainer = document.getElementById('book-container');
const submitButton = document.getElementById('submit');
const readButton = document.getElementById('read-btn');
const modal = document.getElementById('overlay');
const closeModal = document.getElementsByClassName('close')[0];

const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#addBook');
const closeButton = document.querySelector('.close');

showButton.addEventListener('click', () => {
	dialog.showModal();
});
closeButton.addEventListener('click', () => {
	dialog.close();
});

// addBookButton.onclick = function () {
// 	document.getElementById('input-form').reset(); // reset form
// 	modal.style.display = 'block'; // reveal modal
// };
// closeModal.onclick = function () {
// 	modal.style.display = 'none';
// };
// window.onclick = function (e) {
// 	if (e.target == modal) {
// 		modal.style.display = 'none';
// 	}
// };
submitButton.onclick = function () {
	getInputValues();
	modal.style.display = 'none';
};

// LIBRARY AND LOCAL STORAGE HANDLING

let myLibrary = [];
let storedLibrary = [];

const saveLibrary = () => {
	localStorage.setItem('library', '');
	localStorage.setItem('library', JSON.stringify(myLibrary));
};

const loadLibrary = () => {
	if (localStorage.getItem('library') !== null) {
		storedLibrary = JSON.parse(localStorage.library);
		updateDisplay();
	}
};

// BOOK OBJECT HANDLING

class Book {
	constructor(title, author, pages, isRead) {
		(this.title = title), (this.author = author), (this.pages = pages), (this.isRead = isRead);
	}
	toggleRead() {
		switch (this.isRead) {
			case true:
				this.isRead = false;
				saveLibrary();
				break;
			case false:
				this.isRead = true;
				saveLibrary();
				break;
		}
	}
}

const getInputValues = () => {
	let title = document.getElementById('book-title').value;
	let author = document.getElementById('book-author').value;
	let pages = document.getElementById('book-pages').value;
	let isRead = document.getElementById('book-status').value;
	if (isRead === 'true') {
		isRead = true;
	} else {
		isRead = false;
	}
	addBookToLibrary(title, author, pages, isRead);
};

const addBookToLibrary = (title, author, pages, isRead) => {
	const newBook = new Book(title, author, pages, isRead);
	createCard(title, author, pages, isRead);

	myLibrary.push(newBook);
	saveLibrary();
};

const deleteBook = (card) => {
	card.parentNode.parentNode.removeChild(card.parentNode);
	for (let book of myLibrary) {
		if (book.title == card.parentNode.dataset.title && book.author == card.parentNode.dataset.author) {
			let index = myLibrary.indexOf(book);
			myLibrary.splice(index, 1);
			localStorage.setItem('library', JSON.stringify(myLibrary));
		}
	}
};

const changeRead = (btn) => {
	for (let book of myLibrary) {
		if (book.title == btn.parentNode.dataset.title && book.author == btn.parentNode.dataset.author) {
			book.toggleRead();
		}
	}

	if (btn.classList.contains('green-btn')) {
		btn.classList.remove('green-btn');
		btn.classList.add('red-btn');
		btn.textContent = 'Not Read';
	} else {
		btn.classList.remove('red-btn');
		btn.classList.add('green-btn');
		btn.textContent = 'Read';
	}
};

const updateDisplay = () => {
	for (let book of storedLibrary) {
		addBookToLibrary(book.title, book.author, book.pages, book.isRead);
	}
};

window.onload = () => {
	loadLibrary();
};

// BOOK CARD CREATION

const createCard = (title, author, pages, isRead) => {
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

	removeButton.onclick = function () {
		deleteBook(this);
	};
	readButton.onclick = function () {
		changeRead(this);
	};

	if (isRead === true) {
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
};
