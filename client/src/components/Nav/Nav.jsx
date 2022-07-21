import React from 'react';
import s from './Nav.module.css';
import { Link } from 'react-router-dom';
import home from '../../img/pokeball.png';

export default function Nav() {
  return (
    <div className={`${s.navBar}`}>
      <div className={`${s.container}`}>
        <Link to="/home" className={`${s.home}`}>
          <img src={home} alt="home" width="50px" className={`${s.logo}`} />
          Home
        </Link>

        <Link to="createPokemon">Create your own Pokemon</Link>
      </div>
    </div>
  );
}
