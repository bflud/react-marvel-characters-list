import React from "react";

import { render, fireEvent, act } from '@testing-library/react';
import Pagination from "./Pagination";
describe('Pagination component', () => {
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



    const mockOnPageChange = jest.fn();


    it('should render pagination with 5 pages and active page 3', () => {
        const { container, getByText } = render(
            <Pagination totalPages={5} activePage={3} onPageChange={mockOnPageChange} />
        );

        const paginationItems = container.querySelectorAll('.page-item');
        expect(paginationItems.length).toBe(7); // 5 pages + previous + next

        expect(getByText('Anterior')).toBeTruthy();
        expect(getByText('Próximo')).toBeTruthy();
        expect(getByText('1')).toBeTruthy();
        expect(getByText('2')).toBeTruthy();
        expect(getByText('3')).toBeTruthy();
        expect(getByText('4')).toBeTruthy();
        expect(getByText('5')).toBeTruthy();

        fireEvent.click(getByText('2')); // Simulate clicking page 2
        expect(mockOnPageChange).toHaveBeenCalledWith(2);

        fireEvent.click(getByText('Próximo')); // Simulate clicking next
        expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it('should render pagination with 10 pages and active page 10', () => {
        const { container, getByText } = render(
            <Pagination totalPages={10} activePage={10} onPageChange={mockOnPageChange} />
        );

        const paginationItems = container.querySelectorAll('.page-item');
        expect(paginationItems.length).toBe(12); // 10 pages + previous + next

        expect(getByText('Anterior')).toBeTruthy();
        expect(getByText('Próximo')).toBeTruthy();
        expect(getByText('1')).toBeTruthy();
        expect(getByText('2')).toBeTruthy();
        expect(getByText('3')).toBeTruthy();
        expect(getByText('4')).toBeTruthy();
        expect(getByText('5')).toBeTruthy();
        expect(getByText('6')).toBeTruthy();
        expect(getByText('7')).toBeTruthy();
        expect(getByText('8')).toBeTruthy();
        expect(getByText('9')).toBeTruthy();
        expect(getByText('10')).toBeTruthy();

        fireEvent.click(getByText('Anterior')); // Simulate clicking previous
        expect(mockOnPageChange).toHaveBeenCalledWith(9);

        fireEvent.click(getByText('6')); // Simulate clicking page 6
        expect(mockOnPageChange).toHaveBeenCalledWith(6);
    });
});