const bookContainer = document.getElementById('book-container');
const submitButton = document.getElementById('submit');
const readButton = document.getElementById('read-btn');
const modal = document.getElementById('overlay');
const closeModal = document.getElementsByClassName('close')[0];

const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#addBook');
const closeButton = document.querySelector('.close');
const form = document.querySelector('#input-form');

showButton.addEventListener('click', () => {
	dialog.showModal();
});
closeButton.addEventListener('click', () => {
	dialog.close();
});

form.addEventListener('submit', () => {
	const formData = new FormData(form);
	const bookConfig = {
		title: formData.get('book-title'),
		author: formData.get('book-author'),
		pages: formData.get('book-pages'),
		status: formData.get('book-status'),
	};

	addBookToLibrary(bookConfig);

	dialog.close();
});

let myLibrary = [];
let storedLibrary = [];

const saveLibrary = () => localStorage.setItem('library', JSON.stringify(myLibrary));

const loadLibrary = () => {
	if (localStorage.getItem('library') !== null) {
		storedLibrary = JSON.parse(localStorage.library);
		updateDisplay();
	}
};

class Book {
	constructor({ id, title, author, pages, status }) {
		this.id = id || crypto.randomUUID();
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.status = status;

		this.element = null;
	}

	createCard = () => {
		const bookCard = document.createElement('div');
		bookCard.classList.add('card');
		bookCard.setAttribute('data-title', `${this.title}`);
		bookCard.setAttribute('data-author', `${this.author}`);

		const bookTitle = document.createElement('h2');
		bookTitle.classList.add('book-title');
		bookTitle.textContent = `"${this.title}"`;

		const bookAuthor = document.createElement('h3');
		bookAuthor.classList.add('book-author');
		bookAuthor.textContent = this.author;

		const bookPages = document.createElement('p');
		bookPages.classList.add('book-pages');
		bookPages.textContent = `${this.pages} pages`;

		const readButton = document.createElement('button');
		readButton.classList.add('read-btn');
		readButton.addEventListener('click', () => changeRead(this));
		readButton.textContent = this.status;

		const removeButton = document.createElement('button');
		removeButton.classList.add('remove-btn');
		removeButton.addEventListener('click', this.removeCard);
		removeButton.textContent = 'Remove';

		bookCard.append(bookTitle, bookAuthor, bookPages, readButton, removeButton);
		this.element = bookCard;
		bookContainer.append(bookCard);
	};

	removeCard = () => {
		const books = JSON.parse(localStorage.getItem('library'));
		const updated = books.filter((book) => book.id !== this.id);
		localStorage.setItem('library', JSON.stringify(updated));

		this.element.remove();
	};
}

const addBookToLibrary = (config) => {
	const newBook = new Book(config);
	newBook.createCard();

	myLibrary.push(newBook);
	saveLibrary();
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
		addBookToLibrary({
			id: book.id,
			title: book.title,
			author: book.author,
			pages: book.pages,
			status: book.status,
		});
	}
};

window.onload = () => {
	loadLibrary();
};

// BOOK CARD CREATION
