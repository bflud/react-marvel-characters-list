import React from 'react';

const Pagination = ({ totalPages, activePage, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination" style={{ marginRight: '15px' }}>
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(activePage - 1)} tabIndex="-1">Anterior</button>
        </li>
        {pages.map(page => (
          <li key={page} className={`page-item ${activePage === page ? 'active' : ''}`}>
            <button className="page-link" type="button" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
        <li className={`page-item ${activePage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            type="button"
            onClick={() => {
              if (activePage < totalPages) {
                onPageChange(activePage + 1);
              }
            }}
          >
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
