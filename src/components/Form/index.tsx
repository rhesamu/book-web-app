import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Book } from '@/types';

import './styles.scss';

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
    <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-input__container'>
        <label>Title</label>
        <input type='text' className='form-input__element input-text' { ...register('title', { required: true }) } />
        {errors.title && <span className='input-error'>Title is required</span>}
      </div>

      <div className='form-input__container'>
        <label>Author</label>
        <input type='text' className='form-input__element input-text' { ...register('author', { required: true }) } />
        {errors.author && <span className='input-error'>Author is required</span>}
      </div>

      <div className='form-input__container'>
        <label>Description</label>
        <textarea className='form-input__element input-text-area' { ...register('description', { required: true }) } />
        {errors.description && <span className='input-error'>Description is required</span>}
      </div>

      <div className='form-input__container'>
        <label>Cover URL</label>
        <input type='text' className='form-input__element input-text' { ...register('cover', { required: true }) } />
        {errors.cover && <span className='input-error'>Cover is required</span>}
      </div>

      <div className='form-input__container'>
        <label>Publication Date</label>
        <input type='date' className='form-input__element input-date' { ...register('publicationDate', { required: true }) } />
        {errors.publicationDate && <span className='input-error'>Date is required</span>}
      </div>

      <div className='form-input__container'>
        <button className='button-primary' type='submit'>{submitText()}</button>
      </div>
    </form>
  );
};

export default Form;