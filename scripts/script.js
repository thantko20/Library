const addBookButton = document.querySelector('.add-book');
const bookContainer = document.querySelector('.book-container');
const addBookForm = document.querySelector('form');
const exitFormButton = document.getElementById('exit-form');
const submitButton = document.getElementById('submit-btn');

let myLibrary = loadFromLocalStorage();

displayBooks();
popUpForm();
removeBook();
listenReadStatusChecker();

// function Book(title, author, pages, readStatus) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.readStatus = readStatus;
// }

// Book.prototype.changeReadStatus = function() {
//     this.readStatus ? this.readStatus = false : this.readStatus = true;
// }

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    changeReadStatus = () => {
        this.readStatus = !this.readStatus;
    }
}

// Change readStatus on mouseclick input
function listenReadStatusChecker() {
    document.addEventListener('click', (e) => {
        const currentElement = e.target;
        if(currentElement.id === 'read-status') {
            const currentBookIndex = currentElement.parentNode.parentNode.getAttribute('data-book-index');
            myLibrary[currentBookIndex].changeReadStatus();
            displayBooks();
        }
    })
}

// Submit the Book
function addBookToLibrary() {
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('title').value;
        const authorInput = document.getElementById('author').value;
        const pagesInput = document.getElementById('pages').value;
        const readInput = document.getElementById('read').checked;

        if(titleInput === '' || authorInput === ''){
            alert("One of the fields is empty!");
            return;
        }

        let newBook = new Book(titleInput, authorInput, pagesInput, readInput);
        myLibrary.push(newBook);
        saveToLocalStorage();
        displayBooks();
    })
}

function displayBooks() {
    bookContainer.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.className = 'book';
        bookCard.setAttribute('data-book-index', i);
        const statusChecker = myLibrary[i].readStatus ? 'checked' : '';

        bookCard.innerHTML = `<div>Title: ${myLibrary[i].title}</div>
                                <div>Author: ${myLibrary[i].author}</div>
                                <div>Pages: ${myLibrary[i].pages}</div>
                                <div>
                                    <label for="read-status">Read Status: </label>
                                    <input id="read-status" type="checkbox" name="read-status" ${statusChecker}>
                                </div>
                                <button class="remove-book">Remove the Book</button>`

        bookContainer.appendChild(bookCard);
    }
}

// Instead of listening for all nodes or elements with
// `remove-book` className, using event itself is more convenient imo
function removeBook() {
    document.addEventListener('click', (e) => {
        const currentElement = e.target;
        if(currentElement.className === 'remove-book'){
            const bookNode = currentElement.parentNode;
            const bookIndex = bookNode.getAttribute('data-book-index');
            myLibrary.splice(bookIndex, 1);
            saveToLocalStorage();
            displayBooks();
        }
    })
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadFromLocalStorage() {
    let parsedLibrary =  localStorage.getItem('myLibrary') ? JSON.parse(localStorage.getItem("myLibrary")) : [];
    if(parsedLibrary === []) return [];

    let tmpLibrary = [];

    for (let i = 0; i < parsedLibrary.length; i++) {
        let currentObject = parsedLibrary[i];
        if(currentObject) {

            let book = new Book(currentObject.title, currentObject.author, currentObject.pages, currentObject.readStatus);
            tmpLibrary.push(book);
        }
    }
    return tmpLibrary;
}

// Add Book Button

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
    addBookToLibrary();
    closeForm();
}