import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './PokemonCard.module.css';

export default function PokemonCard({ id, name, types, img }) {
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
    <div
      className={s.container}
      onClick={() => history.push(`/pokemonDetail/${id}`)}
    >
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
  );
}
