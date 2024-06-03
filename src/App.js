import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Input from "./components/input/Input";
import Card from "./components/card/Card";
import Pagination from "./components/pagination/Pagination";
import charactersData from "./data/mock/charactersData";
import headersData from "./data/mock/headersData";

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const calculateTotalPages = (filteredCharacters, itemsPerPage) => {
    return Math.ceil(filteredCharacters.length / itemsPerPage);
  };
  const handleInputChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = charactersData.filter((character) =>
      character.Nome.toLowerCase().includes(searchQuery)
    );
    setFilteredCharacters(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCharacters(filteredCharacters.slice(start, end));
  }, [currentPage, filteredCharacters, itemsPerPage]);

  useEffect(() => {
    setFilteredCharacters(charactersData);
  }, []);


  return (
    <>
      <div className="d-flex justify-content-center mt-2">
        <Header
          logoSrc="https://www.objective.com.br/wp-content/uploads/2020/11/logo.svg"
          name="Bruno Fernando"
          title="Teste de Front-end"
          squareText="BF"
        />
      </div>

      <div className="container-fluid mt-3 container-content">
        <div className="px-5">
          <Input
            title="Busca de personagens"
            subtitle="Nome do personagem"
            placeholder="Search..."
            icon={faSearch}
            onChange={handleInputChange}
          />

          <Card characters={characters} headers={headersData} />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <Pagination
          totalPages={calculateTotalPages(filteredCharacters, itemsPerPage)}
          activePage={currentPage}
          onPageChange={handlePageChange}
        />

      </div>
      <footer></footer>
    </>
  );
}

export default App;
