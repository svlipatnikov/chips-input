import React, { useState } from 'react';
import { ReactComponent as CloseBtn } from '../../assets/closeBtn.svg';
import styles from './chipsItem.module.scss';

const ChipsItem = ({ value, onChange, index }) => {
  const [text, setText] = useState(value);

  const handleChange = (event) => {
    setText(event.target.value);
    if (event.target.value === '') onChange('', index);
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleBlur = () => {
    if (text !== value) onChange(text, index);
  };

  const handleClose = () => {
    onChange('', index);
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
      />

      <button className={styles.closeBtn} onClick={handleClose}>
        <CloseBtn />
      </button>
    </div>
  );
};

export default ChipsItem;
