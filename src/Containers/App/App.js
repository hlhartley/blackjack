import './App.css';
import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';

function App() {
  const [value, setValue] = useState(1);

  useEffect(() => {
    document.title = `You have a ${value}`
  })

  const handleChange = (value) => {
    setValue(value)
  }

  return (
    <div className="App">
      <header className="App-header">
        Dealer
        <Cards
          value={value}
          handleChange={handleChange}
        />
        Player
        <Cards
          value={value}
          handleChange={handleChange}
        />
      </header>
    </div>
  );
}

export default App;