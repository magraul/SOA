import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
    const API_URL = 'http://localhost:3000'
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = async () => {
    const response = await axios.get(`${API_URL}/weather/${city}`, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
      }
  });
    setWeatherData(response.data);
  };

  return (
    <div>
      <h2>Check the weather</h2>
      <div>
        <label htmlFor="city">Enter a city:</label>
        <input type="text" id="city" value={city} onChange={handleCityChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {weatherData && (
        <div>
          <h2>Current weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
