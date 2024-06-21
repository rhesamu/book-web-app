import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getBooks, deleteLocalBook, getLocalFavorites } from '@/services';
import { useFavorites } from '@/hooks';

import { Book, Pagination, BookDetailsModal, DeleteConfirmationModal, LoadingSkeleton } from '@/components';
import { Book as BookType } from '@/types';

import './styles.scss';

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
  const navigate = useNavigate();
  const { favorites, handleFavorites } = useFavorites();

  const [currentPage, setCurrentPage] = useState(1);
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onClickBook = (id: number) => {
    setSelectedId(id);
    setIsBookDetailsOpen(true);
  };

  const onCloseDetailsModal = () => {
    setIsBookDetailsOpen(false);
    setSelectedId(null);
  };

  const onEdit = (id: number) => navigate(`edit/${id}`);

  const onDelete = () => {
    deleteLocalBook(Number(selectedId));
    setIsDeleteConfirmationOpen(false);
    setSelectedId(null);
    window.location.reload();
  };

  const showDeleteConfirmation = (id: number) => {
    setIsDeleteConfirmationOpen(true);
    setSelectedId(id);
  };

  const onCloseDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedId(null);
  };

  if (isLoading) {
    return <LoadingSkeleton type='main'/>;
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
        <div className='books-header'>
          <h2>Books</h2>
          <button className='button-primary' onClick={() => navigate('create')}>Create</button>
        </div>
        <ul>
          {currentItems.map((book: BookType) => (
            <li key={book.id}>
              <Book
                book={book}
                isFavorite={favorites.includes(book.id)}
                setFavorite={handleFavorites}
                handleClick={() => onClickBook(book.id)}
                onEdit={() => onEdit(book.id)}
                onDelete={() => showDeleteConfirmation(book.id)}
              />
            </li>
          ))}
        </ul>
        <Pagination handleChange={handlePageChange} totalPages={totalPages} />
        <BookDetailsModal isOpen={isBookDetailsOpen} onClose={onCloseDetailsModal} selectedId={selectedId} />
        <DeleteConfirmationModal
          selectedId={selectedId}
          isOpen={isDeleteConfirmationOpen}
          onClose={onCloseDeleteConfirmation}
          onConfirm={onDelete}
        />
      </div>
    );
  }
};

export default Books;