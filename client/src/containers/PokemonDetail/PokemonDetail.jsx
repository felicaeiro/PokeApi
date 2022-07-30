import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import card from '../../img/card.png';
import Loading from '../../components/Loading/Loading';
import { Error } from '../../components/Error/Error';
import { getPokemonDetail } from '../../redux/actions';
import s from './PokemonDetail.module.css';
import { Link } from 'react-router-dom';
import PokemonDetailCard from '../../components/PokemonDetailCard/PokemonDetailCard';

export default function PokemonDetail({ match }) {
  const { idPokemon } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonDetail(idPokemon));
  }, [dispatch, idPokemon]);

  const {
    pokemonDetail: poke,
    loading,
    error,
  } = useSelector((state) => state.data);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      {poke.id && (
        <PokemonDetailCard
          name={poke.name}
          types={poke.types}
          weight={poke.weight}
          height={poke.height}
          hp={poke.hp}
          attack={poke.attack}
          specialAttack={poke.specialAttack}
          defense={poke.defense}
          specialDefense={poke.specialDefense}
          speed={poke.speed}
          img={poke.img}
        />
      )}
      <div className={`${s.button} ${poke.id && s[poke.types[0]]}`}>
        <Link to="/home">
          <button>Return Home</button>
        </Link>
      </div>
    </div>
  );
}
