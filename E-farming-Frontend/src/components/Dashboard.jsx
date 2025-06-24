import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UpdateUser from './UpdateUser';
import DashboardImage from './DashboardImage';

// Firebase imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDNZiAmL553cb906KdoZX0N0U3bvbU_5Zs",
  authDomain: "samrat-temp.firebaseapp.com",
  databaseURL: "https://samrat-temp-default-rtdb.firebaseio.com",
  projectId: "samrat-temp",
  storageBucket: "samrat-temp.appspot.com",
  messagingSenderId: "280966003569",
  appId: "1:280966003569:web:1ad9b17f84dcf4a1809440",
  measurementId: "G-KL524EC8J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState(null);
  const [visibleUser, setVisibleUser] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const sensorDataRef = ref(db, 'sensor_data');
  
    const unsubscribe = onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("🔄 Raw Sensor Data:", data);
  
      if (data) {
        const entries = Object.entries(data);
        const [latestKey, latestValue] = entries[entries.length - 1];
        
        const latestEntry = { key: latestKey, ...latestValue };
        console.log("✅ Latest Entry:", latestEntry);
        setSensorData(latestEntry);
      } else {
        console.log("⚠️ No data available");
        setSensorData(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className={`transition-all duration-300 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-4 ${visibleUser ? 'w-[30%]' : 'w-[10%]'} min-h-screen`}>
        <button
          onClick={() => setVisibleUser(prev => !prev)}
          className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md w-full"
        >
          {visibleUser ? 'Close' : 'Update User'}
        </button>
        {visibleUser && <div className="mt-4"><UpdateUser /></div>}
      </div>

      {/* Main Section */}
      <div className="flex-1 p-6 bg-gray-100 relative">
        {/* Top Button Bar */}
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => setVisibleImage(prev => !prev)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          >
            {visibleImage ? 'Close' : 'Upload Farm Image'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>

        {/* Upload Farm Image Form */}
        {visibleImage && (
          <div className="mb-6">
            <DashboardImage />
          </div>
        )}

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Info */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center">User Info</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-600">Name:</span>
                <span>{user?.name}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-600">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-600">Role:</span>
                <span>{user?.role}</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              {user?.image ? (
                <img src={`http://localhost:8000/${user.image}`} alt="Farm" className="rounded-lg max-w-xs mx-auto" />
              ) : (
                <p className="text-gray-500 italic">Upload your farm image to display here</p>
              )}
            </div>
          </div>

          {/* Sensor Data Display */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Latest Sensor Data</h2>
            {sensorData ? (
              <div className="border p-4 rounded-lg shadow-sm bg-gray-50 space-y-1 text-sm md:text-base">
                {/* Display timestamp from whichever field exists */}
                <p><strong>Date & Time:</strong> 
                  {sensorData.ISTtimes ? new Date(sensorData.ISTtimes).toLocaleString() :
                   sensorData.timestamp ? new Date(sensorData.timestamp * 1000).toLocaleString() :
                   'N/A'}
                </p>

                {/* Display all available sensor fields */}
                {sensorData.air_humidity !== undefined && <p><strong>Air Humidity:</strong> {sensorData.air_humidity}%</p>}
                {sensorData.air_temperature_c !== undefined && <p><strong>Air Temp (°C):</strong> {sensorData.air_temperature_c}°C</p>}
                {sensorData.air_temperature_f !== undefined && <p><strong>Air Temp (°F):</strong> {sensorData.air_temperature_f}°F</p>}
                {sensorData.soil_moisture !== undefined && <p><strong>Soil Moisture:</strong> {sensorData.soil_moisture}</p>}
                {sensorData.soil_temperature !== undefined && <p><strong>Soil Temp:</strong> {sensorData.soil_temperature}°C</p>}
                {sensorData.soil_conductivity !== undefined && <p><strong>Soil Conductivity:</strong> {sensorData.soil_conductivity}</p>}
                {sensorData.pH !== undefined && <p><strong>pH:</strong> {sensorData.pH}</p>}
                {sensorData.nitrogen !== undefined && <p><strong>Nitrogen:</strong> {sensorData.nitrogen}</p>}
                {sensorData.phosphorus !== undefined && <p><strong>Phosphorus:</strong> {sensorData.phosphorus}</p>}
                {sensorData.potassium !== undefined && <p><strong>Potassium:</strong> {sensorData.potassium}</p>}
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading sensor data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;