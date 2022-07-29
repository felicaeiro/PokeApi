import { connect } from 'react-redux';
import Pokemons from '../components/Pokemons/Pokemons';
import { setPagination } from '../redux/actions';

const filterPokemons = (pokemons, filters) => {
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
  return filteredPokemons.sort((a, b) => {
    if (b[sorter.attribute] > a[sorter.attribute]) {
      return sorter.order === 'asc' ? -1 : 1;
    }
    return sorter.order === 'asc' ? 1 : -1;
  });
};

const getPokesPerPage = (allPokemon, { currentPage, pokesPerPage }) => {
  const indexOfLastPoke = currentPage * pokesPerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
  const pokesToRender = allPokemon.slice(indexOfFirstPoke, indexOfLastPoke);
  return pokesToRender;
};

const filterTypes = (allPokemon, types, filters) => {
  types.forEach((t) => (t.checked = filters.some((f) => f.value === t.name)));
  return types.filter((t) => {
    return allPokemon.some((p) => {
      return p.types.includes(t.name);
    });
  });
};

const filterSources = (allPokemon, filters) => {
  const sources = [
    { name: 'created', source: 'db' },
    { name: 'existing', source: 'api' },
  ];

  sources.forEach(
    (s) => (s.checked = filters.some((f) => f.value === s.source))
  );
  return sources.filter((s) => {
    return allPokemon.some((p) => {
      return p.source === s.source;
    });
  });
};

const mapStateToProps = (state) => {
  const filteredPokemons = filterPokemons(
    state.data.allPokemon,
    state.visibility.filter
  );
  const sortedPokemons = sortPokemons(filteredPokemons, state.visibility.sort);
  const pokesToRender = getPokesPerPage(
    sortedPokemons,
    state.visibility.pagination
  );
  const filteredTypes = filterTypes(
    filteredPokemons,
    state.data.types,
    state.visibility.filter
  );
  const filteredSources = filterSources(
    filteredPokemons,
    state.visibility.filter
  );
  return {
    filteredTypes,
    filteredSources,
    pokesToRender,
    totalPokemons: filteredPokemons.length,
    currentPage: state.visibility.pagination.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPagination: (paginator) => dispatch(setPagination(paginator)),
  };
};

const VisiblePokemons = connect(mapStateToProps, mapDispatchToProps)(Pokemons);

export default VisiblePokemons;
