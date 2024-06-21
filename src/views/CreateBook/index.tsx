import { useNavigate } from 'react-router-dom';

import { Form } from '@/components';
import { Book } from '@/types';
import { addLocalBook } from '@/services';

const CreateBook = () => {
  const navigate = useNavigate();

  const onSubmit = (data: Book) => {
    addLocalBook(data);
    navigate('/');
  };

  return (
    <div>
      <h2>Create Book</h2>
      <Form type="add" onSubmit={onSubmit} />
    </div>
  );
};

export default CreateBook;
