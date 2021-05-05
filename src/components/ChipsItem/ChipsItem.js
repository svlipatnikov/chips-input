import React, { useState, useRef } from 'react';
import { ReactComponent as CloseBtn } from '../../assets/closeBtn.svg';
import styles from './chipsItem.module.scss';

const ChipsItem = ({ value, onChange, index, setAlarm }) => {
  const [text, setText] = useState(value);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
    setAlarm(false);
    if (event.target.value === '') {
      onChange('', index);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleBlur = () => {
    if (text.split('"').length % 2 === 0) {
      setAlarm(true);
      inputRef.current.focus();
    } else if (text !== value) {
      onChange(text, index);
    }
    setText((text) =>
      text
        .split(',')
        .filter((item) => item !== '')
        .join()
    );
  };

  const handleClose = () => {
    onChange('', index);
    setAlarm(false);
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={text}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        size={text.length || 1}
        ref={inputRef}
      />

      <button className={styles.closeBtn} onClick={handleClose}>
        <CloseBtn />
      </button>
    </div>
  );
};

export default ChipsItem;
