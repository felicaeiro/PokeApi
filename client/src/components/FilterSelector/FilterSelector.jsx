import React from 'react';

const Selector = ({ name, handleSelect, options, all }) => {
  return (
    <div>
      <select
        name={name}
        onChange={(e) => handleSelect(e.target.name, e.target.value)}
      >
        <optgroup label={`Filter by ${name}`}>
          <option value="all">{all}</option>
          {options.map((o, i) => (
            <option key={i} value={o.source || o.name}>
              {o.name.charAt(0).toUpperCase() + o.name.slice(1)}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};
export default Selector;
