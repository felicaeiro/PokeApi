import React from 'react';
import s from './Pokemons.module.css';
import notFound from '../../img/404.png';
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
  handleRangeFilter,
}) => {
  const handleReset = () => {
    const filterStats = [
      { key: 'hp', min: 1, max: 255 },
      { key: 'attack', min: 1, max: 200 },
      { key: 'specialAttack', min: 1, max: 200 },
      { key: 'defense', min: 1, max: 255 },
      { key: 'specialDefense', min: 1, max: 255 },
      { key: 'speed', min: 1, max: 200 },
      { key: 'weight', min: 0, max: 1000 },
      { key: 'height', min: 0, max: 20 },
    ];
    handleRangeFilter(filterStats);
  };

  return (
    <div className={s.container}>
      <div className={s.topContainer}>
        <SideBar
          filteredTypes={filteredTypes}
          filteredSources={filteredSources}
          handleSelectFilter={handleSelectFilter}
          handleRangeFilter={handleRangeFilter}
        />
        {pokesToRender.length ? (
          <div className={s.pokemons}>
            {pokesToRender.map((p) => (
              <PokemonCard
                id={p.id}
                key={p.id}
                name={p.name}
                hp={p.hp}
                attack={p.attack}
                specialAttack={p.specialAttack}
                defense={p.defense}
                specialDefense={p.specialDefense}
                speed={p.speed}
                weight={p.weight}
                height={p.height}
                types={p.types}
                img={p.img ? p.img : card}
              />
            ))}
          </div>
        ) : (
          <div className={s.notFound}>
            <p>No Pokémons match your search</p>
            <img src={notFound} alt="Pokémon not found" height="250px" />
            <button onClick={handleReset}>Reset filters</button>
          </div>
        )}
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
