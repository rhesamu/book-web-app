import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Form } from "@/components";
import { Book } from "@/types";
import { getBookDetail, updateLocalBook } from '@/services';

const EditBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookDetail(Number(bookId)),
  });

  const onSubmit = (data: Book) => {
    updateLocalBook(data);
    navigate('/');
  };

  const content = () => {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    if (data) {
      return (
        <Form type='edit' onSubmit={onSubmit} book={data} />
      );
    }
  }

  return (
    <div>
      <h2>Edit Book</h2>
      {content()}
    </div>
  );
};

export default EditBook;
