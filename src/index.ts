// src/index.ts

import { fetchBooks } from "./book.js";
import type { Book } from "./book.js";

const tbody = document.getElementById("book-table");
const h2 = document.getElementById("book-count");

if (!(tbody instanceof HTMLTableSectionElement)) {
    throw new Error("Element #book-table not found");
}
if (!(h2 instanceof HTMLHeadingElement)) {
    throw new Error("Element #book-count not found");
}

let bookCount: number = 0;

const render = (results: Book[]): void => {
    tbody.replaceChildren(
        ...results.map((book) => {
            const row = document.createElement("tr");

            const like = document.createElement("td"); // tbd. like button
            like.append();

            const title = document.createElement("td");
            title.append(book.title);

            const isbn = document.createElement("td");
            isbn.append(book.isbn);

            const author = document.createElement("td");
            author.append(book.author);

            const publisher = document.createElement("td");
            publisher.append(book.publisher);

            const detail = document.createElement("td"); // tbd. detail button
            detail.append();

            // zähle alle Bücher
            bookCount++;
            row.append(like, title, isbn, author, publisher, detail);
            return row;
        }),
    );
    // Anzahl der Bücher in der H2 Headline ausgeben
    h2.textContent = `${bookCount.toString()} Books displayed`;
};

const API_URL = "http://localhost:4730/books";
const books = await fetchBooks(API_URL);
render(books);
