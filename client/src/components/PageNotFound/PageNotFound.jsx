import React from 'react';
import s from './PageNotFound.module.css';
import notFound from '../../img/404.png';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className={s.container}>
      <div className={s.error}>ERROR</div>
      <div className={s.content}>
        <div className={s.number}>4</div>
        <div className={s.img}>
          <img src={notFound} alt="0" />
        </div>
        <div className={s.number}>4</div>
      </div>
      <div className={s.bottom}>PAGE NOT FOUND</div>
      <div className={s.button}>
        <Link to="/home">
          <button>Return Home</button>
        </Link>
      </div>
    </div>
  );
}
