// src/books.ts
function isBook(value) {
    // Type Guard
    return (typeof value === "object" &&
        value !== null &&
        "id" in value &&
        typeof value.id === "string" &&
        "title" in value &&
        typeof value.title === "string" &&
        "subtitle" in value &&
        typeof value.subtitle === "string" &&
        "abstract" in value &&
        typeof value.abstract === "string" &&
        "author" in value &&
        typeof value.author === "string" &&
        "publisher" in value &&
        typeof value.publisher === "string" &&
        "numPages" in value &&
        typeof value.numPages === "number" &&
        "cover" in value &&
        typeof value.publisher === "string");
}
export {};
//# sourceMappingURL=book.js.map