import React, { useState } from 'react';
import axios from 'axios';
import '../../public/css/Action.css';

interface CreateApartmentFormData {
  // Add properties for Create Apartment form data
}

interface ApproveRequestFormData {
  requestId: string;
  apartmentId: string
}

interface DisapproveRequestFormData {
  requestId: string
}

interface DeleteRequestFormData {
  requestId: string
}

interface UpdateApartmentFormData {
  location?: {
    type: string;
    coordinates: number[];
    local_govt?: string;
    address?: string;
  };
  id: string
  checkpoints?: string[];
  annualPackage?: number;
  totalPackage?: number;
  distanceFromCheckPoints?: number[];
  images?: [string];
  landlordSpecs?: string;
  roomCategory?: '';
  apartmentType?: '';
  description?: string;
  formprice?: number;
  videprice?: number;
}

interface DeleteApartmentFormData {
  apartmentId: string
}

interface DeleteUserFormData {
  userId: string
}

const Actions: React.FC = () => {
  const [createApartmentFormData, setCreateApartmentFormData] = useState<CreateApartmentFormData>({
    // Initialize Create Apartment form data state
  });

  const [approveRequestFormData, setApproveRequestFormData] = useState<ApproveRequestFormData>({
    apartmentId: '',
    requestId: ''
  });

  const [disapproveRequestFormData, setDisapproveRequestFormData] = useState<DisapproveRequestFormData>({
    requestId: ''
  });

  const [deleteRequestFormData, setDeleteRequestFormData] = useState<DeleteRequestFormData>({
    requestId: ''
  });

  const [updateApartmentFormData, setUpdateApartmentFormData] = useState<UpdateApartmentFormData>({
    id: '',
    apartmentType: ''

  });

  const [deleteApartmentFormData, setDeleteApartmentFormData] = useState<DeleteApartmentFormData>({
    apartmentId: ''
  });

  const [deleteUserFormData, setDeleteUserFormData] = useState<DeleteUserFormData>({
    userId: ''
  });


  const handleApproveRequestSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Send request using Axios
    axios.post('/api/approveRequest', approveRequestFormData)
      .then((response) => {
        // Handle response if needed
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  const handleDisapproveRequestSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Send request using Axios
    axios.patch(`http://localhost:3000/api/specs/disapprove/${disapproveRequestFormData.requestId}`,
      { withCredentials: true })
      .then((response) => {
        // Handle response if needed
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  const handleDeleteRequestSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Send request using Axios
    axios.delete(`http://localhost:3000/api/specs/delete/${deleteRequestFormData.requestId}`,
      { withCredentials: true })
      .then((response) => {
        // Handle response if needed
      })
      .catch((error) => {
        alert(error.response.data.errors[0].message);
      });
  };

  const handleUpdateApartmentSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Send request using Axios
    axios.patch(`http://localhost:3000/api/apartments/update/${updateApartmentFormData.id}`,
      {
        'location.address': updateApartmentFormData.location?.address,
        'location.coordinates': updateApartmentFormData.location?.coordinates,
        'location.local_govt': updateApartmentFormData.location?.local_govt,
        ...updateApartmentFormData
      },
      { withCredentials: true })
      .then((response) => {
        // Handle response if needed
      })
      .catch((error) => {
        // @ts-ignore
        alert(error.response.data.errors[0].message);
      });
  };

  const handleDeleteApartmentSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Send request using Axios
    axios.delete(`/api/deleteApartment/${deleteApartmentFormData.apartmentId}`)
      .then((response) => {
        // Handle response if needed
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  const handleDeleteUserSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Send request using Axios
    axios.delete(`/api/deleteUser/${deleteUserFormData.userId}`)
      .then((response) => {
        // Handle response if needed
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  return (
    <>
      <div className="actions-container">

        <div className="apartment-actions">
          <button style={{ borderRadius: '5%', color: 'yellowgreen' }}>
            <b>Create apartment:</b> <a href="/create">click</a>
          </button>
          <div>
            <form onSubmit={handleApproveRequestSubmit}>
              <b>Approve a request:</b>
              <input
                placeholder="input request Id"
                value={approveRequestFormData.requestId}
                onChange={(e) =>
                  setApproveRequestFormData({
                    ...approveRequestFormData,
                    requestId: e.target.value,
                  })
                }
              />
              <input
                placeholder="apartmentId"
                value={approveRequestFormData.apartmentId}
                onChange={(e) =>
                  setApproveRequestFormData({
                    ...approveRequestFormData,
                    apartmentId: e.target.value,
                  })
                }
              />
              <button type="submit">Approve</button>
            </form>
          </div>

          <div>
            <b>Disapprove a request</b>
            <form onSubmit={handleDisapproveRequestSubmit}>
              <input
                type="text"
                placeholder="request Id"
                value={disapproveRequestFormData.requestId}
                onChange={(e) =>
                  setDisapproveRequestFormData({
                    ...disapproveRequestFormData,
                    requestId: e.target.value,
                  })
                }
              />
              <button type="submit">Disapprove</button>
            </form>
          </div>

          <div>
            <h5>Delete request</h5>
            <form onSubmit={handleDeleteRequestSubmit}>
              <label>requestId</label>
              <input
                placeholder="requestId"
                value={deleteRequestFormData.requestId}
                onChange={(e) =>
                  setDeleteRequestFormData({
                    ...deleteRequestFormData,
                    requestId: e.target.value,
                  })
                }
              />
              <button type="submit">Delete</button>
            </form>
          </div>
        </div>

        <div className='apartment-actions'>
          <h5>Update apartment</h5>
          <form onSubmit={handleUpdateApartmentSubmit}>
            <label>ApartmentId</label>
            <input
              value={updateApartmentFormData.id}
              onChange={(e) =>
                setUpdateApartmentFormData({
                  ...updateApartmentFormData,
                  id: e.target.value,
                })
              }
            />
            <input />
            <input />
            <label>Location Coordinates</label>
            <input placeholder='Latitude' name='latitude' type='number' />
            <input placeholder='Longitude' name='longitude' type='number' />
            <label>Local Government</label>
            <select name='local_govt'>
              <option value=''> ---Select Location-- </option>
              <option value={'ikeja'}>Ikeja</option>
              <option value={'Alimosho'}>Alimosho</option>
              <option value={'Oshodi'}>Oshodi</option>
              <option value={'Egbeda'}>Egbeda</option>
              <option value={'Iyana-Ipaja'}>Iyana- Ipaja</option>
              <option value={'Sango'}>Sango</option>
            </select>
            <label>Landlord specs</label>
            <input placeholder='input landlord requirements' />
            <label>Description</label>
            <input />
            <label>Upload Images</label>
            <input type="file" placeholder="upload images" name='images' />
            <input type="file" placeholder="upload images" name='images' />
            <input type="file" placeholder="upload images" name='images' />
            <input type="file" placeholder="upload images" name='images' />
            <input type="file" placeholder="upload images" name='images' />
            <input type="file" placeholder="upload images" name='images' />
            <label>Form Price</label>
            <input type="number" placeholder='form price' name='formprice' />
            <label>Video price</label>
            <input placeholder='price to check video' name='videprice' />
            <label>Select room size</label>
            <select name='roomCategory'>
              <option value=''> ---Select Room Size-- </option>
              <option value='Small'>Small</option>
              <option value='Medium'>Medium</option>
              <option value='Big'>Big</option>
              <option value='Large'>Large</option>
            </select>
            <label>Select room type</label>
            <select name='apartmentType'>
              <option value=''> ---Select Room Type-- </option>
              <option value="Three Bedroom Flat">Three Bedroom Flat</option>
              <option value="Mini Flat">Mini Flat</option>
              <option value="Two Bedroom Flat">Two Bedroom Flat</option>
              <option value="single Room Flat">Single room flat</option>
              <option value="single Room">Single root</option>
            </select>
            <label>Annual price</label>
            <input type='number' name='annualPackage' placeholder='Yearly Rent' />
            <label>Total Package</label>
            <input type='number' name='totalPackage' placeholder='Full package' />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className='apartment-actions'>
          <div>
            <h5>Delete An Apartment</h5>
            <form onSubmit={handleDeleteApartmentSubmit}>
              <label>Delete</label>
              <input
                placeholder="apartment Id"
                value={deleteApartmentFormData.apartmentId}
                onChange={(e) =>
                  setDeleteApartmentFormData({
                    ...deleteApartmentFormData,
                    apartmentId: e.target.value,
                  })
                }
              />
              <button type="submit">Delete</button>
            </form>
          </div>

          <div>
            <h5>Delete User</h5>
            <form onSubmit={handleDeleteUserSubmit}>
              <input
                placeholder="user id"
                value={deleteUserFormData.userId}
                onChange={(e) =>
                  setDeleteUserFormData({
                    ...deleteUserFormData,
                    userId: e.target.value,
                  })
                }
              />
              <button type="submit">Delete</button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Actions;
