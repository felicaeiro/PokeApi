import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import s from './SearchBar.module.css';

export default function SearchBar({ allPokemon }) {
  const [poke, setPoke] = useState('');
  const [notValid, setNotValid] = useState('');

  const history = useHistory();

  const handleChange = (e) => {
    setPoke(e.target.value);
    setNotValid('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (poke === '') setNotValid('A Pokémon name is required');
    else {
      const searchedPoke = allPokemon.filter(
        (p) => p.name === poke.toLowerCase()
      );
      if (searchedPoke.length) {
        history.push(`/home/search/${poke}`);
      } else setNotValid(`The Pokémon ${poke} doesn't exist`);
    }
  };

  return (
    <div className={s.searchWrapper}>
      <form
        className={(notValid && s.dangerBorder) || s.inputHolder}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={poke}
          onChange={handleChange}
          placeholder="Enter Pokemon name..."
          className={`${s.input} `}
        />
        <button type="submit" className={s.searchIcon}>
          <i className="fa-solid fa-magnifying-glass" />
        </button>
      </form>
      {notValid && <span className={`${s.danger}`}>{notValid}</span>}
    </div>
  );
}
