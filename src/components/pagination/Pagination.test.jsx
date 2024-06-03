import React from "react";

import { render, fireEvent, act } from '@testing-library/react';
import Pagination from "./Pagination";

test("renders the Pagination component", () => {
  const totalPages = 5;
  const activePage = 3;
  const handlePageChange = jest.fn();

  const { getByText } = render(
    <Pagination totalPages={totalPages} activePage={activePage} onPageChange={handlePageChange} />
  );

  // Test if the previous and next buttons are rendered
  expect(getByText("Anterior")).toBeTruthy();
  expect(getByText("Próximo")).toBeTruthy();

  // Test if all page buttons are rendered
  for (let i = 1; i <= totalPages; i++) {
    expect(getByText(i.toString())).toBeTruthy();
  }

  // Test onClick event for page buttons
  fireEvent.click(getByText("2"));
  expect(handlePageChange).toHaveBeenCalledWith(2);
});


test('disables previous button on first page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={totalPages} activePage={1} onPageChange={handlePageChange} />
    );
  
    const previousButton = getByText('Anterior');
    expect(previousButton.parentElement.classList.contains('disabled')).toBe(true);
  });
  
  test('does not disable next button on first page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={totalPages} activePage={1} onPageChange={handlePageChange} />
    );
  
    const nextButton = getByText('Próximo');
    expect(nextButton.parentElement.classList.contains('disabled')).toBe(false);
  });
  
  test('disables next button on last page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText, rerender } = render(
      <Pagination totalPages={totalPages} activePage={1} onPageChange={handlePageChange} />
    );
  
    const nextButton = getByText('Próximo');
    rerender(<Pagination totalPages={totalPages} activePage={totalPages} onPageChange={handlePageChange} />);
    expect(nextButton.parentElement.classList.contains('disabled')).toBe(true);
  });
  
  test('does not disable previous button on last page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText, rerender } = render(
      <Pagination totalPages={totalPages} activePage={1} onPageChange={handlePageChange} />
    );
  
    const previousButton = getByText('Anterior');
    rerender(<Pagination totalPages={totalPages} activePage={totalPages} onPageChange={handlePageChange} />);
    expect(previousButton.parentElement.classList.contains('disabled')).toBe(false);
  });
  
  test('does not call handlePageChange when clicking next button on last page', () => {
    const totalPages = 5;
    const handlePageChange = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={totalPages} activePage={totalPages} onPageChange={handlePageChange} />
    );
  
    const nextButton = getByText('Próximo');
    fireEvent.click(nextButton);
    expect(handlePageChange).not.toHaveBeenCalled();
  });