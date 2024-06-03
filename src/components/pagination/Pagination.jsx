import React from 'react';

const Pagination = ({ totalPages, activePage, onPageChange, prevText = '<', nextText = '>', firstText = '<<', lastText = '>>' }) => {
  const pages = [];
  const maxPages = 5; // Máximo de páginas exibidas (além do primeiro e último)
  const sidePages = Math.floor((maxPages - 1) / 2); // Número de páginas de cada lado da página atual
  let startPage = Math.max(1, activePage - sidePages);
  let endPage = Math.min(totalPages, activePage + sidePages);

  // Se o número de páginas próximas à página atual for menor que o máximo, ajusta para mostrar o máximo
  if (endPage - startPage < maxPages - 1) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxPages - 1);
    } else {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination" style={{ marginRight: '15px' }}>
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(1)} tabIndex="-1" style={{ display: activePage === 1 ? 'none' : 'inline-block' }}>{firstText}</button>
        </li>
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(activePage - 1)} tabIndex="-1">{prevText}</button>
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
            {nextText}
          </button>
        </li>
        <li className={`page-item ${activePage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(totalPages)} style={{ display: activePage === totalPages ? 'none' : 'inline-block' }}>{lastText}</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
