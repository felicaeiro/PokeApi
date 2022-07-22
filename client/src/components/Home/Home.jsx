import React, { useEffect } from 'react';
import s from './Home.module.css';
import SearchBar from '../SearchBar/SearchBar';
import {
  getAllPokemon,
  getAllTypes,
  setPagination,
  setVisibilityFilter,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { Pagination } from '../Pagination/Pagination';
// import { Pokemons } from '../Pokemons/Pokemons';
import VisiblePokemons from '../../containers/VisiblePokemons';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemon());
    dispatch(getAllTypes());
  }, [dispatch]);

  const {
    pagination: { currentPage, pokesPerPage },
    filter,
    sort: { attribute, orderby },
  } = useSelector((state) => state.visibilityFilter);
  const { allPokemon, types, loading } = useSelector((state) => state.data);

  const paginate = (pageNumber) =>
    dispatch(setPagination({ currentPage: pageNumber, pokesPerPage }));

  const handleSelect = (e) => {
    if (e.target.name === 'selectType') {
      dispatch(setVisibilityFilter({ key: 'type', value: e.target.value }));
    }
  };

  if (loading) return <Loading />;
  return (
    <div className={`${s.container}`}>
      <SearchBar />

      <select name="selectType" onChange={(e) => handleSelect(e)}>
        <option disabled>Filter By Type</option>
        <option value="all">All Types</option>
        {types &&
          types.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
      </select>

      <VisiblePokemons />

      <Pagination
        pokesPerPage={pokesPerPage}
        totalPokes={allPokemon.length}
        paginate={paginate}
      />
    </div>
  );
}
