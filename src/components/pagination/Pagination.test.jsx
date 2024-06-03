import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  test('renders the Pagination component', () => {
    const totalPages = 5;
    const activePage = 3;
    const handlePageChange = jest.fn();

    const { getByText } = render(
      <Pagination
        totalPages={totalPages}
        activePage={activePage}
        onPageChange={handlePageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );

    expect(getByText('primeiro')).toBeTruthy();
    expect(getByText('anterior')).toBeTruthy();
    expect(getByText('proximo')).toBeTruthy();
    expect(getByText('ultimo')).toBeTruthy();

    for (let i = 1; i <= totalPages; i++) {
      expect(getByText(i.toString())).toBeTruthy();
    }

    fireEvent.click(getByText('2'));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  test('disables previous button on first page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        totalPages={totalPages}
        activePage={1}
        onPageChange={handlePageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );

    const previousButton = getByText('anterior');
    expect(previousButton.parentElement.classList.contains('disabled')).toBe(true);
  });

  test('does not disable next button on first page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        totalPages={totalPages}
        activePage={1}
        onPageChange={handlePageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );

    const nextButton = getByText('proximo');
    expect(nextButton.parentElement.classList.contains('disabled')).toBe(false);
  });

  test('disables next button on last page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText, rerender } = render(
      <Pagination
        totalPages={totalPages}
        activePage={1}
        onPageChange={handlePageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );

    const nextButton = getByText('proximo');
    rerender(
      <Pagination
        totalPages={totalPages}
        activePage={totalPages}
        onPageChange={handlePageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );
    expect(nextButton.parentElement.classList.contains('disabled')).toBe(true);
  });

  test('does not disable previous button on last page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText, rerender } = render(
      <Pagination
        totalPages={totalPages}
        activePage={1}
        onPageChange={handlePageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );

    const previousButton = getByText('anterior');
    rerender(
      <Pagination
        totalPages={totalPages}
        activePage={totalPages}
        onPageChange={handlePageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );
    expect(previousButton.parentElement.classList.contains('disabled')).toBe(false);
  });

  test('does not call handlePageChange when clicking next button on last page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        totalPages={totalPages}
        activePage={totalPages}
        onPageChange={handlePageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );

    const nextButton = getByText('proximo');
    fireEvent.click(nextButton);
    expect(handlePageChange).not.toHaveBeenCalled();
  });

  const mockOnPageChange = jest.fn();

  test('should render pagination with 5 pages and active page 3', () => {
    const { container, getByText } = render(
      <Pagination
        totalPages={5}
        activePage={3}
        onPageChange={mockOnPageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );
  
    const paginationItems = container.querySelectorAll('.page-item');
    expect(paginationItems.length).toBe(9); 
  
    expect(getByText('primeiro')).toBeTruthy();
    expect(getByText('anterior')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('proximo')).toBeTruthy();
    expect(getByText('ultimo')).toBeTruthy();
  
    fireEvent.click(getByText('2'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  
    fireEvent.click(getByText('proximo'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  test('should render pagination with 10 pages and active page 10', () => {
    const { container, getByText } = render(
      <Pagination
        totalPages={10}
        activePage={10}
        onPageChange={mockOnPageChange}
        prevText="anterior"
        nextText="proximo"
        firstText="primeiro"
        lastText="ultimo"
      />
    );
  
    const paginationItems = container.querySelectorAll('.page-item');
    expect(paginationItems.length).toBe(9); // 5 botões de página + anterior, próximo, primeiro, último
  
    expect(getByText('primeiro')).toBeTruthy();
    expect(getByText('proximo')).toBeTruthy();
    expect(getByText('6')).toBeTruthy(); // Página atual - 2
    expect(getByText('7')).toBeTruthy(); // Página atual - 1
    expect(getByText('8')).toBeTruthy(); // Página atual
    expect(getByText('9')).toBeTruthy(); // Página atual + 1
    expect(getByText('10')).toBeTruthy(); // Página atual + 2
  
    fireEvent.click(getByText('anterior'));
    expect(mockOnPageChange).toHaveBeenCalledWith(9);
  
    fireEvent.click(getByText('6'));
    expect(mockOnPageChange).toHaveBeenCalledWith(6);
  });
  
});
