// src/books.ts
function isBook(value) {
    // Type Guard
    return (typeof value === "object" &&
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
        typeof value.cover === "string");
}
export async function fetchBooks(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("Expected a list of books");
    }
    return data.filter(isBook);
}
//# sourceMappingURL=book.js.map