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

Book.prototype.render = function() {
  const wrapper = document.createElement('div'); // this will be the container
  wrapper.className = 'book';

  const title = document.createElement('div');
  title.className = 'book-title';
  title.textContent = this.title;

  const author = document.createElement('div');
  author.className = 'book-author';
  author.innerHTML = `Written by <strong>${this.author}</strong>`;

  const pages = document.createElement('div');
  pages.className = 'book-pages';
  pages.innerHTML = `<strong>${this.pages} Pages`;

  const readStateBox = document.createElement('div');
  const readStateLabel = document.createElement('label');
  readStateLabel.setAttribute('for', 'book-read-state');
  readStateLabel.textContent = 'Read State:';

  const readStateCheckbox = document.createElement('input');
  readStateCheckbox.id = 'book-read-state'
  readStateCheckbox.type = 'checkbox';
  readStateCheckbox.checked = this.readState;
  readStateCheckbox.className = 'read-state';
  readStateCheckbox.addEventListener('click', () => this.changeReadState());

  readStateBox.append(
    readStateLabel,
    readStateCheckbox
  )

  const delBookBtn = document.createElement('button');
  delBookBtn.className = 'del-book';
  delBookBtn.textContent = 'Delete';
  delBookBtn.addEventListener('click', () => {
    const bookId = library.indexOf(this);
    library.splice(bookId, 1);
    renderShelf();
  })

  wrapper.append(
    title,
    author,
    pages,
    readStateBox,
    delBookBtn
  )

  return wrapper;
}

const bookInfo = {
  title: 'Lord of the Rings: The Fellowship of the Ring',
  author: 'J. R. R. Tolkien',
  pages: '479',
  readState: true
}

const book1 = new Book(bookInfo);
const book2 = new Book(bookInfo);
const book3 = new Book(bookInfo);
const book4 = new Book(bookInfo);

library.push(book2);
library.push(book3);
library.push(book4);

renderShelf();

function cleanRenderShelf() {
  while (bookShelf.firstChild) {
    bookShelf.firstChild.remove();
  }
}

function renderShelf () {
  cleanRenderShelf();
  library.forEach((book) => {
    const bookEl = book.render();
    bookShelf.appendChild(bookEl);
  })
}