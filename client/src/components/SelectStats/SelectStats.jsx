import React from 'react';
import s from './SelectStats.module.css';

const SelectStats = ({
  label,
  name,
  value,
  min,
  max,
  handleChange,
  notValid,
}) => {
  return (
    <div className={s.container}>
      <label className={s.sliderLabel}>{label}</label>
      <input
        className={(notValid && s.danger) || s.input}
        type="text"
        autoComplete="off"
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
        style={{
          background: `linear-gradient(to right, #c80000 ${
            ((parseInt(value) - min) * 100) / (max - min)
          }%, #ccc 0px`,
        }}
        onChange={(e) => handleChange(e)}
      />

      <div className={s.minmax}>
        <span className={s.min}>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default SelectStats;
