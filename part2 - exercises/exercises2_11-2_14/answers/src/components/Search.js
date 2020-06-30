import React from 'react';

const Search = (props) => {
  return (
    <div>
      Search:{' '}
      <input
        value={props.cSearchStr}
        placeholder='Enter country'
        onChange={props.handleCSearchStrChange}
      />
    </div>
  );
};

export default Search;
