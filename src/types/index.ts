export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  publicationDate: string;
  isFavorite?: boolean;
};

export type Books = Book[];
