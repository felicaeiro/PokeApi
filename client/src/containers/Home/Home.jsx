import React, { useEffect } from 'react';
import s from './Home.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { getAllPokemon, getAllTypes, setSort } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import VisiblePokemons from '../VisiblePokemons';
import { Error } from '../../components/Error/Error';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemon());
    dispatch(getAllTypes());
  }, [dispatch]);

  const { allPokemon, loading, error } = useSelector((state) => state.data);

  allPokemon.forEach((x) =>
    Number(x.id) ? (x.source = 'api') : (x.source = 'db')
  );

  const handleSelectSorter = (e) => {
    let sorterValues = e.target.value.split(' ');
    const sorter = { attribute: sorterValues[0], order: sorterValues[1] };
    dispatch(setSort(sorter));
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className={s.container}>
      <div className={s.topBar}>
        <SearchBar />

        <div className={s.sorter}>
          <h4>Sort By: </h4>
          <select
            className={s.select}
            name={'sorter'}
            onChange={(e) => handleSelectSorter(e)}
          >
            <option label="Default" value={'id asc'} />
            <option label="A - Z" value={'name asc'} />
            <option label="Z - A" value={'name desc'} />
            <option label="Lowest Attack" value={'attack asc'} />
            <option label="Highest Attack" value={'attack desc'} />
          </select>
        </div>
      </div>
      <VisiblePokemons />
    </div>
  );
}
