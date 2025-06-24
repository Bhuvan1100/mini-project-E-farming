import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './components/Login.jsx';
import { SignUpPage } from './components/Sign.jsx';
import Dashboard from './components/Dashboard';
import MainPage from './components/Home';
import WeatherApp from './components/WeatherApp.jsx'
import TeaGardenTourism from './components/tourism.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/TeaGardenTourism" element={<TeaGardenTourism />} />
        <Route path="/dashboard"  element={ <Dashboard /> }/>
        <Route path="/weather"  element={ <WeatherApp /> }/>
        </Routes>
    </Router>
  );
}

export default App;