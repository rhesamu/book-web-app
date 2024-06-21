import { useState } from 'react';
import './styles.scss';

interface LoadingSkeletonProps {
  type: 'main' | 'form' | 'modal';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'main' }) => {
  const count = () => {
    switch (type) {
      case 'form':
        return 3;
      case 'modal':
        return 2;
      case 'main':
      default:
        return 6;
    }
  };

  const [skeletons] = useState<number>(() => count());
  return (
    <div className="loading-skeleton">
      {Array.from(Array(skeletons)).map((_, index) => (
        <div key={`skeleton-${index}`} className="loading-skeleton__item" />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
