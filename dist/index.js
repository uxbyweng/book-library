// src/index.ts
import { fetchBooks } from "./book.js";
const form = document.getElementById("search-form");
const tbody = document.getElementById("book-table");
const heading = document.getElementById("book-count");
if (!(form instanceof HTMLFormElement)) {
    throw new Error("Element #search-form not found");
}
if (!(tbody instanceof HTMLTableSectionElement)) {
    throw new Error("Element #book-table not found");
}
if (!(heading instanceof HTMLHeadingElement)) {
    throw new Error("Element #book-count not found");
}
function readQuery(form) {
    const query = new FormData(form).get("query");
    return typeof query === "string" ? query.trim().toLowerCase() : "";
}
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // reload verhindern
    const query = readQuery(form);
    if (query === "") {
        // wenn kein suchbegriff eingegeben wird
        tbody.replaceChildren();
        return;
    }
    try {
        // title_like = partial match on title, case-insensitive
        const books = await fetchBooks(`${API_URL}/?title_like=${encodeURIComponent(query)}`);
        render(books);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        tbody.innerHTML = `<tr><td col=6>Could not load books: ${message}</td></td>`;
    }
});
const render = (results) => {
    heading.textContent = `${results.length} Books displayed`;
    tbody.replaceChildren(...results.map((book) => {
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
        row.append(like, title, isbn, author, publisher, detail);
        return row;
    }));
};
const API_URL = "http://localhost:4730/books";
const books = await fetchBooks(API_URL);
render(books);
//# sourceMappingURL=index.js.map