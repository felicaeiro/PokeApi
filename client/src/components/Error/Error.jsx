import React from 'react';
import s from './Error.module.css';
import error_img from '../../img/error.gif';

export const Error = () => {
  return (
    <div>
      <img className={`${s.errorGif}`} src={error_img} alt="error" />
      <h3 className={`${s.errorTitle}`}>Something went wrong</h3>
    </div>
  );
};
