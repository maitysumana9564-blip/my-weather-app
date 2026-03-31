import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "7eaf2a3184f9a3ef39f775eb0145c796"; 

  const fetchWeather = () => {
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  };
  const getBackground = () => {
  if (!weather) return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; // Default Purple

  const condition = weather.weather[0].main;

  if (condition === "Clear") return "linear-gradient(135deg, #fcebad 0%, #f7d486 100%)"; // Sunny/Yellow
  if (condition === "Clouds") return "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)"; // Cloudy/Grey
  if (condition === "Rain") return "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)"; // Rainy/Blue
  if (condition === "Snow") return "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)"; // Snow/White
  
  return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; // Default
};

  return (
    <div style={{background: getBackground() ,minHeight: "100vh",transition:'0.5s',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    
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