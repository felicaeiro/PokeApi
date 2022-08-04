import React from 'react';
import s from './Pagination.module.css';

const Pagination = ({
  pokesPerPage,
  totalPokes,
  currentPage,
  onPagination,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokes / pokesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={s.pagination}>
      {currentPage === 1 ? (
        <></>
      ) : (
        <button
          onClick={() =>
            onPagination({ currentPage: currentPage - 1, pokesPerPage: 12 })
          }
          className={s.page}
        >
          Prev
        </button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() =>
            onPagination({ currentPage: number, pokesPerPage: 12 })
          }
          className={(currentPage === number && s.activePage) || s.page}
        >
          {number}
        </button>
      ))}
      {currentPage === pageNumbers.length ? (
        <></>
      ) : (
        <button
          onClick={() =>
            onPagination({ currentPage: currentPage + 1, pokesPerPage: 12 })
          }
          className={s.page}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
