import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
<div className="pagination-container">
  <div className="results-per-page">
    <label htmlFor="rowsPerPage">Rows per page:</label>
    <select
      id="rowsPerPage"
      value={pageSize}
      onChange={(e) => onPageSizeChange(Number(e.target.value))}
    >
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>

  <div className="pagination-controls">
    <button
      onClick={() => onPageChange(1)}
      disabled={currentPage === 1}
    >
      {'<<'}
    </button>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      {'<'}
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages ||totalPages===0}
    >
      {'>'}
    </button>
    <button
      onClick={() => onPageChange(totalPages)}
      disabled={currentPage === totalPages ||totalPages===0}
    >
      {'>>'}
    </button>
  </div>
</div>

  
  );
};

export default Pagination;
