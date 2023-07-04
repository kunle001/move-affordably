// Filter.tsx

import React, { useState } from 'react';
import axios from 'axios';
import SearchResult from '../pages/SearchResult';
import { room, apartmentType } from '../../api/src/models/roomSpec';
import { Route } from 'react-router-dom';

interface Filters {
  price: string;
  location: string;
  roomType: string;
}

interface DataProps {
  location: {
    coordinates: number[];
    address: string;
    local_govt: string
    description: string;
  };
  checkpoints: string[];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: number[];
  images: string[];
  landlordSpecs: string;
  roomCategory?: room;
  apartmentType: apartmentType;
  createdAt: Date;
  description: string;
  id: string
}

const Filter: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    price: '',
    location: '',
    roomType: ''
  });

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleApplyFilters = async () => {
    // Perform filtering logic or pass the filters to another component

    const apartments = await axios.post('http://localhost:3000/api/search/apartment', {
      searchTerm: filters.location,
      priceRange: filters.price,
      roomSpec: filters.roomType
    });

    const data: DataProps[] = apartments.data; // Assuming apartments.data is an array of DataProps

    return <Route path='/search' element={<SearchResult data={data} />} />
  };

  return (
    <div className="filter-container" >
      <div className="filter-group">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          placeholder="Enter price"
          className="filter-input"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Enter location"
          className="filter-input"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="roomType">Apartment Type:</label>
        <select
          id="roomType"
          name="roomType"
          value={filters.roomType}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">Select Apartment Type</option>
          <option value="One Bedroom Flat">One Bedroom Flat</option>
          <option value="Two bedroom Flat">Two Bedroom Flat</option>
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
