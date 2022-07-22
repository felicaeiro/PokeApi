import { connect } from 'react-redux';
import Pokemons from '../../components/Pokemons/Pokemons';
import { setPagination } from '../../redux/actions';

const getVisiblePokemons = (pokemons, filters) => {
  const result = pokemons.filter((poke) =>
    filters.every((filter) => {
      if (filter.key === 'types') {
        if (filter.value === 'all') return pokemons;
        return poke.types.includes(filter.value);
      }
      if (filter.key === 'source') {
        if (filter.value === 'all') return pokemons;
        return poke[filter.key] === filter.value;
      }
      return true;
    })
  );
  return result;
};

const sortPokemons = (filteredPokemons, sorter) => {
  if (!sorter.attribute) return filteredPokemons;

  return filteredPokemons.sort((a, b) => {
    if (b[sorter.attribute] > a[sorter.attribute]) {
      return sorter.order === 'asc' ? -1 : 1;
    }
    return sorter.order === 'asc' ? 1 : -1;
  });
};

const getPokesPerPage = (filteredPokemons, { currentPage, pokesPerPage }) => {
  const indexOfLastPoke = currentPage * pokesPerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
  const pokesToRender = filteredPokemons.slice(
    indexOfFirstPoke,
    indexOfLastPoke
  );
  return pokesToRender;
};

const mapStateToProps = (state) => {
  let filteredPokemons = getVisiblePokemons(
    state.data.allPokemon,
    state.visibility.filter
  );
  const sortedPokemons = sortPokemons(filteredPokemons, state.visibility.sort);
  const pokesToRender = getPokesPerPage(
    sortedPokemons,
    state.visibility.pagination
  );
  return {
    pokesToRender,
    totalPokemons: filteredPokemons.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPagination: (paginator) => dispatch(setPagination(paginator)),
  };
};

const VisiblePokemons = connect(mapStateToProps, mapDispatchToProps)(Pokemons);

export default VisiblePokemons;
