import React, { useState } from 'react';
import { ReactComponent as CloseBtn } from '../../assets/closeBtn.svg';
import styles from './chipsItem.module.scss';

const ChipsItem = ({ value, onChange, index }) => {
  const [text, setText] = useState(value);

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>{text}</div>

      <button className={styles.closeBtn}>
        <CloseBtn />
      </button>
    </div>
  );
};

export default ChipsItem;
