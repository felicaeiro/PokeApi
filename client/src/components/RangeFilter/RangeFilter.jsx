import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './RangeFilter.module.css';

function RangeFilter({ name, label, min, max, onChange }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ key: name, min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange, name]);

  return (
    <div className={s.wrapper}>
      <h4>{label}</h4>
      <div className={s.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal < min ? min : minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className={s.thumb}
          style={{ zIndex: minVal > max - 100 && 5 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal > max ? max : maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className={s.thumb}
        />

        <div className={s.slider}>
          <div className={s.sliderTrack} />
          <div ref={range} className={s.sliderRange} />
          <input
            type="text"
            className={s.sliderLeftValue}
            value={minVal < min ? min : minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
              minValRef.current = value;
            }}
          />
          <input
            type="text"
            className={s.sliderRightValue}
            value={maxVal > max ? max : maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
              maxValRef.current = value;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RangeFilter;
