import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "7eaf2a384f9a3ef39f775eb0145c796"; 

  const fetchWeather = () => {
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-box">
        <input 
          type="text" 
          placeholder="Enter City..." 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && weather.main ? (
        <div className="weather-info">
          <h2 className="city-name">{weather.name}</h2>
          
          {/* Ekhane dynamic icon add kora hoyeche */}
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
            alt="weather-icon" 
            className="weather-icon"
          />
          
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="desc">{weather.weather[0].description}</p>
          
          <div className="details">
             <p>💧 Humidity: {weather.main.humidity}%</p>
             <p>🌬️ Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      ) : (
        weather && <p className="error">City not found!</p>
      )}
    </div>
  );
}

export default App;