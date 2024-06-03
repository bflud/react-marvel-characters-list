import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

test("renders the Header component", () => {
  const logoSrc = "https://www.objective.com.br/wp-content/uploads/2020/11/logo.svg";
  const name = "Peter Parker";
  const title = "Full Stack Developer";
  const squareText = "PP";

  const { getByAltText, getByTestId, getByText } = render(
    <Header logoSrc={logoSrc} name={name} title={title} squareText={squareText} />
  );

  const logo = getByAltText("Logo");
  expect(logo).toBeTruthy();
  expect(logo.getAttribute("src")).toBe(logoSrc);

  expect(getByTestId("mobile-title")).toBeTruthy();
  expect(getByTestId("desktop-title")).toBeTruthy();
  expect(getByTestId("mobile-title").textContent).toBe(title);
  expect(getByTestId("desktop-title").textContent).toBe(title);

  expect(getByText(name)).toBeTruthy();
  expect(getByText(squareText)).toBeTruthy();
});
