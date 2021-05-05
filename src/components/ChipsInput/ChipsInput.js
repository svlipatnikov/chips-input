import React, { useMemo, useRef, useState } from 'react';
import AlarmMessage from '../AlarmMessage/AlarmMessage';
import ChipsItem from '../ChipsItem/ChipsItem';
import getChips from '../../helpers/getChips';
import styles from './chipsInput.module.scss';

const ChipsInput = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [alarm, setAlarm] = useState(false);

  const chipsArray = useMemo(() => getChips(value), [value]);

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
    console.log(event.code);
    if (event.code === 'Comma' && input.split('"').length % 2 === 1) {
      setTimeout(() => {
        if (input.length > 1) {
          onChange(value + ',' + input);
        }
        setInput('');
      });
    } else if (event.code === 'Backspace' || event.code === 'Delete') {
      chipsArray.splice(chipsArray.length - 1, 1);
      onChangeChipsArray(chipsArray);
    }
  };

  const handleBlur = () => {
    if (input.length) {
      if (input.split('"').length % 2 === 1) {
        onChange(value + ',' + input);
        setInput('');
      } else {
        setAlarm(true);
        inputRef.current.focus();
      }
    }
  };

  const handleChipsChange = (newValue, index) => {
    if (!newValue) {
      chipsArray.splice(index, 1);
    } else {
      chipsArray[index] = newValue;
    }

    onChangeChipsArray(chipsArray);
  };

  return (
    <>
      <div className={styles.wrapper} onClick={handleClick}>
        {chipsArray.map((chips, index) => (
          <ChipsItem
            key={chips + index}
            value={chips}
            index={index}
            onChange={handleChipsChange}
            setAlarm={setAlarm}
          />
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
