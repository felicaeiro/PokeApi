import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFilter, setFilter, setPagination } from '../../redux/actions';
import SelectFilter from '../../components/SelectFilter/SelectFilter';

const SideBar = ({ filteredTypes, filteredSources }) => {
  const dispatch = useDispatch();
  const handleSelectFilter = (name, e) => {
    const isSelected = e.currentTarget.checked;
    const filter = { key: name, value: e.target.name };

    if (isSelected) {
      dispatch(setFilter(filter));
    } else {
      dispatch(removeFilter(filter));
    }
    dispatch(setPagination({ currentPage: 1, pokesPerPage: 12 }));
  };

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
