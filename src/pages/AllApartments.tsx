import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApartmentCard from '../components/ApartmentCard';
import '../../public/css/AllApartment.css';
import Filter from '../components/Filter';
import axios from 'axios';
import { apartmentType, room } from '../../api/src/models/roomSpec';

interface Filters {
  price: string;
  location: string;
  transportCost: string;
}

interface DataProps {
  location: {
    type: string;
    coordinates: [number];
    address: string;
    description?: string;
  };
  checkpoints: [string];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: [number];
  images: [string];
  landlordSpecs: string;
  roomCategory?: room;
  apartmentType: apartmentType;
  createdAt: Date;
  description: string;
  id: string;
}

const images = [
  '../../public/images/house1.png',
  '../../public/images/house2.png',
  '../../public/images/house 3.png',
  '../../public/images/house4.png',
  '../../public/images/house5.png',
  '../../public/images/house6.png',
];

const AllApartments: React.FC = () => {
  const totalApartments = 50;
  const apartmentsPerPage = 6;
  const totalPages = Math.ceil(totalApartments / apartmentsPerPage);
  const [backendData, setbackendData] = useState<DataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<DataProps[]>('http://localhost:3000/api/apartments');
        setbackendData(res.data);
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
    transportCost: '',
  });
  const [filterVisible, setFilterVisible] = useState(false); // New state for filter visibility

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const toggleFilterVisibility = (): void => {
    setFilterVisible((prevVisible) => !prevVisible);
  };

  const startIndex = (currentPage - 1) * apartmentsPerPage;
  const endIndex = startIndex + apartmentsPerPage;
  const displayedApartments = backendData.slice(startIndex, endIndex);

  const isNextDisabled = endIndex >= backendData.length;
  const isPrevDisabled = currentPage === 1;

  return (
    <>
      <Navbar />
      <h3 className="all-apartment-header">All Apartments</h3>
      <div className="all-apartments">
        <div className="dropdown-button" onClick={toggleFilterVisibility}>
          <span className="dropdown-arrow">&#9650;</span>
        </div>
        {filterVisible && <Filter />}
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
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={isPrevDisabled}
          >
            Previous
          </button>
          <span className="pagination-current-page">{currentPage}</span>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllApartments;
