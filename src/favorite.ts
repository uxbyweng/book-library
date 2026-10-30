// src/favorite.ts

import type { Book, FavoriteBook } from "./book.js";

const STORAGE_KEY = "favorites";

// favoriten aus localStorage lesen
export function getFavorites(): FavoriteBook[] {
    // gespeicherten text holen
    const saved = localStorage.getItem(STORAGE_KEY);

    // wenn noch nichts gespeichert: leere liste (keine favoriten)
    if (saved === null) {
        return [];
    }

    // text in liste umwandeln
    const favorites: FavoriteBook[] = JSON.parse(saved);
    return favorites;
}

// favorit toggle (gibt zurück ob book jetzt ein favorit ist)
export function toggleFavorite(book: Book): boolean {
    let favorites = getFavorites();

    // ist book schon geliked? (true / false)
    const isFavorite = favorites.some((favorite) => favorite.isbn === book.isbn);

    if (isFavorite) {
        // entfernen: liste ohne dieses book
        favorites = favorites.filter((favorite) => favorite.isbn !== book.isbn);
    } else {
        // hinzufügen: nur die felder speichern, die die favoriten-tabelle braucht
        favorites.push({
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
        });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    console.log(favorites);
    return !isFavorite;
}
