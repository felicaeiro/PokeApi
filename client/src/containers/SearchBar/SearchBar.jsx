import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import s from './SearchBar.module.css';

export default function SearchBar() {
  const [poke, setPoke] = useState('');
  const [notValid, setNotValid] = useState('');

  const history = useHistory();

  const { allPokemon } = useSelector((state) => state.data);

  const handleChange = (e) => {
    setPoke(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (poke === '') setNotValid('A Pokemon name is required');
    else {
      const searchedPoke = allPokemon.filter((p) => p.name === poke);
      if (searchedPoke.length) {
        history.push(`/home/search/${poke}`);
      } else setNotValid(`The Pokemon ${poke} doesn't exist`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={poke}
        onChange={handleChange}
        placeholder="Enter Pokemon name..."
        className={notValid && s.danger}
      />
      {notValid && <span className={`${s.danger}`}>{notValid}</span>}
      <br />
      <input type="submit" value="Search Pokemon" />
    </form>
  );
}
