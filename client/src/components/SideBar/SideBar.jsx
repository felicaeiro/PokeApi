import React from 'react';
import s from './SideBar.module.css';
import SelectFilter from '../SelectFilter/SelectFilter';

const SideBar = ({
  filteredTypes,
  filteredSources,
  handleSelectFilter,
  pagination,
  onPagination,
}) => {
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
    </div>
  );
};

export default SideBar;
