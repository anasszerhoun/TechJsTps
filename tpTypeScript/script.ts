import Book, { BookFormat, BookStatus, BookData, BookResponse } from "./Book.js";

const API_URL = "http://localhost:8080";

const form = document.getElementById("book-form") as HTMLFormElement;
const booksListContainer = document.getElementById("books-list") as HTMLDivElement;
const refreshBtn = document.getElementById("refresh-btn") as HTMLButtonElement;

async function addBook(bookData: BookData): Promise<BookResponse> {
  try {
    const response = await fetch(`${API_URL}/books/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const savedBook = await response.json();
    console.log("Book added successfully:", savedBook);
    alert("Livre ajouté avec succès!");
    form.reset();
    return savedBook;
  } catch (error) {
    console.error("Error adding book:", error);
    alert("Erreur lors de l'ajout du livre");
    throw error;
  }
}

async function getAllBooks(): Promise<BookResponse[]> {
  try {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const books: BookResponse[] = await response.json();
    console.log("All books:", books);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

async function getBookById(id: string): Promise<BookResponse> {
  try {
    const response = await fetch(`${API_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const book: BookResponse = await response.json();
    console.log("Book:", book);
    return book;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
}

async function updateBook(id: string, bookData: BookData): Promise<BookResponse> {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedBook = await response.json();
    console.log("Book updated successfully:", updatedBook);
    alert("Livre mis à jour avec succès!");
    return updatedBook;
  } catch (error) {
    console.error("Error updating book:", error);
    alert("Erreur lors de la mise à jour du livre");
    throw error;
  }
}

async function updateBookPages(id: string, pagesRead: number): Promise<BookResponse> {
  try {
    const currentBook = await getBookById(id);
    
    const updatedBookData: BookData = {
      title: currentBook.title,
      author: currentBook.author,
      pages: currentBook.pages,
      status: currentBook.status,
      price: currentBook.price,
      pagesRead: pagesRead,
      format: currentBook.format,
      suggestedBy: currentBook.suggestedBy,
      finished: currentBook.finished
    };
    
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBookData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedBook: BookResponse = await response.json();
    console.log("Pages read updated successfully:", updatedBook);
    return updatedBook;
  } catch (error) {
    console.error("Error updating pages read:", error);
    throw error;
  }
}

async function deleteBook(id: string) {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Book deleted successfully:", result);
    alert("Livre supprimé avec succès!");
    return result;
  } catch (error) {
    console.error("Error deleting book:", error);
    alert("Erreur lors de la suppression du livre");
    throw error;
  }
}

form!.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(form!);

  const statusString = formData.get("status") as string;
  const formatString = formData.get("format") as string;
  const finishedCheckbox = formData.get("finished") as string;
  const pagesReadValue = formData.get("pagesRead") as string;

  const bookData = {
    title: String(formData.get("title")),
    author: String(formData.get("author")),
    pages: Number(formData.get("pages")),
    status: statusString,
    price: Number(formData.get("price")),
    pagesRead: pagesReadValue ? Number(pagesReadValue) : 0,
    format: formatString,
    suggestedBy: formData.get("suggestedBy") ? String(formData.get("suggestedBy")) : undefined,
    finished: finishedCheckbox === "on" || finishedCheckbox === "true"
  };

  const book = new Book(
    bookData.title,
    bookData.author,
    bookData.pages,
    BookStatus[statusString as keyof typeof BookStatus],
    bookData.price,
    bookData.pagesRead,
    BookFormat[formatString as keyof typeof BookFormat],
    bookData.suggestedBy,
    bookData.finished
  );

  console.log("Book instance:", book);

  await addBook(bookData);
  
  await displayBooks();
};

