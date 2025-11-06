import React from 'react';
import { Button } from './ui/button';

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface PaginationProps {
  pageInfo: PageInfo;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageInfo, onNext, onPrevious }) => {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      <Button onClick={onPrevious} disabled={!pageInfo.hasPreviousPage}>
        Previous
      </Button>
      <Button onClick={onNext} disabled={!pageInfo.hasNextPage}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
