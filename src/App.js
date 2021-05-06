import React, { useState } from 'react';
import ChipsInput from './components/ChipsInput';
import './App.css';

function App() {
  const [value, setValue] = useState('');

  return (
    <div className="App">
      <ChipsInput value={value} onChange={setValue} />
      <h5>Строковое представление:</h5>
      <div>{value}</div>
    </div>
  );
}

export default App;
