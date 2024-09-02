import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import '../Signup.css'
import Header from '../Header';
const ManageAddress = () => {
    const [addressType, setAddressType] = useState('home');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [addressId, setAddressId] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [areaName, setAreaName] = useState('');
    const [landmark, setLandmark] = useState('');
    const [floorNumber, setFloorNumber] = useState('');
    const [houseName, setHouseName] = useState(''); // Add state for house_name
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                // Successfully obtained position
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
              },
              (err) => {
                // Handle error
                setError(err.message);
              }
            );
          } else {
            // Browser does not support geolocation
            // setError('Geolocation is not supported by this browser.');
          }
    
    }, [])
    
    
    const handleAddressSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');
            if (!token) {
                throw new Error('No token found in localStorage.');
            }
            if (!userId) {
                throw new Error('No user_id found in localStorage.');
            }

            const addressData = {
                address_type: addressType,
                address: address,
                latitude: latitude || '',
                longitude: longitude || '',
                address_id: addressId || null,
                zip_code: zipCode || '',
                area_name: areaName || '',
                landmark: landmark || '',
                floor_number: floorNumber || '',
                house_name: houseName || '' // Include house_name here
            };

            console.log('Address Data:', addressData);

            const response = await axios.post('https://api.hirdayam.com/api/Manageaddress', addressData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Address API response:', response.data);
            setSuccess('Address managed successfully.');
            setError('');
        } catch (error) {
            console.error('Error during address submission:', error);

            if (error.response) {
                console.error('Server responded with:', error.response.data);
                setError(`Address submission failed: ${error.response.data.message || 'Unknown error'}`);
            } else {
                setError('Address submission failed. Please try again.');
            }

            setSuccess('');
        }
    };

    return (
        <div>
          <Header/>
            <h2>Manage Address</h2>
            {success && <div style={{ color: 'green' }}>{success}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className='login-form-container mt-24 md:mt-3 "'>
            <form onSubmit={handleAddressSubmit}>
                <div className="input-container">
                    <label htmlFor="address_type">Address Type:</label>
                    <select
                        id="address_type"
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                    >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="house_name">House Name:</label>
                    <input
                        type="text"
                        id="house_name"
                        name="house_name"
                        placeholder="Enter house name"
                        value={houseName}
                        onChange={(e) => setHouseName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="area_name">Area Name:</label>
                    <input
                        type="text"
                        id="area_name"
                        name="area_name"
                        placeholder="Enter area name"
                        value={areaName}
                        onChange={(e) => setAreaName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="landmark">Landmark:</label>
                    <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        placeholder="Enter landmark"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="floor_number">Floor Number:</label>
                    <input
                        type="text"
                        id="floor_number"
                        name="floor_number"
                        placeholder="Enter floor number"
                        value={floorNumber}
                        onChange={(e) => setFloorNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="latitude">Latitude:</label>
                    <input
                        type="text"
                        id="latitude"
                        name="latitude"
                        placeholder="Enter latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="longitude">Longitude:</label>
                    <input
                        type="text"
                        id="longitude"
                        name="longitude"
                        placeholder="Enter longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="zip_code">ZIP Code:</label>
                    <input
                        type="text"
                        id="zip_code"
                        name="zip_code"
                        placeholder="Enter ZIP code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Address</button>
            </form>
        </div>
        </div>
    );
};

export default ManageAddress;
