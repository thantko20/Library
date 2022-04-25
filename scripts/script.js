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
  author.textContent = this.author;

  const pages = document.createElement('div');
  pages.className = 'book-pages';
  pages.textContent = this.pages;

  const readStateCheckbox = document.createElement('input');
  readStateCheckbox.type = 'checkbox';
  readStateCheckbox.checked = this.readState;
  readStateCheckbox.className = 'read-state';
  readStateCheckbox.addEventListener('click', () => this.changeReadState());

  const delBookBtn = document.createElement('button');
  delBookBtn.className = 'del-book';
  delBookBtn.textContent = 'Delete';
  delBookBtn.addEventListener('click', () => {
    const bookId = library.indexOf(this);
    library.splice(bookId, 1);
  })

  wrapper.append(
    title,
    author,
    pages,
    readStateCheckbox,
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
bookShelf.appendChild(book1.render())
library.push(book1);


// function renderShelf () {
//   library.forEach((book) => {
//     const bookEl = book.render();
//     bookShelf.appendChild(bookEl);
//   })
// }