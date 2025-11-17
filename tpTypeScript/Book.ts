export enum BookStatus {
    Read = "Read",
    Reread = "Re-read",
    DNF = "DNF",
    CurrentlyReading = "Currently reading",
    ReturnedUnread = "Returned Unread",
    WantToRead = "Want to read"
}

export enum BookFormat {
    Print = "Print",
    PDF = "PDF",
    Ebook = "Ebook",
    AudioBook = "AudioBook"
}

export interface BookData {
    title: string;
    author: string;
    pages: number;
    status: string; 
    price: number;
    pagesRead: number;
    format: string; 
    suggestedBy?: string;
    finished: boolean;
}

export type BookResponse = BookData & {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
};

class Book {
    _id?: string;
    title: string;
    author: string;
    pages: number;
    status: BookStatus;
    price: number;
    pagesRead: number;
    format: BookFormat;
    suggestedBy?: string;
    finished: boolean;

    constructor(
        title: string,
        author: string,
        pages: number,
        status: BookStatus,
        price: number,
        pagesRead: number,
        format: BookFormat,
        suggestedBy: string | undefined,
        finished: boolean,
        _id?: string
    ) {
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

    currentyAt(): number {
        if (this.pages === 0) return 0;
        return Math.round((this.pagesRead / this.pages) * 100);
    }

    async deleteBook(): Promise<void> {
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
