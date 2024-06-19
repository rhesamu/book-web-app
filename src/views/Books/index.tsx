import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getBooks, getLocalFavorites } from '@/services';
import { useFavorites } from '@/hooks';

import { Book, Pagination, BookDetailsModal } from '@/components';
import { Book as BookType } from '@/types';

const Books: React.FC = () => {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    select: data => {
      const favorites = getLocalFavorites();
      return data.map((book: BookType) => ({
        ...book,
        isFavorite: favorites.includes(book.id),
      }));
    }
  });

  const { favorites, handleFavorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onClickBook = (id: number) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const onCloseDetailsModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data) {
    const itemsPerPage = 5;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    return (
      <div>
        <h1>Books</h1>
        <ul>
          {currentItems.map((book: BookType) => (
            <li key={book.id}>
              <Book
                book={book}
                isFavorite={favorites.includes(book.id)}
                setFavorite={handleFavorites}
                handleClick={() => onClickBook(book.id)}
              />
            </li>
          ))}
        </ul>
        <Pagination handleChange={handlePageChange} totalPages={totalPages} />
        <BookDetailsModal isOpen={isOpen} onClose={onCloseDetailsModal} selectedId={selectedId} />
      </div>
    );
  }
};

export default Books;