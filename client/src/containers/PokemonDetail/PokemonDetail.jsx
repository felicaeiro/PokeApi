import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { getPokemonDetail } from '../../redux/actions';
import './PokemonDetail.module.css';

export default function PokemonDetail({ match }) {
  const { idPokemon } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonDetail(idPokemon));
  }, [dispatch, idPokemon]);

  const { pokemonDetail: poke, loading } = useSelector((state) => state.data);

  if (loading) return <Loading />;
  return (
    <div>
      {poke.id && (
        <div>
          <h1>{poke.name.charAt(0).toUpperCase() + poke.name.substring(1)}</h1>
          <img src={poke.img} alt="pokemon" />
          <p>HP: {poke.hp}</p>
          <p>Types:</p>
          <ul>
            {poke.types.map((t, i) => (
              <li key={i}>{t.charAt(0).toUpperCase() + t.substring(1)}</li>
            ))}
          </ul>
          <p>Atack: {poke.attack}</p>
          <p>Defense: {poke.defense}</p>
          <p>Speed: {poke.speed}</p>
          <p>Weight: {poke.weight}</p>
          <p>Height: {poke.height}</p>
        </div>
      )}
    </div>
  );
}
