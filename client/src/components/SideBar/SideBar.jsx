import React from 'react';
import SelectFilter from '../SelectFilter/SelectFilter';

const SideBar = ({ filteredTypes, filteredSources, handleSelectFilter }) => {
  return (
    <div>
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
