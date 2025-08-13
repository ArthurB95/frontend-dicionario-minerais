import React from "react";
import "../SearchBar/SearchBar.css"

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <input
        className="style-bar"
        type="text"
        placeholder="Digite o mineral que deseja procurar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.replace(/\s+/g, " "))}
      />
    </div>
  );
};

export default SearchBar;