import React from 'react';
import { Link } from 'react-router-dom';
import card from '../../img/card.png';
import StatsRanges from '../StatsRanges/StatsRanges';
import s from './PokemonDetailCard.module.css';

export default function PokemonDetailCard({
  name,
  types,
  height,
  weight,
  hp,
  attack,
  specialAttack,
  defense,
  specialDefense,
  speed,
  img,
  evolutionChain,
}) {
  function importAll(r) {
    let images = {};
    r.keys().map((item) => (images[item.replace('./', '')] = r(item)));
    return images;
  }
  const typeIcons = importAll(
    require.context('../../img/PokemonTypes', false, /\.png/)
  );
  return (
    <div className={s.container}>
      <div className={s.topInfo}>
        <img
          src={img ? img : card}
          alt="pokemon"
          height="300px"
          className={s.pokeImage}
        />
        <div className={s.nameTypes}>
          <h1 className={s.title} style={{ color: `var(--${types[0]})` }}>
            {name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()}
          </h1>
          <ul className={s.typesList}>
            {types.map((t, i) => (
              <li className={s.type} key={i}>
                <img
                  src={typeIcons[`${t}.png`].default}
                  alt="type"
                  height="30px"
                />
                {t.charAt(0).toUpperCase() + t.substring(1)}
              </li>
            ))}
          </ul>
          <div className={s.heightWeight}>
            <div>
              <p className={s.subtitle} style={{ color: `var(--${types[0]})` }}>
                Weight
              </p>
              <p>{parseFloat(weight).toFixed(1)} kg. </p>
            </div>
            <div>
              <p
                className={s.subtitle}
                style={{
                  color: `var(--${types[0]})`,
                }}
              >
                Height
              </p>
              <p>{parseFloat(height).toFixed(1)} m.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={s.statsRanges}>
        <StatsRanges name="HP" value={hp} types={types} min="1" max="255" />
        <StatsRanges
          name="Attack"
          value={attack}
          types={types}
          min="1"
          max="200"
        />
        <StatsRanges
          name="Special Attack"
          value={specialAttack}
          types={types}
          min="1"
          max="200"
        />
        <StatsRanges
          name="Defense"
          value={defense}
          types={types}
          min="1"
          max="255"
        />
        <StatsRanges
          name="Special Defense"
          value={specialDefense}
          types={types}
          min="1"
          max="255"
        />
        <StatsRanges
          name="Speed"
          value={speed}
          types={types}
          min="1"
          max="200"
        />
      </div>
      {evolutionChain && (
        <div className={s.evContainer}>
          <span>
            <h3>Evolution Chain</h3>
            {evolutionChain.length === 1 ? (
              <h5>This Pokémon doesn't evolve</h5>
            ) : (
              <></>
            )}
          </span>
          <div className={s.evContent}>
            {evolutionChain.map((p, i) => (
              <>
                <div key={p.id} className={s.evolution}>
                  <Link to={`/pokemonDetail/${p.id}`}>
                    <img
                      className={s.pokeImg}
                      src={p.img}
                      alt={p.name}
                      height="150px"
                    />
                  </Link>
                  <h3>
                    {p.name.charAt(0).toUpperCase() +
                      p.name.substring(1).toLowerCase()}
                  </h3>

                  <ul className={s.typesList}>
                    {p.types.map((t, i) => (
                      <li
                        className={s.evType}
                        style={{ backgroundColor: `var(--${t})` }}
                        key={i}
                      >
                        {t.charAt(0).toUpperCase() + t.substring(1)}
                      </li>
                    ))}
                  </ul>
                </div>
                {evolutionChain.length - 1 === i ? (
                  <></>
                ) : (
                  <i class="fa-solid fa-right-long fa-2xl" />
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
