import React from 'react';
import s from './Selector.module.css';

const Selector = ({ name, handleSelect, options }) => {
  // if (options.length === 1) return <></>;
  return (
    <div className={s.container}>
      <h4 className={s.title}>
        {name.charAt(0).toUpperCase() + name.slice(1)}:{' '}
      </h4>
      {options.map((o, i) => (
        <label className={s.checkbox} key={i}>
          <input
            checked={o.checked}
            type="checkbox"
            name={o.source || o.name}
            onChange={(e) => handleSelect(name, e)}
          />
          {o.name.charAt(0).toUpperCase() + o.name.slice(1)}
        </label>
      ))}
    </div>
  );
};
export default Selector;
