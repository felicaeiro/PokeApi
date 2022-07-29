import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <div className={s.container}>
      <div className={s.button}>
        <Link to="/home">
          <button>Discover Pokes</button>
        </Link>
      </div>
    </div>
  );
}
