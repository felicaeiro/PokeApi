import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import card from '../../img/card.png';
import Pagination from '../Pagination/Pagination';
import SideBar from '../../containers/SideBar/SideBar';

const Pokemons = ({
  pokesToRender,
  totalPokemons,
  filteredTypes,
  filteredSources,
  onPagination,
}) => {
  return (
    <div>
      <SideBar
        filteredTypes={filteredTypes}
        filteredSources={filteredSources}
      />

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
