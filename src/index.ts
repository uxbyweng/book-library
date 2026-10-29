// src/index.ts
// console.log("is running");

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
            console.log(bookCount);
            row.append(like, title, isbn, author, publisher, detail);
            return row;
        }),
    );
    h2.textContent = bookCount.toString();
};

const API_URL = "http://localhost:4730/books";
const books = await fetchBooks(API_URL);
render(books);

// const test: Book[] = [
//     {
//         id: "0",
//         isbn: "978074753269",
//         title: "Sapiens",
//         subtitle: "A Brief History of Humankind",
//         abstract:
//             "One hundred thousand years ago, at least six human species inhabited the earth. Today there is just one. Us. Sapiens explores how an unremarkable ape became the ruler of planet Earth ...",
//         author: "Yuval Noah Harari",
//         publisher: "Harper",
//         numPages: 443,
//         cover: "/covers/9780062316097.png",
//     },
// ];
// console.log(test);
