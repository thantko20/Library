let library = [];
const addBookBtn = document.querySelector('.add-book-btn');
const bookShelf = document.querySelector('.books-container');

// BOOK OBJECT
const Book = function({title, author, pages, readState}) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readState = readState;
}

Book.prototype.changeReadState = function() {
  this.readState = !this.readState;
}

const bookInfo = {
  title: 'Lord of the Rings: The Fellowship of the Ring',
  author: 'J. R. R. Tolkien',
  pages: '479',
  readState: true
}

const book1 = new Book(bookInfo);
library.push(book1);
