import React from 'react';
import s from './SelectFilter.module.css';

const SelectFilter = ({ name, handleSelect, options }) => {
  return (
    <div className={s.container}>
      <h4 className={s.title}>
        {name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()}:
      </h4>
      {options.map((o, i) => (
        <label className={s.checkbox} key={i}>
          <input
            checked={o.checked}
            type="checkbox"
            name={o.source || o.name}
            onChange={(e) =>
              handleSelect(
                { key: name, value: e.target.name },
                e.currentTarget.checked
              )
            }
          />
          {o.name.charAt(0).toUpperCase() + o.name.substring(1).toLowerCase()}
        </label>
      ))}
    </div>
  );
};
export default SelectFilter;
