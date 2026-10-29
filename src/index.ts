// src/index.ts
// console.log("is running");

import { fetchBooks } from "./book.js";
import type { Book } from "./book.js";

const tbody = document.getElementById("book-table");

if (!(tbody instanceof HTMLTableSectionElement)) {
    throw new Error("Element #book-table not found");
}

const render = (results: Book[]): void => {
    tbody.replaceChildren(
        ...results.map((book) => {
            const row = document.createElement("tr");

            const title = document.createElement("td");
            title.append(book.title);

            const isbn = document.createElement("td");
            isbn.append(book.isbn);

            const author = document.createElement("td");
            author.append(book.author);

            const publisher = document.createElement("td");
            publisher.append(book.publisher);

            row.append(title, isbn, author, publisher);
            return row;
        }),
    );
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
