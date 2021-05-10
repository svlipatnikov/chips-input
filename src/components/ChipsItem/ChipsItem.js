import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ReactComponent as CloseBtn } from '../../assets/closeBtn.svg';
import cn from 'classnames';
import styles from './chipsItem.module.scss';
import isChipsSelected from '../../helpers/isChipsSelected';

const ChipsItem = ({ value, onChange, setAlarm, selection, index }) => {
  console.log('ChipsItem');
  const [text, setText] = useState(value);
  const [chipsAlarm, setChipsAlarm] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  let chipsPosition = null;
  if (wrapperRef && wrapperRef.current) {
    chipsPosition = wrapperRef.current.getBoundingClientRect();
  }

  const chipsSelect = useMemo(() => isChipsSelected(selection, chipsPosition), [
    chipsPosition,
    selection,
  ]);

  useEffect(() => {
    setAlarm(chipsAlarm);
  }, [chipsAlarm, setAlarm]);

  const handleChange = (event) => {
    setText(event.target.value);
    setChipsAlarm(false);
    !event.target.value && onChange('', index);
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleBlur = () => {
    if (text.split('"').length % 2 === 0) {
      setChipsAlarm(true);
      inputRef.current.focus();
    } else if (text !== value) {
      onChange(
        text
          .split(',')
          .filter((item) => !!item)
          .join(),
        index
      );
      setText(
        text
          .split(',')
          .filter((item) => !!item)
          .join()
      );
    }
  };

  const handleClose = () => {
    onChange('', index);
    chipsAlarm && setAlarm(false);
  };

  const chipsStyle = cn({
    [styles.wrapper]: true,
    [styles.wrapperAlarm]: chipsAlarm,
    [styles.wrapperSelect]: chipsSelect,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && chipsSelect === true) {
        setTimeout(() => {
          onChange('');
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [chipsAlarm, chipsSelect, onChange, setAlarm]);

  return (
    <div className={chipsStyle} ref={wrapperRef}>
      <input
        className={styles.input}
        value={text}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        size={text.length + 2}
        ref={inputRef}
      />

      <button
        className={cn({ [styles.closeBtn]: true, [styles.closeBtnSelect]: chipsSelect })}
        onClick={handleClose}
      >
        <CloseBtn />
      </button>
    </div>
  );
};

export default React.memo(ChipsItem);
