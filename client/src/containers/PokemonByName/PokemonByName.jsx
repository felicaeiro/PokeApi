import React, { useEffect } from 'react';
import s from './PokemonByName.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import card from '../../img/card.png';
import { getPokeByName } from '../../redux/actions';
import Loading from '../../components/Loading/Loading';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import SearchBar from '../SearchBar/SearchBar';
import { Error } from '../../components/Error/Error';

export default function PokemonByName({ match }) {
  const { name } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokeByName(name));
  }, [dispatch, name]);

  const { search, loading, error } = useSelector((state) => state.data);
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className={s.container}>
      <div className={s.search}>
        <SearchBar />
      </div>
      {search.name && (
        <PokemonCard
          id={search.id}
          name={search.name}
          types={search.types}
          img={search.img ? search.img : card}
        />
      )}
      <div className={`${s.button} ${search.name && s[search.types[0]]}`}>
        <Link to="/home">
          <button>Return Home</button>
        </Link>
      </div>
    </div>
  );
}
