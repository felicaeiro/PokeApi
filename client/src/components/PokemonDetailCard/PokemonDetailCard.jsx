import React from 'react';
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
              <p>{weight} kg. </p>
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
              <p>{height} cm.</p>
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
    </div>
  );
}
