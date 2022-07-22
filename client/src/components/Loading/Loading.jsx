import React from 'react';
import s from './Loading.module.css';
import loading from '../../img/loading.gif';

export default function Loading() {
  return (
    <div>
      <img src={loading} alt="loading..." className={`${s.loadingGif}`} />
      <h3 className={`${s.loadingTitle}`}>Loading...</h3>
    </div>
  );
}
