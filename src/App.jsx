 import { useState } from 'react'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);


  const API_KEY = "7eaf2a3184f9a3ef39f775eb0145c796"; 


  const fetchWeather = () => {
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Enter City..." 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button onClick={fetchWeather} style={{ padding: "10px 20px", marginLeft: "10px", cursor: "pointer" }}>
        Search
      </button>

      {weather && weather.main ? (
        <div style={{ marginTop: "30px" }}>
          <h2>{weather.name}</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>No data found. Search for a city!</p>
      )}
    </div>
  );
}

export default App;