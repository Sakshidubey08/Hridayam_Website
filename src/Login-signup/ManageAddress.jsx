import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Signup.css';
import Header from '../Header';
const ManageAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressType, setAddressType] = useState('');
  const [houseName, setHouseName] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [areaName, setAreaName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addressId, setAddressId] = useState('');

  // Fetch addresses from API
  const fetchAddresses = async () => {
    try {
      const response = await axios.get('https://api.hirdayam.com/api/getAddresses');
      if (response.data.status) {
        setAddresses(response.data.data);
      } else {
        console.error('Failed to fetch addresses:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handle form submission for managing the address
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawData = {
      address_type: addressType,
      address: areaName,
      house_name: houseName,
      floor_number: floorNumber,
      landmark: landmark,
      zip_code: zipCode,
      address_id: addressId,
    };

    try {
      const response = await axios.post('https://api.hirdayam.com//Manageaddress', rawData);

      if (response.data.status) {
        console.log('Address managed successfully:', response.data.message);
        // Refetch addresses to update the list after submission
        fetchAddresses();
        // Optionally reset form fields
        resetForm();
      } else {
        console.error('Failed to manage address:', response.data.message);
      }
    } catch (error) {
      console.error('Error managing address:', error);
    }
  };

  // Handle selecting an address to edit
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setAddressType(address.address_type);
    setHouseName(address.house_name);
    setFloorNumber(address.floor_number);
    setLandmark(address.landmark);
    setAreaName(address.area_name);
    setZipCode(address.zip_code);
    setAddressId(address._id);
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedAddress(null);
    setAddressType('');
    setHouseName('');
    setFloorNumber('');
    setLandmark('');
    setAreaName('');
    setZipCode('');
    setAddressId('');
  };

  return (
    <>
    <Header/>
    <div className="manage-address-container">
      <h2 className="title">Manage Address</h2>
      <div className="address-list">
        <h3 className="address-list-title">Your Addresses</h3>
        <ul className="address-list-items">
          {addresses.map((address) => (
            <li key={address._id} className="address-list-item">
              {address.house_name}, {address.area_name}, {address.zip_code} ({address.address_type})
              <button 
                className="edit-button" 
                onClick={() => handleSelectAddress(address)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedAddress && (
        <form className="address-form" onSubmit={handleSubmit}>
          <h3 className="form-title">Edit Address</h3>
          <div className="form-group">
            <label htmlFor="addressType" className="form-label">Address Type:</label>
            <input 
              id="addressType"
              type="text" 
              className="form-input"
              value={addressType} 
              onChange={(e) => setAddressType(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="houseName" className="form-label">House Name:</label>
            <input 
              id="houseName"
              type="text" 
              className="form-input"
              value={houseName} 
              onChange={(e) => setHouseName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="floorNumber" className="form-label">Floor Number:</label>
            <input 
              id="floorNumber"
              type="text" 
              className="form-input"
              value={floorNumber} 
              onChange={(e) => setFloorNumber(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="landmark" className="form-label">Landmark:</label>
            <input 
              id="landmark"
              type="text" 
              className="form-input"
              value={landmark} 
              onChange={(e) => setLandmark(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="areaName" className="form-label">Area Name:</label>
            <input 
              id="areaName"
              type="text" 
              className="form-input"
              value={areaName} 
              onChange={(e) => setAreaName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode" className="form-label">Zip Code:</label>
            <input 
              id="zipCode"
              type="text" 
              className="form-input"
              value={zipCode} 
              onChange={(e) => setZipCode(e.target.value)} 
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
    </>
  );
};

export default ManageAddress;


