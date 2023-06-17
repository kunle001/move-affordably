import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApartmentCard from '../components/ApartmentCard';
import '../../public/css/AllApartment.css';
import Filter from '../components/Filter';

interface Filters {
  price: string;
  location: string;
  transportCost: string;
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

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    price: '',
    location: '',
    transportCost: ''
  });
  const [filterVisible, setFilterVisible] = useState(false); // New state for filter visibility

  const handleNextPage = (): void => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = (): void => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const toggleFilterVisibility = (): void => {
    setFilterVisible(prevVisible => !prevVisible);
  };

  const startIndex = (currentPage - 1) * apartmentsPerPage;
  const endIndex = startIndex + apartmentsPerPage;
  const displayedApartments = Array.from(
    { length: apartmentsPerPage },
    (_, index) => index + startIndex
  ).filter(apartmentIndex => apartmentIndex < totalApartments);

  return (

    <>
      <Navbar />
      <h3 className='all-apartment-header'>All Apartments</h3>
      <div className="all-apartments">
        <div className="dropdown-button" onClick={toggleFilterVisibility}>
          <span className="dropdown-arrow">&#9650;</span>
        </div>
        {filterVisible && <Filter />}
        <div className="apartment-list">
          {displayedApartments.map((_, index) => (
            <ApartmentCard images={images} key={index} />
          ))}
        </div>
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-current-page">{currentPage}</span>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
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
