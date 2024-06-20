import { Book } from "@/types";

export async function getBooks() {
  let books;

  const localBooks = localStorage.getItem('books');
  if (localBooks) {
    books = JSON.parse(localBooks);
  } else {
    const response = await fetch('https://my-json-server.typicode.com/cutamar/mock/books');

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    books = await response.json();
    setLocalBooks(books);
  }

  return books;
}

export async function getBookDetail(id: number | null) {
  if (!id) return null;

  const localBooks = localStorage.getItem('books');
  if (localBooks) {
    const parsedBooks = JSON.parse(localBooks);
    return parsedBooks.find((book: { id: number }) => book.id === id);
  }

  const response = await fetch(`https://my-json-server.typicode.com/cutamar/mock/books/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch book detail');
  }

  return response.json();
}

export function setLocalBooks(books: Book[]) {
  localStorage.setItem('books', JSON.stringify(books));
}

export function addLocalBook(book: Book) {
  const localBooks = localStorage.getItem('books');

  if (localBooks) {
    const parsedBooks = JSON.parse(localBooks);
    const newId = parsedBooks[parsedBooks.length - 1]?.id + 1;
    const newBook = { ...book, id: newId };
    const newBooks = [...parsedBooks, newBook];
    setLocalBooks(newBooks);
  }
}

export function updateLocalBook(book: Book) {
  const localBooks = localStorage.getItem('books');

  if (localBooks) {
    const parsedBooks = JSON.parse(localBooks);
    const index = parsedBooks.findIndex((b: Book) => b.id === book.id);
    parsedBooks[index] = book;
    setLocalBooks(parsedBooks);
  }
}

export function deleteLocalBook(id: number) {
  const localBooks = localStorage.getItem('books');

  if (localBooks) {
    const parsedBooks = JSON.parse(localBooks);
    const filtered = parsedBooks.filter((book: Book) => book.id !== id);
    setLocalBooks(filtered);
  }
}

export function getLocalFavorites() {
  const localFavorites = localStorage.getItem('favorites');
  if (localFavorites) {
    return JSON.parse(localFavorites);
  }

  return [];
}

export function setLocalFavorites(id: number) {
  const localFavorites = getLocalFavorites();
  if (localFavorites.includes(id)) {
    const filtered = localFavorites.filter((favorite: number) => favorite !== id);
    localStorage.setItem('favorites', JSON.stringify(filtered));
  } else {
    localFavorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(localFavorites));
  }

}

export const displayDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}