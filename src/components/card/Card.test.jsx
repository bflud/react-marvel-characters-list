import React from "react";
import { render } from "@testing-library/react";
import Card, { formatText } from "./Card";

describe("Card component", () => {
  const characters = [
    { imageUrl: "image1.jpg", name: "John Doe, Jane Doe", age: "30, 28" },
    { imageUrl: "image2.jpg", name: "Alice, Bob", age: "25, 27" },
  ];
  const headers = ["Name", "Age"];

  test("renders headers and characters correctly", () => {
    const { container, getByText } = render(<Card characters={characters} headers={headers} />);

    // Check if headers are rendered
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Age")).toBeInTheDocument();

    // Check if characters are rendered
    characters.forEach(character => {
      expect(container.querySelector(`[alt="${character.name}"]`)).toBeInTheDocument();
      expect(container.querySelector(`[alt="${character.age}"]`)).toBeInTheDocument();
    });
  });

  test("formatText function formats text correctly", () => {
    const text = "John Doe, Jane Doe";
    const formattedText = formatText(text);

    // Convert formattedText to string to compare correctly
    const formattedTextString = formattedText.map((node) => node.props.children).flat().join('');

    // Check if the text is split and formatted correctly
    expect(formattedTextString).toEqual("John DoeJane Doe");
  });
});
