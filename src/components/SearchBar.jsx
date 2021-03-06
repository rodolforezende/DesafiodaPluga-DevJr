import React from 'react';
import PropTypes from 'prop-types';
import '../styles/searchBar.css';

const SearchBar = function SearchBar({ placeholder, callback, state }) {
  return (
    <div>
      <input placeholder={placeholder} onChange={callback} value={state} />
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
};
