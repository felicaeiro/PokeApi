import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import {
  clearEvolutionChain,
  deletePokemon,
  getAllPokemon,
  getAllTypes,
  getEvolutionChain,
  getPokemonDetail,
  resetFilters,
  updatePokemon,
} from '../../redux/actions';
import s from './PokemonDetail.module.css';
import { Link, useHistory } from 'react-router-dom';
import PokemonDetailCard from '../../components/PokemonDetailCard/PokemonDetailCard';

export default function PokemonDetail({ match }) {
  const { idPokemon } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPokemonDetail(idPokemon));
    if (Number(idPokemon)) {
      dispatch(getEvolutionChain(idPokemon));
    } else {
      dispatch(getAllTypes());
      dispatch(getAllPokemon());
    }
    return () => dispatch(clearEvolutionChain());
  }, [dispatch, idPokemon]);

  const {
    pokemonDetail: poke,
    allPokemon,
    types: allTypes,
    updatedPokemon,
    evolutionChain,
    loading,
    error,
  } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getPokemonDetail(idPokemon));
  }, [updatedPokemon]);

  const handleDelete = (id) => {
    dispatch(deletePokemon(id));
    dispatch(resetFilters());
    history.push('/home');
  };

  const handleEdit = (valuesUpdated) => {
    dispatch(updatePokemon(valuesUpdated));
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      {poke.id && (
        <PokemonDetailCard
          handleDelete={handleDelete}
          handleEdit={handleEdit}
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
          img={poke.img}
          evolutionChain={evolutionChain}
          allTypes={allTypes}
          allPokemon={allPokemon}
        />
      )}
      <div className={`${s.button} ${poke.id && s[poke.types[0]]}`}>
        <Link to="/home">
          <button>Return Home</button>
        </Link>
      </div>
    </div>
  );
}
