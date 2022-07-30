import React from 'react';
import s from './StatsRanges.module.css';

export default function StatsRanges({ name, value, types, min, max }) {
  return (
    <div className={s.stats}>
      <input
        type="range"
        value={value}
        disabled
        style={{
          background: `linear-gradient(to right, var(--${types[0]}) ${
            ((parseInt(value) - min) * 100) / (max - min)
          }%, #ccc 0px`,
        }}
      />
      <span>{value}</span>
      <label>{name}</label>
    </div>
  );
}
