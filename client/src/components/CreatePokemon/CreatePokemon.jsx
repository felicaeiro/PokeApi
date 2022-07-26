import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon } from '../../redux/actions';
import s from './CreatePokemon.module.css';

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const { allPokemon, types } = useSelector((state) => state.data);

  const [values, setValues] = useState({
    name: '',
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPokemon(values));
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    e.target.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${
      (e.target.value * 100) / e.target.max
    }%, #fff ${e.target.value}%, #fff 100%)`;
  };

  return (
    <div className={`${s.container}`}>
      <form onSubmit={handleSubmit}></form>
      <div className={`${s.main}`}>
        <label>HP</label>
        <div id={`${s.selector}`}>{values.hp}</div>
        <input
          className={`${s.slider}`}
          type="range"
          min="1"
          max="255"
          name="hp"
          value={values.hp}
          onChange={handleChange}
        />
        <div>
          <div className={`${s.selectBtn}`}></div>
        </div>
        <div className={`${s.minmax}`}>
          <span>1</span>
          <span>255</span>
        </div>
      </div>
      <div>
        <label>Attack</label>
        <div>{values.attack}</div>
        <input
          className={`${s.slider}`}
          type="range"
          min="1"
          max="255"
          name="attack"
          value={values.attack}
          onChange={handleChange}
        />
        <div className={`${s.minmax}`}>
          <span>1</span>
          <span>255</span>
        </div>
      </div>
      <div>
        <label>Defense</label>
        <div>{values.defense}</div>
        <input
          className={`${s.slider}`}
          type="range"
          min="1"
          max="255"
          name="defense"
          value={values.defense}
          onChange={handleChange}
        />
        <div className={`${s.minmax}`}>
          <span>1</span>
          <span>255</span>
        </div>
      </div>
      <div>
        <label>Speed</label>
        <div>{values.speed}</div>
        <input
          className={`${s.slider}`}
          type="range"
          min="1"
          max="255"
          name="speed"
          value={values.speed}
          onChange={handleChange}
        />
        <div className={`${s.minmax}`}>
          <span>1</span>
          <span>255</span>
        </div>
      </div>
      <div>
        <label>Height</label>
        <div>{values.height}</div>
        <input
          className={`${s.slider}`}
          type="range"
          min="1"
          max="200"
          name="height"
          value={values.height}
          onChange={handleChange}
        />
        <div className={`${s.minmax}`}>
          <span>1</span>
          <span>200</span>
        </div>
      </div>
      <div>
        <label>Weight</label>
        <div>{values.weight}</div>
        <input
          className={`${s.slider}`}
          type="range"
          min="1"
          max="1000"
          name="weight"
          value={values.weight}
          onChange={handleChange}
        />
        <div className={`${s.minmax}`}>
          <span>1</span>
          <span>1000</span>
        </div>
      </div>
      <button type="submit">Create Pokemon</button>
    </div>
  );
}
