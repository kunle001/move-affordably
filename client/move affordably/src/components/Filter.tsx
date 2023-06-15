import React, { useState } from 'react';
import '../../public/css/Filter.css';

interface Filters {
  price: string;
  location: string;
  roomType: string;
}

const Filter: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    price: '',
    location: '',
    roomType: ''
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleApplyFilters = (): void => {
    // Perform filtering logic or pass the filters to another component
    console.log(filters);
  };

  return (
    <div className="filter">
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          placeholder="Enter price"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Enter location"
        />
      </div>
      <div className="form-group">
        <label htmlFor="roomType">Apartment Type:</label>
        <select
          className='form-group'
          id="roomType"
          name="roomType"
          value={filters.roomType}
        >
          <option value="">Select Apartment Type</option>
          <option value="One Bedroom Flat">One Bedroom Flat</option>
          <option value="Two Bedroom Flat">Two Bedroom Flat</option>
          <option value="Three Bedroom Flat">Three Bedroom Flat</option>
          <option value="One Room">One Room</option>
          <option value="Two Rooms">Two Rooms</option>
          <option value="Three Rooms">Three Rooms</option>
        </select>
      </div>

      <button className="apply-button" onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
