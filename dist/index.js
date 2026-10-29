// src/index.ts
import { fetchBooks } from "./book.js";
const API_URL = "http://localhost:4730/books";
const form = document.getElementById("search-form");
const tbody = document.getElementById("book-table");
const heading = document.getElementById("book-count");
const select = document.getElementById("by-publisher");
if (!(form instanceof HTMLFormElement)) {
    throw new Error("Element #search-form not found");
}
if (!(tbody instanceof HTMLTableSectionElement)) {
    throw new Error("Element #book-table not found");
}
if (!(heading instanceof HTMLHeadingElement)) {
    throw new Error("Element #book-count not found");
}
if (!(select instanceof HTMLSelectElement)) {
    throw new Error("Element #by-publishe not found");
}
const showError = (error) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    heading.textContent = "0 Books displayed";
    tbody.replaceChildren();
    const cell = tbody.insertRow().insertCell();
    cell.colSpan = 6;
    cell.textContent = `Could not load books: ${message}`;
};
const search = async () => {
    // formular auslesen
    const data = new FormData(form);
    const query = data.get("query");
    const dropdown = data.get("publisher");
    const title = typeof query === "string" ? query.trim() : "";
    const publisher = typeof dropdown === "string" ? dropdown : "";
    // url-parameter setzen (nur wenn vorhanden)
    const params = new URLSearchParams();
    if (title !== "") {
        params.set("title_like", title);
    }
    if (publisher !== "") {
        params.set("publisher", publisher);
    }
    // API Abfrage url bauen
    let url = API_URL;
    if (params.size > 0) {
        url = `${API_URL}?${params}`;
        console.log(url); // ->  ?title_like=harry&publisher=Bloomsbury
    }
    // books anzeigen
    try {
        // erneutes auslesen der books (mit such/filter parameter)
        render(await fetchBooks(url));
    }
    catch (error) {
        showError(error);
    }
};
form.addEventListener("submit", (event) => {
    event.preventDefault();
    void search(); // bewusst nicht abgewartet
});
select.addEventListener("change", () => {
    void search(); // bewusst nicht abgewartet
});
const render = (results) => {
    // anzahl angezeigter books
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
const renderPublisher = (results) => {
    // publischer einsammeln (1x je vorkommen mit 'Set')
    const publishers = new Set();
    for (const book of results) {
        publishers.add(book.publisher);
    }
    // eine option pro publisher anlegen
    for (const name of publishers) {
        const option = document.createElement("option");
        option.value = name; // publisher als value eintrage
        option.textContent = name;
        select.append(option);
    }
};
// beim laden der seite
const init = async () => {
    try {
        // initial alle books auslesen ...
        const books = await fetchBooks(API_URL);
        // ... und anzeigen
        render(books);
        // genauso alle publisher
        renderPublisher(books);
    }
    catch (error) {
        showError(error);
    }
};
void init();
//# sourceMappingURL=index.js.map