import React from "react";
import { render } from "@testing-library/react";

import Card, { formatText } from "./Card";

describe("Card component", () => {
  const characters = [
    {
      imageUrl: "https://example.com/image.jpg",
      name: "John Doe",
      age: "30",
      gender: "Male",
      city: "New York",
    },
    {
      imageUrl: "https://example.com/image2.jpg",
      name: "Jane Doe",
      age: "25",
      gender: "Female",
      city: "Los Angeles",
    },
  ];

  const headers = ["name", "age", "gender", "city"];

  test("renders the Card component", () => {
    const { getByText } = render(<Card characters={characters} headers={headers} />);

    characters.forEach((character) => {
      expect(getByText(character.name)).toBeTruthy();
      expect(getByText(character.age)).toBeTruthy();
      expect(getByText(character.gender)).toBeTruthy();
      expect(getByText(character.city)).toBeTruthy();
    });
  });



  test("formats text with commas into spans", () => {
    const text = "Hello, world, this, is, a, test";
    const formattedText = formatText(text);

    expect(formattedText).toHaveLength(6);

    formattedText.forEach((item, index) => {
      expect(item.type).toBe("span");
      expect(item.key).toBe(index.toString());
    });
  });
});

