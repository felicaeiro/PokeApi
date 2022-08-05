import React from 'react';
import s from './Sorter.module.css';

function Sorter({ handleSelect, sort }) {
  return (
    <div className={s.sorter}>
      <h4>Sort By: </h4>

      <select
        className={s.selectAttribute}
        name="attribute"
        value={sort.attribute}
        onChange={(e) => handleSelect(e)}
      >
        <option label="Default" value="id" />
        <option label="Name" value="name" />
        <option label="HP" value="hp" />
        <option label="Attack" value="attack" />
        <option label="Special Attack" value="specialAttack" />
        <option label="Defense" value="defense" />
        <option label="Special Defense" value="specialDefense" />
        <option label="Speed" value="speed" />
        <option label="Weight" value="weight" />
        <option label="Height" value="height" />
      </select>
      <div className={s.selectOrder}>
        <input
          checked={sort.order === 'asc'}
          type="radio"
          name="order"
          value="asc"
          id="asc"
          onChange={(e) => handleSelect(e)}
        />
        <label htmlFor="asc" className={s.left}>
          <i className="fa-solid fa-arrow-down-short-wide" />
        </label>
        <input
          checked={sort.order === 'desc'}
          type="radio"
          name="order"
          value="desc"
          id="desc"
          onChange={(e) => handleSelect(e)}
        />
        <label htmlFor="desc" className={s.right}>
          <i className="fa-solid fa-arrow-down-wide-short" />{' '}
        </label>
      </div>
    </div>
  );
}

export default Sorter;
