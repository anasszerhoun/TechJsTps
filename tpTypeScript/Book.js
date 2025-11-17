export var BookStatus;
(function (BookStatus) {
    BookStatus["Read"] = "Read";
    BookStatus["Reread"] = "Re-read";
    BookStatus["DNF"] = "DNF";
    BookStatus["CurrentlyReading"] = "Currently reading";
    BookStatus["ReturnedUnread"] = "Returned Unread";
    BookStatus["WantToRead"] = "Want to read";
})(BookStatus || (BookStatus = {}));
export var BookFormat;
(function (BookFormat) {
    BookFormat["Print"] = "Print";
    BookFormat["PDF"] = "PDF";
    BookFormat["Ebook"] = "Ebook";
    BookFormat["AudioBook"] = "AudioBook";
})(BookFormat || (BookFormat = {}));
class Book {
    constructor(title, author, pages, status, price, pagesRead, format, suggestedBy, finished, _id) {
        this._id = _id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = finished;
    }
    currentyAt() {
        if (this.pages === 0)
            return 0;
        return Math.round((this.pagesRead / this.pages) * 100);
    }
    async deleteBook() {
        if (!this._id) {
            throw new Error("Cannot delete book: ID is missing");
        }
        const API_URL = "http://localhost:8080";
        const response = await fetch(`${API_URL}/books/${this._id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Failed to delete book: ${response.statusText}`);
        }
    }
}
export default Book;
