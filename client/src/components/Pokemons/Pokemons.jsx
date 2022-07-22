import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import card from '../../img/card.png';
import Pagination from '../Pagination/Pagination';

const Pokemons = ({ pokesToRender, totalPokemons, onPagination }) => {
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

      <Pagination
        pokesPerPage={12}
        totalPokes={totalPokemons}
        onPagination={onPagination}
      />
    </div>
  );
};

export default Pokemons;
