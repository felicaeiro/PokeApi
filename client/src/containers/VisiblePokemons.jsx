import { connect } from 'react-redux';
import Pokemons from '../components/Pokemons/Pokemons';
import { removeFilter, setFilter, setPagination } from '../redux/actions';

const filterPokemons = (pokemons, filters) => {
  const result = pokemons.filter((poke) =>
    filters.every((filter) => {
      if (filter.key === 'types') {
        return poke.types.includes(filter.value);
      }
      if (filter.key === 'source') {
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
      return sorter.order === 'desc' ? 1 : -1;
    }
    return sorter.order === 'desc' ? -1 : 1;
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

const filterSources = (allPokemon, filteredPokemons, filters) => {
  let sources = [
    { name: 'created', source: 'db' },
    { name: 'existing', source: 'api' },
  ];

  const totalSources = sources.filter((s) => {
    return allPokemon.some((p) => {
      return p.source === s.source;
    });
  });

  sources.forEach(
    (s) => (s.checked = filters.some((f) => f.value === s.source))
  );

  sources = sources.filter((s) => {
    return filteredPokemons.some((p) => {
      return p.source === s.source;
    });
  });

  if (totalSources.length === 1) sources.hidden = true;
  else sources.hidden = false;

  return sources;
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
    state.data.allPokemon,
    filteredPokemons,
    state.visibility.filter
  );
  return {
    filteredTypes,
    filteredSources,
    pokesToRender,
    totalPokemons: filteredPokemons.length,
    pagination: state.visibility.pagination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPagination: (paginator) => dispatch(setPagination(paginator)),
    handleSelectFilter: (filter, isSelected) => {
      if (isSelected) {
        dispatch(setFilter(filter));
      } else {
        dispatch(removeFilter(filter));
      }
      dispatch(setPagination({ currentPage: 1, pokesPerPage: 12 }));
    },
  };
};

const VisiblePokemons = connect(mapStateToProps, mapDispatchToProps)(Pokemons);

export default VisiblePokemons;
