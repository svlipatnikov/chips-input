import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as CloseBtn } from '../../assets/closeBtn.svg';
import styles from './chipsItem.module.scss';

const ChipsItem = ({ value, onChange, setAlarm }) => {
  const [text, setText] = useState(value);
  const [chipsAlarm, setChipsAlarm] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setAlarm(chipsAlarm);
  }, [chipsAlarm, setAlarm]);

  const handleChange = (event) => {
    setText(event.target.value);

    setChipsAlarm(false); //TODO

    if (event.target.value === '') {
      onChange('');
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleBlur = () => {
    if (text.split('"').length % 2 === 0) {
      setChipsAlarm(true); //TODO
      inputRef.current.focus();
    } else if (text !== value) {
      onChange(text);
    }
    setText((text) =>
      text
        .split(',')
        .filter((item) => item !== '')
        .join()
    );
  };

  const handleClose = () => {
    onChange('');
    setChipsAlarm(false); //TODO
  };

  return (
    <div className={chipsAlarm ? styles.wrapperAlarm : styles.wrapperNorm}>
      <input
        className={styles.input}
        value={text}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        size={text.length * 1.1 || 1}
        ref={inputRef}
      />

      <button className={styles.closeBtn} onClick={handleClose}>
        <CloseBtn />
      </button>
    </div>
  );
};

export default ChipsItem;
