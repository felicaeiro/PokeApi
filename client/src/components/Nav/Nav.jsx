import React from 'react';
import s from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import pokemon from '../../img/pokemonnav.png';

export default function Nav() {
  return (
    <div className={s.navBar}>
      <NavLink to="/home" className={s.pokelogo}>
        <img src={pokemon} alt="pokemon" height="60px" />
      </NavLink>
      <div className={s.container}>
        <NavLink
          to="/home"
          activeClassName={s.selected}
          className={`${s.navLink} ${s.home}`}
        >
          Home
        </NavLink>
        <NavLink
          activeClassName={s.selected}
          className={s.navLink}
          to="/createPokemon"
        >
          Create
        </NavLink>
      </div>
    </div>
  );
}
