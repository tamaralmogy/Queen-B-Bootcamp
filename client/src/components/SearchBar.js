import React, { useState } from "react";
import "../App.css";

const SearchBar = ({ setSearchQuery, setFilters }) => {
  const [localQuery, setLocalQuery] = useState(""); // Track the name search query
  const [field, setField] = useState(""); // Track field filter
  const [workplace, setWorkplace] = useState(""); // Track workplace filter

  const handleSearch = () => {
    // Pass the search query and filters to HomePage
    setSearchQuery(localQuery);
    setFilters({ field, workplace });
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by name"
        className="search-bar"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)} // Update name query
      />
      <input
        type="text"
        placeholder="Filter by field"
        className="search-bar"
        value={field}
        onChange={(e) => setField(e.target.value)} // Update field filter
      />
      <input
        type="text"
        placeholder="Filter by workplace"
        className="search-bar"
        value={workplace}
        onChange={(e) => setWorkplace(e.target.value)} // Update workplace filter
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
