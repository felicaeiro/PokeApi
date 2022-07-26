import React from 'react';
import { Link } from 'react-router-dom';
import s from './PokemonCard.module.css';

export default function PokemonCard({ id, name, types, img }) {
  return (
    <div className={`${s.container}`}>
      <Link to={`/pokemonDetail/${id}`}>
        <h1>{name}</h1>
        <img src={img} alt={name} width="100px" />
      </Link>
      <ul>
        {types.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
