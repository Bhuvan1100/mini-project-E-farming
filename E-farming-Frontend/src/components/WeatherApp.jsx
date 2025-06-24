import React, { useState } from 'react';
import clear from '../assets/images/clear.png';
import clouds from '../assets/images/clouds.png';
import drizzle from '../assets/images/drizzle.png';
import humidity from '../assets/images/humidity.png';
import mist from '../assets/images/mist.png';
import rain from '../assets/images/rain.png';
import snow from '../assets/images/snow.png';
import wind from '../assets/images/wind.png';
import searchIcon from '../assets/images/search.png';

import { useNavigate } from 'react-router-dom';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const apiKey = '3f169134b9d20156ba63b212bfc9da71';

  const navigate = useNavigate();

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        setError(true);
        setWeatherData(null);
        return;
      }

      const data = await response.json();
      setWeatherData(data);
      setError(false);
    } catch (err) {
      setError(true);
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (type) => {
    switch (type) {
      case 'Clear': return clear;
      case 'Clouds': return clouds;
      case 'Rain': return rain;
      case 'Drizzle': return drizzle;
      case 'Mist': return mist;
      case 'Snow': return snow;
      default: return clear;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 to-slate-500 flex items-center justify-center font-sans px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 border border-gray-200">

      <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md shadow hover:bg-blue-200 transition duration-200"
        >
          <span className="text-lg">←</span>
          <span className="text-sm font-medium">Back to Home</span>
      </button>

        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Weather Dashboard</h1>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getWeather()}
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={getWeather}
            className="p-2 bg-blue-500 rounded-md hover:bg-blue-600 transition"
          >
            <img src={searchIcon} alt="search" className="w-5 invert" />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">Invalid city name. Please try again.</p>}

        {weatherData && (
          <div className="text-gray-800">
            <div className="text-center mb-6">
              <img
                src={getWeatherIcon(weatherData.weather[0].main)}
                alt="weather icon"
                className="w-28 mx-auto mb-3"
              />
              <h2 className="text-5xl font-bold">{Math.round(weatherData.main.temp)}°C</h2>
              <p className="text-lg text-gray-600">{weatherData.name}, {weatherData.sys.country}</p>
              <p className="text-sm italic text-gray-500 capitalize">{weatherData.weather[0].description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-semibold">Feels Like</p>
                <p>{Math.round(weatherData.main.feels_like)}°C</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-semibold">Min / Max</p>
                <p>{Math.round(weatherData.main.temp_min)}° / {Math.round(weatherData.main.temp_max)}°</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-semibold">Humidity</p>
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-semibold">Wind Speed</p>
                <p>{weatherData.wind.speed} km/h</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-semibold">Pressure</p>
                <p>{weatherData.main.pressure} hPa</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-semibold">Visibility</p>
                <p>{weatherData.visibility / 1000} km</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-semibold">Cloudiness</p>
                <p>{weatherData.clouds.all}%</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-semibold">Sunrise</p>
                <p>{formatTime(weatherData.sys.sunrise)}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow">
                <p className="font-semibold">Sunset</p>
                <p>{formatTime(weatherData.sys.sunset)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
