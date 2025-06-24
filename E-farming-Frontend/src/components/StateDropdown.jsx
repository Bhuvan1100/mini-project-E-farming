import React, { useState, useEffect } from 'react';
import indianStates from '../utility/state';

const StateDropdown = ({ selectedState, onChange }) => {
  const [query, setQuery] = useState('');
  const [filteredStates, setFilteredStates] = useState(indianStates);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setFilteredStates(
      indianStates.filter(state =>
        state.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  const handleSelect = (state) => {
    onChange({ target: { name: 'state', value: state } });
    setQuery(state);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
        Select State
      </label>
      <input
        id="state"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        placeholder="Search or select state"
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {showDropdown && filteredStates.length > 0 && (
        <ul className="absolute z-10 w-full bg-white max-h-60 overflow-y-auto border border-gray-300 mt-1 rounded-md shadow-md">
          {filteredStates.map((state, index) => (
            <li
              key={index}
              onClick={() => handleSelect(state)}
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
            >
              {state}
            </li>
          ))}
        </ul>
      )}
      {showDropdown && filteredStates.length === 0 && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 p-2 text-sm text-gray-500 rounded-md shadow-md">
          No states found
        </div>
      )}
    </div>
  );
};

export default StateDropdown;
