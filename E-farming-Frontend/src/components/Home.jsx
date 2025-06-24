import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function MainPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  return (
    <div className="main w-full">
      {/* Top Section */}
      <div className="flex flex-col bg-cover bg-center h-[80vh] bg-[url('https://plus.unsplash.com/premium_photo-1697730310113-e44fced8e86c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVhJTIwZ2FyZGVufGVufDB8fDB8fHww')] bg-[length:100%_100%]">
        <div className="flex justify-end p-2">
          <nav className="flex flex-wrap gap-2">
            <button
              className="bg-white bg-opacity-50 text-black font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-all border border-black"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="bg-white bg-opacity-50 text-black font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-all border border-black"
              onClick={() => navigate('/signup')}
            >
              Sign-Up
            </button>
            <button
              className="bg-white bg-opacity-50 text-black font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-all border border-black"
              onClick={() => navigate('/weather')}
            >
              Weather
            </button>
            <button
              className="bg-white bg-opacity-50 text-black font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-all border border-black"
              onClick={() => navigate('/TeaGardenTourism')}
            >
              Tourism
            </button>
            <button
              className="bg-white bg-opacity-50 text-black font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-all border border-black"
              onClick={() => {
                if (user) {
                  navigate('/dashboard');
                } else {
                  alert('You must be logged in to access the dashboard.');
                }
              }}
            >
              Dashboard
            </button>
            <button
              className="bg-white bg-opacity-50 text-black font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-all border border-black "
              onClick={() => navigate('/contact')}
            >
              Contact
            </button>
          </nav>
        </div>

        <div className=" mt-28 ml-4">
          <h1 className="text-4xl font-bold text-black leading-tight">
            TEA PLANTATION <br /> COMMUNITY <br /> SERVICE
          </h1>
          <button className="text-3xl mt-6  p-2 bg-white text-black rounded-lg hover:bg-blue-300 transition-all">
            Explore More
          </button>
        </div>
      </div>

      {/* Middle Section */}
      <div className="w-full py-16 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6 gap-12">
          <div className="text-left md:w-1/2">
            <p className="text-3xl font-medium">
              Discover innovative farming <br /> and learn with us the <br /> new way of farming
            </p>
            <button className="mt-6 px-8 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg hover:scale-105 transition-all">
              Learn More
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.pexels.com/photos/2582819/pexels-photo-2582819.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Tea Plantation"
              className="rounded-full p-2 shadow-lg w-64 h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-black text-white text-center py-16">
        <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Join the Future of Farming</h2>
          <p className="text-xl mb-6">
            Explore sustainable and advanced farming techniques that boost productivity while preserving nature.
          </p>
          <button className="py-3 px-8 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:scale-105 transition-all">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
