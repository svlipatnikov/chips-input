import React, { useState } from 'react';
import ChipsInput from './components/ChipsInput';
import './App.css';

function App() {
  const [value, setValue] = useState('это первый чипс,это "второй," чипс');

  return (
    <div className="App">
      <ChipsInput value={value} onChange={setValue} />
      <p>Строковое представление: {value}</p>
    </div>
  );
}

export default App;
