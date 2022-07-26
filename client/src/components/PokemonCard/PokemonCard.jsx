import React from 'react';
import { Link } from 'react-router-dom';
import s from './PokemonCard.module.css';

export default function PokemonCard({ id, name, types, img }) {
  return (
    <div className={`${s.container}`}>
      <Link to={`/pokemonDetail/${id}`}>
        <h1>{name.charAt(0).toUpperCase() + name.substring(1)}</h1>
        <img src={img} alt={name} width="100px" />
      </Link>
      <ul>
        {types.map((t, i) => (
          <li key={i}>{t.charAt(0).toUpperCase() + t.substring(1)}</li>
        ))}
      </ul>
    </div>
  );
}
