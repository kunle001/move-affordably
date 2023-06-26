import React, { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../public/css/ApartmentForm.css';

enum ApartmentType {
  TwoBedroomFlat = 'Two bedroom Flat',
  ThreeBedroomFlat = 'Three Bedroom Flat',
  MiniFlat = 'Mini Flat',
  SingleRoomFlat = 'Single Room Flat',
  SingleRoom = 'Single Room',
}

enum RoomCategory {
  Small = 'Small',
  Medium = 'Medium',
  Big = 'Big',
  Large = 'Large',
}

interface Location {
  coordinates: number[];
  address?: string;
  description?: string;
}

interface ApartmentAttrs {
  location: Location;
  checkpoints: string[];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: number[];
  landlordSpecs: string;
  roomCategory?: RoomCategory;
  apartmentType: ApartmentType;
  description: string;
}

const initialApartmentAttrs: ApartmentAttrs = {
  location: {
    coordinates: [],
    address: '',
    description: '',
  },
  checkpoints: [''],
  annualPackage: 0,
  totalPackage: 0,
  distanceFromCheckPoints: [0],
  landlordSpecs: '',
  roomCategory: undefined,
  apartmentType: ApartmentType.TwoBedroomFlat,
  description: '',
};

const ApartmentForm: React.FC = () => {
  const [apartmentAttrs, setApartmentAttrs] = useState<ApartmentAttrs>(initialApartmentAttrs);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApartmentAttrs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send the POST request to the server
    fetch('http://localhost:3000/api/apartments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apartmentAttrs),
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        // Reset the form
        setApartmentAttrs(initialApartmentAttrs);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Navbar />
      <form className="apartment-form" onSubmit={handleSubmit}>
        <h2>Apartment Form</h2>
        <div className="form-group">
          <label>
            Coordinates:
          </label>
          <div className="grid">
            <input
              placeholder='Latitude'
              type="number"
              name="coordinates[0]"
              value={apartmentAttrs.location.coordinates[0]}
              onChange={handleChange}
              className='coordinates'
            />
            <input
              placeholder='Longitude'
              type="number"
              name="coordinates[1]"
              value={apartmentAttrs.location.coordinates[1]}
              onChange={handleChange}
              className='coordinates'
            />
          </div>
        </div>
        <div className="form-group">
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={apartmentAttrs.location.address}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Location Description:
            <input
              type="text"
              name="description"
              value={apartmentAttrs.location.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Checkpoints:
            <input
              type="text"
              name="checkpoints[0]"
              value={apartmentAttrs.checkpoints[0]}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Annual Package:
            <input
              type="number"
              name="annualPackage"
              value={apartmentAttrs.annualPackage}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Total Package:
            <input
              type="number"
              name="totalPackage"
              value={apartmentAttrs.totalPackage}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Distance from Checkpoints:
            <input
              type="number"
              name="distanceFromCheckPoints[0]"
              value={apartmentAttrs.distanceFromCheckPoints[0]}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Landlord Specs:
            <input
              type="text"
              name="landlordSpecs"
              value={apartmentAttrs.landlordSpecs}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Room Category:
            <select
              name="roomCategory"
              value={apartmentAttrs.roomCategory}
              onChange={handleChange}
            >
              <option value="">-- Select Room Category --</option>
              {Object.values(RoomCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Apartment Type:
            <select
              name="apartmentType"
              value={apartmentAttrs.apartmentType}
              onChange={handleChange}
            >
              {Object.values(ApartmentType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Apartment Description:
          </label>
          <textarea
            name="description"
            placeholder='Fill this with apartment description, make sure it is detailed'
            value={apartmentAttrs.description}
            onChange={handleChange}
            className="text-area"
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default ApartmentForm;
