import React from 'react';
import s from './Pokemons.module.css';
import PokemonCard from '../PokemonCard/PokemonCard';
import card from '../../img/card.png';
import Pagination from '../Pagination/Pagination';
import SideBar from '../SideBar/SideBar';

const Pokemons = ({
  pokesToRender,
  totalPokemons,
  pagination,
  filteredTypes,
  filteredSources,
  onPagination,
  handleSelectFilter,
}) => {
  return (
    <div className={s.container}>
      <div className={s.topContainer}>
        <SideBar
          filteredTypes={filteredTypes}
          filteredSources={filteredSources}
          handleSelectFilter={handleSelectFilter}
        />
        <div className={s.pokemons}>
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
      </div>
      <Pagination
        pagination={pagination}
        totalPokes={totalPokemons}
        onPagination={onPagination}
      />
    </div>
  );
};

export default Pokemons;
