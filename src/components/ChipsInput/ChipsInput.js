import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AlarmMessage from '../AlarmMessage/AlarmMessage';
import ChipsItem from '../ChipsItem/ChipsItem';
import getChipsArray from '../../helpers/getChipsArray';
import cn from 'classnames';
import styles from './chipsInput.module.scss';

const ChipsInput = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [alarm, setAlarm] = useState(false);
  const [selection, setSelection] = useState({
    isSelected: false,
    xStart: null,
    yStart: null,
    xEnd: null,
    yEnd: null,
  });

  const chipsArray = useMemo(() => getChipsArray(value), [value]);

  const handleWrapperClick = () => {
    if (selection.xStart === selection.xEnd && selection.yStart === selection.yEnd) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    alarm && setAlarm(false);
  };

  const handleInputBlur = () => {
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
      chipsArray.length ? onChange(chipsArray.filter((item) => !!item).join()) : onChange('');
    }
  };

  const handleChipsChange = useCallback(
    (newValue, index) => {
      chipsArray[index] = newValue;
      chipsArray.length ? onChange(chipsArray.filter((item) => !!item).join()) : onChange('');
    },
    [chipsArray, onChange]
  );

  useEffect(() => {
    const handleMouseDown = (event) => {
      setSelection((selection) => ({
        ...selection,
        isSelected: true,
        xStart: event.pageX,
        yStart: event.pageY,
        xEnd: event.pageX,
        yEnd: event.pageY,
      }));
    };

    const handleMouseMove = (event) => {
      selection.isSelected &&
        setSelection((selection) => ({ ...selection, xEnd: event.pageX, yEnd: event.pageY }));
    };

    const handleMouseUp = () => {
      setSelection((selection) => ({
        ...selection,
        isSelected: false,
      }));
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [selection.isSelected, selection.xEnd, selection.xStart, selection.yEnd, selection.yStart]);

  return (
    <>
      <div className={styles.wrapper} onClick={handleWrapperClick}>
        {chipsArray.map((chips, index) => (
          <ChipsItem
            key={chips + index}
            value={chips}
            index={index}
            onChange={handleChipsChange}
            setAlarm={setAlarm}
            selection={selection}
          />
        ))}

        <input
          type="text"
          ref={inputRef}
          value={input}
          className={cn({
            [styles.input]: true,
            [styles.inputAlarm]: alarm,
          })}
          placeholder={value ? '' : 'Введите ключевые слова'}
          size={value ? input.length + 1 : 22}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
        />
      </div>

      <AlarmMessage show={alarm} />
    </>
  );
};

export default ChipsInput;