async function displayBooks() {
  try {
    const books = await getAllBooks();
    
    if (books.length === 0) {
      booksListContainer.innerHTML = `
        <p class="text-slate-500 text-center py-8">Aucun livre enregistré pour le moment.</p>
      `;
      return;
    }

    booksListContainer.innerHTML = '';
    
    books.forEach((book: BookResponse) => {
      const bookInstance = new Book(
        book.title,
        book.author,
        book.pages,
        book.status as BookStatus,
        book.price,
        book.pagesRead,
        book.format as BookFormat,
        book.suggestedBy,
        book.finished,
        book._id
      );

      const percentage = bookInstance.currentyAt();
      const progressColor = percentage === 100 ? "bg-green-500" : percentage >= 50 ? "bg-blue-500" : "bg-yellow-500";

      const bookCard = document.createElement('div');
      bookCard.className = 'border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow';
      bookCard.innerHTML = `
        <div class="flex justify-between items-start mb-3">
          <div class="flex-1">
            <h3 class="font-bold text-lg text-slate-800 mb-1">${escapeHtml(book.title)}</h3>
            <p class="text-sm text-slate-600 mb-2">par ${escapeHtml(book.author)}</p>
          </div>
          <button
            class="delete-btn ml-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
            data-book-id="${book._id}"
          >
            Supprimer
          </button>
        </div>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Progression:</span>
            <span class="font-semibold text-slate-800">${percentage}%</span>
          </div>
          
          <div class="w-full bg-slate-200 rounded-full h-2.5">
            <div
              class="${progressColor} h-2.5 rounded-full transition-all duration-300"
              style="width: ${percentage}%"
            ></div>
          </div>
          
          <div class="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200">
            <div class="flex items-center gap-2">
              <div>
                <span class="text-slate-500">Pages:</span>
                <span class="font-medium text-slate-700 ml-1">${book.pagesRead} / ${book.pages}</span>
              </div>
              <button
                class="update-pages-btn px-2 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 transition-colors"
                data-book-id="${book._id}"
                data-current-pages="${book.pagesRead}"
                data-total-pages="${book.pages}"
                title="Modifier le nombre de pages lues"
              >
                ✏️
              </button>
            </div>
            <div>
              <span class="text-slate-500">Prix:</span>
              <span class="font-medium text-slate-700 ml-1">$${book.price.toFixed(2)}</span>
            </div>
            <div>
              <span class="text-slate-500">Format:</span>
              <span class="font-medium text-slate-700 ml-1">${escapeHtml(book.format)}</span>
            </div>
            <div>
              <span class="text-slate-500">Statut:</span>
              <span class="font-medium text-slate-700 ml-1">${escapeHtml(book.status)}</span>
            </div>
          </div>
          
          ${book.suggestedBy ? `
            <div class="mt-2 pt-2 border-t border-slate-200">
              <span class="text-slate-500 text-xs">Suggéré par:</span>
              <span class="text-slate-700 text-xs ml-1">${escapeHtml(book.suggestedBy)}</span>
            </div>
          ` : ''}
          
          <div class="flex items-center gap-2 mt-2">
            <span class="text-slate-500 text-xs">Terminé:</span>
            <span class="text-xs font-medium ${book.finished ? 'text-green-600' : 'text-slate-400'}">
              ${book.finished ? '✓ Oui' : '✗ Non'}
            </span>
          </div>
        </div>
      `;
      
      const deleteBtn = bookCard.querySelector('.delete-btn') as HTMLButtonElement;
      deleteBtn.addEventListener('click', async () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
          try {
            await deleteBook(book._id);
            await displayBooks();
          } catch (error) {
            console.error("Error deleting book:", error);
          }
        }
      });
      
      const updatePagesBtn = bookCard.querySelector('.update-pages-btn') as HTMLButtonElement;
      updatePagesBtn.addEventListener('click', async () => {
        const currentPages = parseInt(updatePagesBtn.getAttribute('data-current-pages') || '0');
        const totalPages = parseInt(updatePagesBtn.getAttribute('data-total-pages') || '0');
        
        const newPagesRead = prompt(
          `Modifier le nombre de pages lues (max: ${totalPages}):`,
          currentPages.toString()
        );
        
        if (newPagesRead !== null) {
          const pagesReadNum = parseInt(newPagesRead);
          
          if (isNaN(pagesReadNum) || pagesReadNum < 0) {
            alert("Veuillez entrer un nombre valide (≥ 0)");
            return;
          }
          
          if (pagesReadNum > totalPages) {
            alert(`Le nombre de pages lues ne peut pas dépasser le total (${totalPages})`);
            return;
          }
          
          try {
            await updateBookPages(book._id, pagesReadNum);
            await displayBooks();
          } catch (error) {
            console.error("Error updating pages:", error);
            alert("Erreur lors de la mise à jour des pages lues");
          }
        }
      });
      
      booksListContainer.appendChild(bookCard);
    });
  } catch (error) {
    console.error("Error displaying books:", error);
    booksListContainer.innerHTML = `
      <p class="text-red-500 text-center py-8">Erreur lors du chargement des livres.</p>
    `;
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

refreshBtn.addEventListener("click", async () => {
  await displayBooks();
});

window.addEventListener("DOMContentLoaded", async () => {
  await displayBooks();
});

export { addBook, getAllBooks, getBookById, updateBook, deleteBook, displayBooks };
