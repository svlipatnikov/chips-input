import React from 'react';
import styles from './alarmMessage.module.scss';

const AlarmMessage = ({ show }) => {
  if (!show) return null;
  return <p className={styles.message}>Закройте кавычки с двух сторон</p>;
};

export default AlarmMessage;
