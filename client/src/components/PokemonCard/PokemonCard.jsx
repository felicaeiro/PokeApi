import React from 'react';
import s from './PokemonCard.module.css';

export default function PokemonCard({ name, types, img }) {
  return (
    <div className={`${s.container}`}>
      <h1>{name}</h1>
      <img src={img} alt={name} width="100px" />
      <ul>
        {types.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
