import React, { useMemo, useRef, useState } from 'react';
import AlarmMessage from '../AlarmMessage/AlarmMessage';
import ChipsItem from '../ChipsItem/ChipsItem';
import styles from './chipsInput.module.scss';

const ChipsInput = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [alarm, setAlarm] = useState(false);

  const chipsArray = useMemo(() => getChips(value), [value]);

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
        if (input.length > 1) {
          onChange(value + ',' + input);
        }
        setInput('');
      });
    }
  };

  const handleBlur = () => {
    if (input.length) {
      if (input.split('"').length % 2 === 1) {
        onChange(value + ',' + input);
        setInput('');
      } else {
        setAlarm(true);
      }
    }
  };

  const handleChipsChange = (newValue, index) => {
    console.log('handleChipsChange', newValue, index);
    if (newValue === '') {
      chipsArray.splice(index, 1);
    } else {
      chipsArray[index] = newValue;
    }

    if (chipsArray.length) {
      console.log('join');
      onChange(chipsArray.join());
    } else {
      console.log('empty');
      onChange('');
    }
  };

  return (
    <>
      <div className={styles.wrapper} onClick={handleClick}>
        {chipsArray.map((chips, index) => (
          <ChipsItem key={chips + index} value={chips} index={index} onChange={handleChipsChange} />
        ))}

        <input
          type="text"
          value={input}
          className={styles.input}
          placeholder={value ? '' : 'Введите ключевые слова'}
          ref={inputRef}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          size={value ? input.length + 1 : 20}
        />
      </div>

      <AlarmMessage show={alarm} />
    </>
  );
};

export default ChipsInput;

const getChips = (string) => {
  if (!string.length) return [];

  const chips = [];
  let quotesFlag = false;
  let startIndex = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '"') quotesFlag = !quotesFlag;
    if (string[i] === ',') {
      if (startIndex === i) {
        startIndex = i + 1;
      } else if (!quotesFlag) {
        chips.push(string.substr(startIndex, i - startIndex));
        startIndex = i + 1;
      }
    }
  }
  chips.push(string.substr(startIndex, string.length - startIndex));

  console.log(chips);
  return chips;
};
