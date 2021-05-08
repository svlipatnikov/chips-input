import React, { useState } from 'react';
import ChipsInput from './components/ChipsInput';
import styles from './App.module.scss';

function App() {
  const [value, setValue] = useState('');

  return (
    <div className={styles.app}>
      <ChipsInput value={value} onChange={setValue} />
      <h5>Строковое представление:</h5>
      <div> {`"${value}"`} </div>
    </div>
  );
}

export default App;
