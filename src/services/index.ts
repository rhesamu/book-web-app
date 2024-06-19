
export async function getBooks() {
  let books;

  // check localstorage
  const localBooks = localStorage.getItem('books');
  if (localBooks) {
    books = JSON.parse(localBooks);
  } else {
  // if empty, fetch from API
    const response = await fetch('https://my-json-server.typicode.com/cutamar/mock/books');

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    books = response.json();
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