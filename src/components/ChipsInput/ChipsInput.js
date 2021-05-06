import React, { useMemo, useRef, useState } from 'react';
import AlarmMessage from '../AlarmMessage/AlarmMessage';
import ChipsItem from '../ChipsItem/ChipsItem';
import getChipsArray from '../../helpers/getChipsArray';
import styles from './chipsInput.module.scss';

const ChipsInput = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [alarm, setAlarm] = useState(false);

  const chipsArray = useMemo(() => getChipsArray(value), [value]);

  const onChangeChipsArray = (array) => {
    if (array.length) {
      onChange(array.join());
    } else {
      onChange('');
    }
  };

  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleInput = (event) => {
    setInput(event.target.value);
    if (alarm) {
      setAlarm(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === ',' && input.split('"').length % 2 === 1) {
      setTimeout(() => {
        if (input.length) {
          value ? onChange(value + ',' + input) : onChange(input);
        }
        setInput('');
      });
    } else if (!input.length && (event.key === 'Backspace' || event.key === 'Delete')) {
      chipsArray.splice(chipsArray.length - 1, 1);
      onChangeChipsArray(chipsArray);
    }
  };

  const handleBlur = () => {
    if (input.length) {
      if (input.split('"').length % 2 === 1) {
        value ? onChange(value + ',' + input) : onChange(input);
        setInput('');
      } else {
        inputRef.current.focus();
        setAlarm(true);
      }
    }
  };

  const handleChipsChange = (index) => (newValue) => {
    newValue ? (chipsArray[index] = newValue) : chipsArray.splice(index, 1);
    onChangeChipsArray(chipsArray);
  };

  return (
    <>
      <div className={styles.wrapper} onClick={handleClick}>
        {chipsArray.map((chips, index) => (
          <ChipsItem
            key={chips + index}
            value={chips}
            onChange={handleChipsChange(index)}
            setAlarm={setAlarm}
          />
        ))}

        <input
          type="text"
          ref={inputRef}
          value={input}
          className={alarm ? styles.inputAlarm : styles.inputNorm}
          placeholder={value ? '' : 'Введите ключевые слова'}
          size={value ? input.length + 1 : 22}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      </div>

      <AlarmMessage show={alarm} />
    </>
  );
};

export default ChipsInput;
