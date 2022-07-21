import React, { useEffect, useState } from 'react';
import s from './Home.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { getAllPokemon } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import PokemonCard from '../PokemonCard/PokemonCard';
import Loading from '../Loading/Loading';

export default function Home() {
  // const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPokemon());
  }, [dispatch]);
  const allPokemon = useSelector((state) => state.allPokemon);
  const loading = useSelector((state) => state.loading);

  return (
    <div className={`${s.container}`}>
      {loading ? (
        <Loading />
      ) : (
        ((<SearchBar />),
        {
          /* <label>Order By</label>
      <select></select> */
        },
        allPokemon &&
          allPokemon.map((pokemon) => (
            <PokemonCard
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              img={pokemon.img}
            />
          )))
      )}
    </div>
  );
}
