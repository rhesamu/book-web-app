import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Book } from '@/types';

interface FormProps {
  onSubmit: (data: Book) => void;
  type: 'add' | 'edit';
  book?: Book;
}

const extractDate = (isoString: string) => {
  return isoString.split('T')[0];
};

const formatDate = (date: string) => {
  return `${date}T00:00:00.000Z`
}

const defaultValues = {
  title: '',
  author: '',
  description: '',
  cover: '',
  publicationDate: ''
}
  
const Form: React.FC<FormProps> = ({
  onSubmit: onSubmitCallback,
  type = 'add',
  book
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Book>({
    defaultValues
  });

  useEffect(() => {
    if (book && type === 'edit') {
      setValue('title', book.title);
      setValue('author', book.author);
      setValue('description', book.description);
      setValue('cover', book.cover);
      setValue('publicationDate', extractDate(book.publicationDate));
      setValue('id', book.id);
    }
  }, [book, type, setValue]);

  const onSubmit = (data: Book) => {
    const formattedData = {
      ...data,
      publicationDate: formatDate(data.publicationDate)
    }
    console.log('formattedData', formattedData);
    onSubmitCallback(formattedData);
  };

  const submitText = () => {
    switch (type) {
      case 'add':
        return 'Add Book';
      case 'edit':
        return 'Edit Book';
      default:
        return 'Submit';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input type='text' { ...register('title', { required: true }) } />
        {errors.title && <span>Title is required</span>}
      </div>

      <div>
        <label>Author</label>
        <input type='text' { ...register('author', { required: true }) } />
        {errors.author && <span>Author is required</span>}
      </div>

      <div>
        <label>Description</label>
        <textarea { ...register('description', { required: true }) } />
        {errors.description && <span>Description is required</span>}
      </div>

      <div>
        <label>Cover URL</label>
        <input type='text' { ...register('cover', { required: true }) } />
        {errors.cover && <span>Cover is required</span>}
      </div>

      <div>
        <label>Publication Date</label>
        <input type='date' { ...register('publicationDate', { required: true }) } />
        {errors.publicationDate && <span>Date is required</span>}
      </div>

      <button type='submit'>{submitText()}</button>
    </form>
  );
};

export default Form;