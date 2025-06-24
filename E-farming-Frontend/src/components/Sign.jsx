import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CityDropdown from './CityDropdown.jsx';
import StateDropdown from './StateDropdown.jsx';

export const SignUpPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [raspberryPiId, setRaspberryPiId] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleClear = (e) => {
    e.preventDefault()
    setAddress("")
    setName("")
    setEmail("")
    setPassword("")
    setRaspberryPiId("")
    setAddress("")
    setCity("")
    setState("")
    setPincode("")
    setConfirmPassword("")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
     console.log(city , state)
   
    if (!city || !state) {
      alert("Please select a city and a state!");
      return;
    }

    
    const response = await fetch('http://localhost:8000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        raspberryPiId,
        address,
        city,
        state,
        pincode,
      }),
    });

    const data = await response.json();

    if (data.success) {
      login(data.user); 
      navigate('/dashboard'); 
    } else {
      alert('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Raspberry Pi ID"
          className="w-full p-2 border rounded"
          value={raspberryPiId}
          onChange={(e) => setRaspberryPiId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <CityDropdown selectedCity={city} onChange={handleCityChange} />
        <StateDropdown selectedState={state} onChange={handleStateChange} />
        
        <input
          type="text"
          placeholder="Pincode"
          className="w-full p-2 border rounded"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <button
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        onClick={handleClear}
        >
        Reset
        </button>
      </form>
    </div>
  );
};
