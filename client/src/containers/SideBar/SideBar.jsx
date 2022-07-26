import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFilter, setFilter, setPagination } from '../../redux/actions';
import Selector from '../../components/Selector/Selector';

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
      <Selector
        name="types"
        handleSelect={handleSelectFilter}
        options={filteredTypes}
      />
      <Selector
        name="source"
        handleSelect={handleSelectFilter}
        options={filteredSources}
      />
    </div>
  );
};

export default SideBar;
