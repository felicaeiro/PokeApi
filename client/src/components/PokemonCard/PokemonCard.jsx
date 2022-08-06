import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './PokemonCard.module.css';

export default function PokemonCard({
  id,
  name,
  hp,
  attack,
  specialAttack,
  defense,
  specialDefense,
  speed,
  height,
  weight,
  types,
  img,
}) {
  const history = useHistory();

  function importAll(r) {
    let images = {};
    r.keys().map((item) => (images[item.replace('./', '')] = r(item)));
    return images;
  }
  const typeIcons = importAll(
    require.context('../../img/PokemonTypes', false, /\.png/)
  );

  return (
    <div className={s.flipCard}>
      <div
        className={s.container}
        onClick={() => history.push(`/pokemonDetail/${id}`)}
      >
        <div className={s.front}>
          <img src={img} alt={name} height="230px" className={s.pokeImage} />
          <div className={s.content}>
            <h1 className={s.title} style={{ color: `var(--${types[0]})` }}>
              {name.charAt(0).toUpperCase() + name.substring(1)}
            </h1>
            <ul>
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
          </div>
        </div>
        <div
          className={s.back}
          style={{ backgroundColor: `var(--${types[0]})` }}
        >
          <div className={s.backContent}>
            <div className={s.top}>
              {Number(id) ? <p>#{id}</p> : <></>}
              <h3 className={s.backTitle}>
                {name.charAt(0).toUpperCase() + name.substring(1)}
              </h3>
            </div>
            <div className={s.stats}>
              <div className={s.column}>
                <span className={s.stat}>
                  <h3>HP: </h3> <p>{hp}</p>
                </span>
                <span className={s.stat}>
                  <h3>Attack: </h3> <p>{attack}</p>
                </span>
                <span className={s.stat}>
                  <h3>Special Attack: </h3> <p>{specialAttack}</p>
                </span>
                <span className={s.stat}>
                  <h3>Defense: </h3> <p>{defense}</p>
                </span>
              </div>
              <div className={s.column}>
                <span className={s.stat}>
                  <h3>Special Defense: </h3> <p>{specialDefense}</p>
                </span>
                <span className={s.stat}>
                  <h3>Speed: </h3> <p>{speed}</p>
                </span>
                <span className={s.stat}>
                  <h3>Weight: </h3> <p>{weight} kg.</p>
                </span>
                <span className={s.stat}>
                  <h3>Height: </h3> <p>{height} m.</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
