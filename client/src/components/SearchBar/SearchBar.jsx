import React from 'react';
import s from './SearchBar.module.css';

export default function SearchBar({ pokeSearch, handleSearch }) {
  const handleChange = (e) => {
    handleSearch(e.target.value.toLowerCase());
  };

  return (
    <div className={s.searchWrapper}>
      <form className={s.inputHolder}>
        <input
          type="text"
          value={pokeSearch}
          onChange={handleChange}
          placeholder="Enter Pokemon name..."
          className={s.input}
        />
        <i className={`fa-solid fa-magnifying-glass ${s.searchIcon}`} />
      </form>
    </div>
  );
}
