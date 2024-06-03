import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";


describe("Input component", () => {
    test("renders the Input component title and subtitle", () => {
        const title = "Busca de personagens";
        const subtitle = "Nome do personagem";

        const { getByText } = render(
            <Input title={title} subtitle={subtitle} />
        );

        expect(getByText(title)).toBeTruthy();
        expect(getByText(subtitle)).toBeTruthy();
    });

    test("renders the Input component with placeholder", () => {
        const placeholder = "Search...";

        const { getByPlaceholderText } = render(
            <Input placeholder={placeholder} />
        );

        const inputElement = getByPlaceholderText(placeholder);
        expect(inputElement).toBeTruthy();
    });

    test("updates input value when typing", () => {
        const placeholder = "Search...";
        const inputValue = "Spider-Man";

        const { getByPlaceholderText } = render(
            <Input placeholder={placeholder} />
        );

        const inputElement = getByPlaceholderText(placeholder);
        fireEvent.change(inputElement, { target: { value: inputValue } });
        expect(inputElement.value).toBe(inputValue);
    });

    test("executes onChange function when input value changes", () => {
        const mockOnChange = jest.fn();

        const { getByPlaceholderText } = render(
            <Input
                title="Test Title"
                subtitle="Test Subtitle"
                placeholder="Test Placeholder"
                icon="test-icon"
                onChange={mockOnChange}
            />
        );

        const inputElement = getByPlaceholderText("Test Placeholder");

        fireEvent.change(inputElement, { target: { value: "test" } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });


    test("should call setError when input value is invalid", () => {
        const validate = jest.fn().mockReturnValue(false);
        const errorMessage = "Invalid input";
        const { getByPlaceholderText, getByText } = render(
            <Input
                title="Test Input"
                subtitle="Subtitle"
                placeholder="Enter text"
                icon="user"
                validate={validate}
                errorMessage={errorMessage}
            />
        );

        const input = getByPlaceholderText("Enter text");
        fireEvent.change(input, { target: { value: "invalid" } });

        expect(validate).toHaveBeenCalledWith("invalid");
        expect(getByText("Invalid input")).toBeTruthy();
    });

    test("should not call setError when input value is valid", () => {
        const validate = jest.fn().mockReturnValue(true);
        const errorMessage = "Invalid input";
        const { getByPlaceholderText, queryByText } = render(
            <Input
                title="Test Input"
                subtitle="Subtitle"
                placeholder="Enter text"
                icon="user"
                validate={validate}
                errorMessage={errorMessage}
            />
        );

        const input = getByPlaceholderText("Enter text");
        fireEvent.change(input, { target: { value: "valid" } });

        expect(validate).toHaveBeenCalledWith("valid");
        expect(queryByText("Invalid input")).toBeNull();
    });



    test("should call onFocus when input is focused", () => {
        const onFocus = jest.fn();
        const { getByPlaceholderText } = render(
            <Input
                title="Test Input"
                subtitle="Subtitle"
                placeholder="Enter text"
                icon="user"
                onFocus={onFocus}
            />
        );

        const input = getByPlaceholderText("Enter text");
        fireEvent.focus(input);

        expect(onFocus).toHaveBeenCalled();
    });

    test("should call onBlur when input is blurred", () => {
        const onBlur = jest.fn();
        const { getByPlaceholderText } = render(
            <Input
                title="Test Input"
                subtitle="Subtitle"
                placeholder="Enter text"
                icon="user"
                onBlur={onBlur}
            />
        );

        const input = getByPlaceholderText("Enter text");
        fireEvent.blur(input);

        expect(onBlur).toHaveBeenCalled();
    });
});
