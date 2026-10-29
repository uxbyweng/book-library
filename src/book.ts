// src/books.ts

// Typisierung eines 'Book' so wie es von der API kommt
export interface Book {
    id: string;
    isbn: string;
    title: string;
    subtitle?: string; // optional
    abstract: string;
    author: string;
    publisher: string;
    numPages: number;
    cover: string;
}

function isBook(value: unknown): value is Book {
    // Type Guard
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        typeof value.id === "string" &&
        "isbn" in value &&
        typeof value.isbn === "string" &&
        "title" in value &&
        typeof value.title === "string" &&
        "abstract" in value &&
        typeof value.abstract === "string" &&
        "author" in value &&
        typeof value.author === "string" &&
        "publisher" in value &&
        typeof value.publisher === "string" &&
        "numPages" in value &&
        typeof value.numPages === "number" &&
        "cover" in value &&
        typeof value.cover === "string"
    );
}

// Bücher von der API fetchen (nur die validen)
export async function fetchBooks(url: string): Promise<Book[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("Expected a list of books");
    }

    return data.filter(isBook);
}

// nur ein Book
export async function fetchBook(url: string): Promise<Book> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isBook(data)) {
        throw new Error("Unexpected book data");
    }

    return data;
}
