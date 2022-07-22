import { connect } from 'react-redux';
import { Pokemons } from '../components/Pokemons/Pokemons';

const getPokesPerPage = (allPokemon, { currentPage, pokesPerPage }) => {
  const indexOfLastPoke = currentPage * pokesPerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
  const currentPokes = allPokemon.slice(indexOfFirstPoke, indexOfLastPoke);
  return currentPokes;
};

const getVisiblePokemons = (pokemons, filters) => {
  const result = pokemons.filter((p) =>
    filters.every((filter) => {
      if (filter.key === 'type') {
        return p.types.includes(filter.value);
      }
      if (filter.key === 'source') {
      }

      return false;
    })
  );
  return result;
};

const mapStateToProps = (state) => {
  const pokesPerPage = getPokesPerPage(
    state.data.allPokemon,
    state.visibilityFilter.pagination
  );
  return {
    pokesToRender: getVisiblePokemons(
      pokesPerPage,
      state.visibilityFilter.filter
    ),
  };
};

const VisiblePokemons = connect(mapStateToProps)(Pokemons);

export default VisiblePokemons;
