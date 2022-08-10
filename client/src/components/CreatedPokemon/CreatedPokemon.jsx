import React from 'react';
import { Link } from 'react-router-dom';
import PokemonDetailCard from '../PokemonDetailCard/PokemonDetailCard';
import s from './CreatedPokemon.module.css';

export default function CreatedPokemon({
  poke,
  handleClick,
  handleDelete,
  handleEdit,
  allTypes,
  allPokemon,
}) {
  return (
    <div>
      <PokemonDetailCard
        id={poke.id}
        name={poke.name}
        types={poke.types}
        weight={poke.weight}
        height={poke.height}
        hp={poke.hp}
        attack={poke.attack}
        specialAttack={poke.specialAttack}
        defense={poke.defense}
        specialDefense={poke.specialDefense}
        speed={poke.speed}
        evolutionChain={[]}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        allPokemon={allPokemon}
        allTypes={allTypes}
      />
      <div className={`${s.button} ${s[poke.types[0]]}`}>
        <button name="create" onClick={(e) => handleClick(e)}>
          Create another Pokémon
        </button>
        <Link to="/home">
          <button name="home" onClick={(e) => handleClick(e)}>
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
