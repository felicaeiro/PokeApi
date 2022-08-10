import React, { useEffect } from 'react';
import s from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  getAllPokemon,
  getAllTypes,
  getPokeByName,
  setSort,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import VisiblePokemons from '../VisiblePokemons';
import Error from '../../components/Error/Error';
import Sorter from '../../components/Sorter/Sorter';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemon());
    dispatch(getAllTypes());
  }, [dispatch]);

  const {
    data: { loading, error },
    visibility: { sort, pokeSearch },
  } = useSelector((state) => state);

  const handleSelectSorter = (e) => {
    let sorter = sort;
    if (e.target.name === 'attribute')
      sorter = { ...sorter, attribute: e.target.value };
    if (e.target.name === 'order')
      sorter = { ...sorter, order: e.target.value };
    dispatch(setSort(sorter));
  };
  const handleSearch = (search) => {
    dispatch(getPokeByName(search));
  };
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className={s.container}>
      <div className={s.topBar}>
        <SearchBar pokeSearch={pokeSearch} handleSearch={handleSearch} />
        <Sorter handleSelect={handleSelectSorter} sort={sort} />
      </div>
      <VisiblePokemons />
    </div>
  );
}
