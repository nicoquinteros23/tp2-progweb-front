// src/components/SearchBar.jsx
import React, { useState } from 'react';
import AddBtn from '../../components/AddBtn/AddBtn';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleButtonClick = () => {
    onSearch(searchValue); // Llama a la función onSearch con el valor de búsqueda
  };

  return (
    <div className="search-bar-container">
      <input 
        type="search" 
        name="search" 
        className="search-bar" 
        placeholder="Buscar por apellido" 
        value={searchValue} 
        onChange={handleInputChange} 
      />
      {/* Reutilizamos AddBtn como botón de búsqueda */}
      <AddBtn onClick={handleButtonClick}>Buscar</AddBtn>
    </div>
  );
};

export default SearchBar;
