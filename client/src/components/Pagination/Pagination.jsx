import React from 'react';
import s from './Pagination.module.css';

const Pagination = ({ totalPokes, pagination, onPagination }) => {
  const { currentPage, pokesPerPage } = pagination;
  const totalPages = Math.ceil(totalPokes / pokesPerPage);

  const pageRange = (currentPage, totalPages) => {
    let start = currentPage - 2;
    let end = currentPage + 2;

    if (end > totalPages) {
      if (start > 0) start -= end - totalPages;
      end = totalPages;
    }
    if (start <= 0) {
      if (end < totalPages) end += 2;
      start = 1;
    }

    return {
      start: start,
      end: end,
    };
  };

  const range = pageRange(currentPage, totalPages);
  let pageNumbers = [];
  for (let i = range.start; i <= range.end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={s.container}>
      <div className={s.pagination}>
        {currentPage === 1 ? (
          <></>
        ) : (
          <button
            onClick={() =>
              onPagination({ currentPage: currentPage - 1, pokesPerPage })
            }
            className={s.page}
          >
            Prev
          </button>
        )}
        {range.start === 1 ? (
          <></>
        ) : (
          <button
            onClick={() => onPagination({ currentPage: 1, pokesPerPage })}
            className={s.page}
          >
            1...
          </button>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPagination({ currentPage: number, pokesPerPage })}
            className={(currentPage === number && s.activePage) || s.page}
          >
            {number}
          </button>
        ))}
        {range.end >= totalPages ? (
          <></>
        ) : (
          <button
            onClick={() =>
              onPagination({ currentPage: totalPages, pokesPerPage })
            }
            className={s.page}
          >
            ...{totalPages}
          </button>
        )}
        {currentPage === totalPages || totalPages === 0 ? (
          <></>
        ) : (
          <button
            onClick={() =>
              onPagination({ currentPage: currentPage + 1, pokesPerPage })
            }
            className={s.page}
          >
            Next
          </button>
        )}
      </div>
      {totalPages === 0 ? (
        <></>
      ) : (
        <div className={s.show}>
          <span>
            Show{' '}
            <select
              defaultValue={pokesPerPage}
              onChange={(e) =>
                onPagination({ currentPage: 1, pokesPerPage: e.target.value })
              }
              className={s.select}
            >
              <option label="6" value={6} />
              <option label="12" value={12} />
              <option label="20" value={20} />
              <option label="50" value={50} />
            </select>{' '}
            Pokémons
          </span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
