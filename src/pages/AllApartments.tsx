import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApartmentCard from '../components/ApartmentCard';
import '../../public/css/AllApartment.css';
import axios from 'axios';
import { room, apartmentType } from '../../api/src/models/roomSpec';

interface Filters {
  price: string;
  location: string;
  roomType: string;
}

interface DataProps {
  location: {
    coordinates: number[];
    address: string;
    local_govt: string;
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
  id: string;
}

const AllApartments: React.FC = () => {
  const totalApartments = 50;
  const apartmentsPerPage = 6;
  const totalPages = Math.ceil(totalApartments / apartmentsPerPage);
  const [backendData, setBackendData] = useState<DataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<DataProps[]>('http://localhost:3000/api/apartments');
        setBackendData(res.data);
      } catch (err) {
        console.error('Error Fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    price: '',
    location: '',
    roomType: '',
  });

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      const startIndex = currentPage * apartmentsPerPage;
      const nextPageData = backendData.slice(startIndex, startIndex + apartmentsPerPage);
      if (nextPageData.length > 0) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handlePrevPage = (): void => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // const applyFilters = async (): Promise<void> => {
  //   try {
  //     const apartments = await axios.post<DataProps[]>('http://localhost:3000/api/search/apartment', {
  //       searchTerm: filters.location,
  //       priceRange: filters.price,
  //       roomSpec: filters.roomType,
  //     });
  //     setBackendData(apartments.data);
  //   } catch (error) {
  //     console.error('Error applying filters:', error);
  //   }
  // };

  const startIndex = (currentPage - 1) * apartmentsPerPage;
  const endIndex = startIndex + apartmentsPerPage;
  const displayedApartments = backendData.slice(startIndex, endIndex);

  const isNextDisabled = endIndex >= backendData.length;
  const isPrevDisabled = currentPage === 1;

  const applyFilters = async (): Promise<void> => {
    try {
      const apartments = await axios.post<DataProps[]>('http://localhost:3000/api/search/apartment', {
        searchTerm: filters.location,
        priceRange: filters.price,
        roomSpec: filters.roomType,
      });
      setBackendData(apartments.data);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  return (
    <>
      <Navbar />
      <h3 className="all-apartment-header">All Apartments</h3>
      <div className="all-apartments">
        <div className="filter-container">
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

          <button className="apply-button" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>

        <div className="apartment-list">
          {displayedApartments.map((data, index) => (
            <ApartmentCard
              key={index}
              location={data.location}
              annualPackage={data.annualPackage}
              description={data.description}
              apartmentType={data.apartmentType}
              roomCategory={data.roomCategory}
              createdAt={data.createdAt}
              id={data.id}
              landlordSpecs={data.landlordSpecs}
              images={data.images}
              checkpoints={data.checkpoints}
              distanceFromCheckPoints={data.distanceFromCheckPoints}
              totalPackage={data.totalPackage}
            />
          ))}
        </div>
        <div className="pagination">
          <button className="pagination-button" onClick={handlePrevPage} disabled={isPrevDisabled}>
            Previous
          </button>
          <span className="pagination-current-page">{currentPage}</span>
          <button className="pagination-button" onClick={handleNextPage} disabled={isNextDisabled}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllApartments;
