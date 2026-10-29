// src/detail.ts
import { fetchBook } from "./book.js";
const API_URL = "http://localhost:4730/books";
const mainContainer = document.getElementById("book-details");
if (!(mainContainer instanceof HTMLElement)) {
    throw new Error("Element #book-details not found");
}
const showError = (error) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    const text = document.createElement("p");
    text.textContent = `Could not load book: ${message}`;
    mainContainer.replaceChildren(text);
};
// eine Zeile der Detailliste: <li><strong>Label:</strong> Wert</li>
// const createItem = (label: string, value: string): HTMLLIElement => {
//     const item = document.createElement("li");
//     const strong = document.createElement("strong");
//     strong.textContent = `${label}:`;
//     item.append(strong, ` ${value}`);
//     return item;
// };
// Bokk details rendern
const render = (book) => {
    // Titel
    const title = document.createElement("h1");
    title.append(book.title);
    // subtitle (optional)
    if (book.subtitle) {
        const small = document.createElement("small");
        small.textContent = book.subtitle;
        title.append(document.createElement("br"), small);
    }
    // links
    const abstractHeading = document.createElement("h3");
    abstractHeading.textContent = "Abstract";
    const abstract = document.createElement("p");
    abstract.textContent = book.abstract;
    const detailsHeading = document.createElement("h4");
    detailsHeading.textContent = "Details";
    const details = [
        { label: "Author", value: book.author },
        { label: "Publisher", value: book.publisher },
        { label: "Pages", value: String(book.numPages) },
    ];
    const list = document.createElement("ul");
    for (const detail of details) {
        const item = document.createElement("li");
        const strong = document.createElement("strong");
        strong.textContent = `${detail.label}:`; // <strong>Author:</strong>
        item.append(strong, ` ${detail.value}`); // <li><strong>Author:</strong> George R. R. Martin</li>
        list.append(item); // <li> an die <ul> hängen.
    }
    const back = document.createElement("a");
    back.href = "index.html";
    back.className = "button button-outline";
    back.textContent = "Back";
    const left = document.createElement("div");
    left.className = "column column-67";
    left.append(abstractHeading, abstract, detailsHeading, list, back);
    // rechts
    const cover = document.createElement("img");
    cover.src = book.cover;
    cover.alt = `Cover of ${book.title}`;
    const right = document.createElement("div");
    right.className = "column column-33";
    right.append(cover);
    // beide Spalten in eine Zeile
    const section = document.createElement("section");
    section.className = "row";
    section.append(left, right);
    mainContainer.replaceChildren(title, section);
};
const init = async () => {
    // ?isbn=… aus der Adresse lesen
    const isbn = new URLSearchParams(window.location.search).get("isbn");
    if (!isbn) {
        showError(new Error("No ISBN given"));
        return;
    }
    try {
        render(await fetchBook(`${API_URL}/${encodeURIComponent(isbn)}`));
    }
    catch (error) {
        showError(error);
    }
};
void init();
// console.log("is running");
// // URL-Paramter 'isbn' auslesen
// const paramsString = window.location.search;
// const searchParams = new URLSearchParams(paramsString);
// console.log(searchParams.get("isbn"));
//# sourceMappingURL=detail.js.map