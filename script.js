const bookTitleInput = document.querySelector("#book-title");
const bookAuthorInput = document.querySelector("#book-author");
const bookList = document.querySelector(".book-list");
const addBookBtn = document.querySelector("#add-book");

// Load books from Local Storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
  savedBooks.forEach((book) => addBook(book.title, book.author));
});

addBookBtn.addEventListener("click", () => {
  const title = bookTitleInput.value.trim();
  const author = bookAuthorInput.value.trim();
  if (title === "" || author === "") {
    alert("Please enter both title and author");
    return;
  }
  addBook(title, author);
  saveBookToLocalStorage(title, author);
  bookTitleInput.value = "";
  bookAuthorInput.value = "";
});

function addBook(title, author) {
  const li = document.createElement("li");
  const details = document.createElement("span");
  details.className = "details";
  details.textContent = `${title} by ${author}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeBookFromLocalStorage(title, author);
  });

  li.appendChild(details);
  li.appendChild(deleteBtn);
  bookList.appendChild(li);
}

// Save a new book to Local Storage
function saveBookToLocalStorage(title, author) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.push({ title, author });
  localStorage.setItem("books", JSON.stringify(books));
}

// Remove a book from Local Storage
function removeBookFromLocalStorage(title, author) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const updatedBooks = books.filter(book => book.title !== title || book.author !== author);
  localStorage.setItem("books", JSON.stringify(updatedBooks));
}
