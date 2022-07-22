import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import card from '../../img/card.png';

export const Pokemons = ({ pokesToRender }) => {
  return (
    <div>
      {pokesToRender.map((p) => (
        <PokemonCard
          id={p.id}
          key={p.id}
          name={p.name}
          types={p.types}
          img={p.img ? p.img : card}
        />
      ))}
    </div>
  );
};
