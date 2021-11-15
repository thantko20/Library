const addBookButton = document.querySelector('.add-book');
const bookContainer = document.querySelector('.book-container');
const addBookForm = document.querySelector('form');
const exitFormButton = document.getElementById('exit-form');
const submitButton = document.getElementById('submit-btn');

let myLibrary = [];

popUpForm()
addBookToLibrary();

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary() {
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('title').value;
        const authorInput = document.getElementById('author').value;
        const pagesInput = document.getElementById('pages').value;
        const readInput = document.getElementById('read').checked;

        let newBook = new Book(titleInput, authorInput, pagesInput, readInput);
        myLibrary.push(newBook);
        displayBooks();
    })
}

function displayBooks() {
    bookContainer.textContent = '';
    for(let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.className = 'book';
        bookCard.setAttribute('data-book-index', i);

        bookCard.innerHTML = `<div>Title: ${myLibrary[i].title}</div>
                                <div>Author: ${myLibrary[i].author}</div>
                                <div>Pages: ${myLibrary[i].pages}</div>
                                <div>Read Status: </div>
                                <button id="remove-book">Remove the Book</button>`

        bookContainer.appendChild(bookCard);
    }
}

// Add Book Button and Remove Book Button

function openForm() {
    addBookButton.addEventListener('click', () => {
        addBookForm.style.display = "flex";
    })
}

function closeForm() {
    exitFormButton.addEventListener('click', () => {
        addBookForm.style.display = 'none';
    })
}

function popUpForm() {
    openForm();
    closeForm();
}