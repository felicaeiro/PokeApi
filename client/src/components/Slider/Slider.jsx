import React from 'react';
import s from './Slider.module.css';

export const Slider = ({ name, value, min, max, handleChange }) => {
  return (
    <div>
      <label>{name.charAt(0).toUpperCase() + name.substring(1)}</label>
      {/* <div>{value}</div> */}
      <input
        type="number"
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
      />
      <input
        className={s.slider}
        type="range"
        min={min}
        max={max}
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
      />

      <div className={s.minmax}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
