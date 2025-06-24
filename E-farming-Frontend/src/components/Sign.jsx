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

  const handleCityChange = (e) => setCity(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);

  const handleClear = (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRaspberryPiId('');
    setAddress('');
    setCity('');
    setState('');
    setPincode('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!city || !state) {
      alert('Please select a city and a state!');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-4 border border-green-200"
      >
        <h2 className="text-3xl font-bold text-center text-green-700">Create Your Account</h2>
        <p className="text-sm text-center text-gray-500">Join the farming revolution today</p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Raspberry Pi ID"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={raspberryPiId}
          onChange={(e) => setRaspberryPiId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <CityDropdown selectedCity={city} onChange={handleCityChange} />
        <StateDropdown selectedState={state} onChange={handleStateChange} />

        <input
          type="text"
          placeholder="Pincode"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-colors font-medium"
        >
          Sign Up
        </button>
        <button
          onClick={handleClear}
          className="w-full bg-gray-200 text-gray-700 p-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
        >
          Reset
        </button>
      </form>
    </div>
  );
};
