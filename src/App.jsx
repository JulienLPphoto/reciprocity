import "@fontsource/major-mono-display";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/400.css";
import './App.css'
import { useState } from 'react'
import { films } from './data/films';

function App() {
  const [selectedFilm, setSelectedFilm] = useState('portra160');
  const [seconds, setSeconds] = useState(1);
  const [result, setResult] = useState(null);

  // Regrouper les films par fabricant
  const filmsByManufacturer = films.reduce((acc, film) => {
    if (!acc[film.manufacturer]) acc[film.manufacturer] = [];
    acc[film.manufacturer].push(film);
    return acc;
  }, {});

  const calculateReciprocity = (filmType, time) => {
    const film = films.find(f => f.id === filmType);
    const constant = film ? film.constant : 1.33;
    if (time <= 1) return time;
    return Math.pow(time, constant);
  };

  const handleCalculate = () => {
    const calculatedResult = calculateReciprocity(selectedFilm, seconds);
    setResult(calculatedResult);
  };

  return (
    <div className="main-container">
      <h1 className="app-title">Reciprocity</h1>
      
      <div className="controls-container">
        <div className="control-group">
          <label htmlFor="film-select">Select Film:</label>
          <select 
            id="film-select"
            value={selectedFilm} 
            onChange={(e) => setSelectedFilm(e.target.value)}
            className="control-element"
          >
            {Object.entries(filmsByManufacturer).map(([manufacturer, films]) => (
              <optgroup key={manufacturer} label={manufacturer}>
                {films.map(film => (
                  <option key={film.id} value={film.id}>
                    {film.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="seconds-input">Input measured time in second:</label>
          <input
            id="seconds-input"
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
            min="0"
            step="1"
            className="control-element"
          />
        </div>

        <button onClick={handleCalculate} className="calculate-btn">
          Display Result
        </button>

        <div className="result-container">
          <div className="result-display">
            {result !== null ? `${result.toFixed(2)} seconds` : '---'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
