import React, { useState, useEffect } from 'react';
import cityArray from '../utility/cities';

const CityDropdown = ({ selectedCity, onChange }) => {
  const [query, setQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState(cityArray);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setFilteredCities(
      cityArray.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  const handleSelect = (city) => {
    onChange({ target: { name: 'city', value: city } });
    setQuery(city);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
        Select City
      </label>
      <input
        id="city"
        type="text"
        value={query }
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        placeholder="Search or select city"
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {showDropdown && filteredCities.length > 0 && (
        <ul className="absolute z-10 w-full bg-white max-h-60 overflow-y-auto border border-gray-300 mt-1 rounded-md shadow-md">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
      {showDropdown && filteredCities.length === 0 && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 p-2 text-sm text-gray-500 rounded-md shadow-md">
          No cities found
        </div>
      )}
    </div>
  );
};

export default CityDropdown;
