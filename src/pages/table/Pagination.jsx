// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange, totalItems }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <span>Total: {totalItems} - Ítems por página:</span>
      <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
        {[5, 10, 20].map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
      <div className="page-numbers">
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default Pagination;
