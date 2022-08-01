import React from 'react';
import s from './Pokemons.module.css';
import PokemonCard from '../PokemonCard/PokemonCard';
import card from '../../img/card.png';
import Pagination from '../Pagination/Pagination';
import SideBar from '../SideBar/SideBar';

const Pokemons = ({
  pokesToRender,
  totalPokemons,
  currentPage,
  filteredTypes,
  filteredSources,
  onPagination,
  handleSelectFilter,
}) => {
  return (
    <div className={s.container}>
      <div className={s.topContainer}>
        <div className={s.sideBar}>
          <SideBar
            filteredTypes={filteredTypes}
            filteredSources={filteredSources}
            handleSelectFilter={handleSelectFilter}
          />
        </div>
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
        pokesPerPage={12}
        totalPokes={totalPokemons}
        onPagination={onPagination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Pokemons;
