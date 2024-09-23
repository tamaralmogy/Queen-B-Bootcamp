// import React from 'react';
// import '../App.css';

// const SearchBar = ({ searchQuery, setSearchQuery }) => {
//   return (
//     <input 
//       type="text" 
//       placeholder="Search by name, skill, or field"
//       className="search-bar"
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}  // Update search query as user types
//     />
//   );
// };

// export default SearchBar;


// components/SearchBar.js
import React, { useState } from 'react';
import '../App.css';

const SearchBar = ({ setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(''); // Local state to track the input value

  const handleSearch = () => {
    setSearchQuery(localQuery); // Trigger the search when the button is clicked
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by name, skill, or field"
        className="search-bar"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)} // Update local state on input change
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;

