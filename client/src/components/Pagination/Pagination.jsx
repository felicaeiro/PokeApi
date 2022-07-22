import React from 'react';

const Pagination = ({ pokesPerPage, totalPokes, onPagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokes / pokesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() =>
                onPagination({ currentPage: number, pokesPerPage: 12 })
              }
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
