import { useQuery } from '@tanstack/react-query';

import Modal from '../Modal';
import { Section } from '../Book';
import { LoadingSkeleton } from '@/components';
import { getBookDetail, displayDate } from '@/services';

import './styles.scss';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedId: number | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedId,
}) => {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['book', selectedId],
    queryFn: () => getBookDetail(selectedId),
  });

  const content = () => {
    if (isLoading) return <LoadingSkeleton type="modal" />;
    if (isError) return <div>Error</div>;
    if (data) {
      return (
        <div className="confirmation-modal">
          <h3>Are you sure?</h3>
          <div>
            <Section title="Title" content={data.title} />
            <Section title="Author" content={data.author} />
            <Section
              title="Publication Date"
              content={displayDate(data.publicationDate)}
            />
            <Section title="Description" content={data.description} />
          </div>
          <div className="confirmation-modal__action">
            <button
              className="confirmation-modal__action-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="confirmation-modal__action-delete"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {content()}
    </Modal>
  );
};

export default DeleteConfirmationModal;
