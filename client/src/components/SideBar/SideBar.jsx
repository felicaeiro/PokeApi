import React, { useState } from 'react';
import s from './SideBar.module.css';
import SelectFilter from '../SelectFilter/SelectFilter';
import RangeFilter from '../RangeFilter/RangeFilter';

const SideBar = ({
  filteredTypes,
  filteredSources,
  handleSelectFilter,
  handleRangeFilter,
}) => {
  const [showStatsFilters, setShowStatsFilters] = useState(false);
  const [filterStatsState, setFilterStats] = useState([
    { key: 'hp', min: 1, max: 255 },
    { key: 'attack', min: 1, max: 200 },
    { key: 'specialAttack', min: 1, max: 200 },
    { key: 'defense', min: 1, max: 255 },
    { key: 'specialDefense', min: 1, max: 255 },
    { key: 'speed', min: 1, max: 200 },
    { key: 'weight', min: 1, max: 1000 },
    { key: 'height', min: 1, max: 20 },
  ]);
  const handleDisplay = () => {
    setShowStatsFilters(!showStatsFilters);
  };

  let filterStats = [];

  const handleOnClick = () => {
    handleRangeFilter(filterStats);
  };
  const handleReset = () => {
    filterStats = [
      { key: 'hp', min: 1, max: 255 },
      { key: 'attack', min: 1, max: 200 },
      { key: 'specialAttack', min: 1, max: 200 },
      { key: 'defense', min: 1, max: 255 },
      { key: 'specialDefense', min: 1, max: 255 },
      { key: 'speed', min: 1, max: 200 },
      { key: 'weight', min: 0, max: 1000 },
      { key: 'height', min: 0, max: 20 },
    ];
    handleRangeFilter(filterStats);
  };
  const handleOnChange = (filter) => {
    filterStats = filterStats
      .filter((f) => f.key !== filter.key)
      .concat(filter);
  };

  return (
    <div className={s.container}>
      <SelectFilter
        name="types"
        handleSelect={handleSelectFilter}
        options={filteredTypes}
      />
      <SelectFilter
        name="source"
        handleSelect={handleSelectFilter}
        options={filteredSources}
      />
      {!showStatsFilters ? (
        <div className={s.display}>
          <button onClick={handleDisplay}>
            <span>Show advanced filters</span>
            <i className="fa-solid fa-sort-down"></i>
          </button>
        </div>
      ) : (
        <div className={s.statsFilters}>
          <button onClick={handleDisplay}>
            <p>Hide advanced filters</p>
            <i className="fa-solid fa-sort-up"></i>
          </button>
          <RangeFilter
            label="HP"
            name="hp"
            min={1}
            max={255}
            onChange={handleOnChange}
          />
          <RangeFilter
            label="Attack"
            name="attack"
            min={1}
            max={200}
            onChange={handleOnChange}
          />
          <RangeFilter
            label="Special Attack"
            name="specialAttack"
            min={1}
            max={200}
            onChange={handleOnChange}
          />
          <RangeFilter
            label="Defense"
            name="defense"
            min={1}
            max={255}
            onChange={handleOnChange}
          />
          <RangeFilter
            label="Special Defense"
            name="specialDefense"
            min={1}
            max={255}
            onChange={handleOnChange}
          />
          <RangeFilter
            label="Speed"
            name="speed"
            min={1}
            max={200}
            onChange={handleOnChange}
          />
          <RangeFilter
            label="Weight"
            name="weight"
            min={0}
            max={1000}
            onChange={handleOnChange}
          />
          <RangeFilter
            label="Height"
            name="height"
            min={0}
            max={20}
            onChange={handleOnChange}
          />
          <button onClick={handleOnClick}>Apply filters</button>
          <button onClick={handleReset}>Reset filters</button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
