import React from 'react';

const Selector = ({ name, handleSelect, options }) => {
  return (
    <div>
      <h4>Filter by {name}: </h4>
      {options.map((o, i) => (
        <label key={i}>
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
