let library = [];
const addBookBtn = document.querySelector('.add-book-btn');
const bookShelf = document.querySelector('.books-container');

// BOOK OBJECT
const Book = function([title, author, pages, readState]) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readState = readState;
}

Book.prototype.changeReadState = function() {
  this.readState = !this.readState;
}