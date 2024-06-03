import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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

  
  
  
  