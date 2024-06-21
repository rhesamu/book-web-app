import { useState } from 'react';
import './styles.scss';

interface LoadingSkeletonProps {
  type: 'main' | 'form';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'main'}) => {
  const [skeletons] = useState<number>(type === 'form' ? 3 : 6);
  return (
    <div className='loading-skeleton'>
      {Array.from(Array(skeletons)).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className='loading-skeleton__item'
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
