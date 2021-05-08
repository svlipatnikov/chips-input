import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ReactComponent as CloseBtn } from '../../assets/closeBtn.svg';
import cn from 'classnames';
import styles from './chipsItem.module.scss';

const ChipsItem = ({ value, onChange, setAlarm, selection }) => {
  const [text, setText] = useState(value);
  const [chipsAlarm, setChipsAlarm] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  let chipsPosition = null;
  if (wrapperRef && wrapperRef.current) {
    chipsPosition = wrapperRef.current.getBoundingClientRect();
  }

  const chipsSelect = useMemo(() => isChipsSelected(selection, chipsPosition), [
    selection,
    chipsPosition,
  ]);

  console.log(chipsSelect);

  useEffect(() => {
    setAlarm(chipsAlarm);
  }, [chipsAlarm, setAlarm]);

  const handleChange = (event) => {
    setText(event.target.value);
    setChipsAlarm(false);
    !event.target.value && onChange('');
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
          .join()
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
    onChange('');
    if (chipsAlarm) setAlarm(false);
  };

  const chipsStyle = cn({
    [styles.wrapper]: true,
    [styles.wrapperAlarm]: chipsAlarm,
    [styles.wrapperSelect]: chipsSelect,
  });

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

export default ChipsItem;

const isChipsSelected = (selection, chipsPosition) => {
  if (!chipsPosition) return false;

  const { left, right, top, bottom } = chipsPosition;
  const selectionTop = selection.yStart < selection.yEnd ? selection.yStart : selection.yEnd;
  const selectionBottom = selection.yStart > selection.yEnd ? selection.yStart : selection.yEnd;
  const selectionLeft = selection.xStart < selection.xEnd ? selection.xStart : selection.xEnd;
  const selectionRight = selection.xStart > selection.xEnd ? selection.xStart : selection.xEnd;

  // селект ниже чипса
  if (selectionTop > bottom) {
    return false;
  }

  // верхняя граница селекта внутри чипса
  if (selectionTop < bottom && selectionTop > top) {
    if (selectionLeft < right) {
      return true;
    }
    return false;
  }

  // чипс полность входит в селект
  if (selectionTop < top && selectionBottom > bottom) {
    return true;
  }

  // нижняя граница селекта внутри чипса
  if (selectionBottom > top && selectionBottom < bottom) {
    if (selectionRight > left) {
      return true;
    }
    return false;
  }

  // селект выше чипса
  if (selectionBottom < top) {
    return false;
  }
};
