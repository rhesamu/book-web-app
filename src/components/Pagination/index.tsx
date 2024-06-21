import './styles.scss';

interface PaginationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  totalPages?: number;
  handleChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  handleChange,
  totalPages = 0,
  ...props
}) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handleChange(index + 1)}
          {...props}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
