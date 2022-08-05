import React, { useEffect, useState } from 'react';
import s from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  getAllPokemon,
  getAllTypes,
  setPagination,
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
    data: { allPokemon, loading, error },
    visibility: { sort },
  } = useSelector((state) => state);

  allPokemon.forEach((x) =>
    Number(x.id) ? (x.source = 'api') : (x.source = 'db')
  );

  const handleSelectSorter = (e) => {
    let sorter = sort;
    if (e.target.name === 'attribute')
      sorter = { ...sorter, attribute: e.target.value };
    if (e.target.name === 'order')
      sorter = { ...sorter, order: e.target.value };
    dispatch(setSort(sorter));
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className={s.container}>
      <div className={s.topBar}>
        <SearchBar allPokemon={allPokemon} />
        <Sorter handleSelect={handleSelectSorter} sort={sort} />
      </div>
      <VisiblePokemons />
    </div>
  );
}
