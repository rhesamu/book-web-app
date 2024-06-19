import { Book as BookType } from '../../types';
import { displayDate } from '@/services';

import './styles.scss';

interface BookProps {
  book: BookType;
  setFavorite: (id: number) => void;
  isFavorite: boolean;
  handleClick?: () => void;
}

interface Section {
  title: string;
  content: string;
}

export const Section: React.FC<Section> = ({ title, content }) => {
  return (
    <div className='book__info-section'>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  )
};

const Book: React.FC<BookProps> = ({ book, setFavorite, isFavorite, handleClick, ...props }) => {
  const handleFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFavorite(book.id);
  }

   return (
    <div className='book' onClick={handleClick} {...props}>
      <div className='book__cover'>
        <img className='book__cover__image' src={book.cover} alt={book.title} />
      </div>
      <div className='book__info'>
        <h2>{book.title}</h2>
        <Section title='Author' content={book.author} />
        <Section title='Publication Date' content={displayDate(book.publicationDate)} />
        <Section title='Description' content={book.description} />
        <div>
          <button onClick={handleFavorites}>
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
      </div>
    </div>
   );
};

export default Book;