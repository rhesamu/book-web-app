import { useQuery } from '@tanstack/react-query';

import Modal from '../Modal';
import { Section } from '../Book';
import { getBookDetail, displayDate } from '@/services';

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId: number | null;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ isOpen, onClose, selectedId }) => {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['book', selectedId],
    queryFn: () => getBookDetail(selectedId),
  });

  const content = () => {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    if (data) {
      return (
        <div>
          <h2>{data.title}</h2>
          <Section title='Author' content={data.author} />
          <Section title='Publication Date' content={displayDate(data.publicationDate)} />
          <Section title='Description' content={data.description} />
        </div>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {content()}
    </Modal>
  )
};

export default BookDetailsModal;