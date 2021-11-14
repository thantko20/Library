const addBookButton = document.querySelector('.add-book');
const libraryContainer = document.querySelector('.library-container');

let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    
}