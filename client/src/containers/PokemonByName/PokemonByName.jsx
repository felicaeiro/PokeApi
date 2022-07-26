import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import card from '../../img/card.png';
import { getPokeByName } from '../../redux/actions';
import Loading from '../../components/Loading/Loading';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import SearchBar from '../SearchBar/SearchBar';

export default function PokemonByName({ match }) {
  const { name } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokeByName(name));
  }, [dispatch, name]);

  const { search, loading } = useSelector((state) => state.data);
  if (loading) return <Loading />;

  return (
    <div>
      <SearchBar />

      {search.name && (
        <PokemonCard
          id={search.id}
          name={search.name}
          types={search.types}
          img={search.img ? search.img : card}
        />
      )}
      <Link to="/home">
        <button>Return Home</button>
      </Link>
    </div>
  );
}
