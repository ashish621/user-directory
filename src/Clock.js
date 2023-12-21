// src/components/Clock.js
import React, { useState, useEffect } from 'react';
import './clock.css';
import { useNavigate } from 'react-router-dom';
import CountryDropdown from './countryDropdown';
const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [paused, setPaused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Asia/Kolkata');
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;

    const tick = async () => {
      if (!paused) {
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
        const data = await response.json();
        setTime(new Date(data.utc_datetime).toLocaleTimeString());
      }
    };

    intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [paused, selectedCountry]);

  const togglePause = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  const handleBack = () => {
    navigate('/'); // Navigate to the root directory
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className='clock'>
      <button onClick={handleBack} className="back-button">
        Back
      </button>
      <CountryDropdown onCountryChange={handleCountryChange} />
      <h2 className='time'>{time}</h2>
      <button className='play-button' onClick={togglePause}>
        {paused ? 'Start' : 'Pause'}
      </button>
    </div>
  );
};

export default Clock;
