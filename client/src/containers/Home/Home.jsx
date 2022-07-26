import React, { useEffect } from 'react';
import s from './Home.module.css';
import SearchBar from '../SearchBar/SearchBar';
import {
  getAllPokemon,
  getAllTypes,
  setPagination,
  setSort,
  setFilter,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import VisiblePokemons from '../VisiblePokemons';
import FilterSelector from '../../components/FilterSelector/FilterSelector';
import { Error } from '../../components/Error/Error';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemon());
    dispatch(getAllTypes());
  }, [dispatch]);

  const { allPokemon, types, loading, error } = useSelector(
    (state) => state.data
  );

  allPokemon.forEach((x) =>
    Number(x.id) ? (x.source = 'api') : (x.source = 'db')
  );

  const sources = [
    { name: 'created', source: 'db' },
    { name: 'existing', source: 'api' },
  ];

  const handleSelectFilter = (name, value) => {
    dispatch(
      setFilter({
        key: name,
        value,
      })
    );
    dispatch(setPagination({ currentPage: 1, pokesPerPage: 12 }));
  };

  const handleSelectSorter = (e) => {
    let sorterValues = e.target.value.split(' ');
    const sorter = { attribute: sorterValues[0], order: sorterValues[1] };
    dispatch(setSort(sorter));
  };

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className={`${s.container}`}>
      <SearchBar />

      <FilterSelector
        name="types"
        handleSelect={handleSelectFilter}
        options={types}
        all="All Types"
      />

      <FilterSelector
        name="source"
        handleSelect={handleSelectFilter}
        options={sources}
        all="All Sources"
      />

      <select name={'sorter'} onChange={(e) => handleSelectSorter(e)}>
        <option label="Default" value={'id asc'} />
        <option label="A - Z" value={'name asc'} />
        <option label="Z - A" value={'name desc'} />
        <option label="Lowest Attack" value={'attack asc'} />
        <option label="Highest Attack" value={'attack desc'} />
      </select>

      <VisiblePokemons />
    </div>
  );
}
