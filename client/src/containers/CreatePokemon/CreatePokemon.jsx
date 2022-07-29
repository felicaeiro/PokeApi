import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getAllPokemon, getAllTypes } from '../../redux/actions';
import s from './CreatePokemon.module.css';
import { Slider } from '../../components/Slider/Slider';
import Loading from '../../components/Loading/Loading';

export default function CreatePokemon() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPokemon());
    dispatch(getAllTypes());
  }, [dispatch]);

  const { allPokemon, types, loading } = useSelector((state) => state.data);

  const [notValid, setNotValid] = useState({});
  const [values, setValues] = useState({
    name: '',
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: 1,
    weight: 1,
    types: [],
  });

  const validate = () => {
    let formIsValid = true;
    if (!/^[A-Z]+$/gim.test(values.name)) {
      setNotValid((prev) => ({
        ...prev,
        name: 'The name can only have letters.',
      }));
      formIsValid = false;
    }
    if (values.name.length > 10 || values.name.length < 3) {
      setNotValid((prev) => ({
        ...prev,
        name: `The name should be 3-10 characters.`,
      }));
      formIsValid = false;
    }
    if (allPokemon.some((p) => p.name === values.name)) {
      setNotValid((prev) => ({
        ...prev,
        name: `There's already a Pokémon with that name`,
      }));
      formIsValid = false;
    }
    if (!values.types.length) {
      setNotValid((prev) => ({ ...prev, types: 'Please select a type' }));
      formIsValid = false;
    }
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(createPokemon(values));
      setNotValid({});
      setValues({
        name: '',
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 1,
        weight: 1,
        types: [],
      });
      alert(
        values.name.charAt(0).toUpperCase() +
          values.name.substring(1) +
          ' created successfully!'
      );
    }
  };

  const handleChecked = (e) => {
    let isSelected = e.currentTarget.checked;
    const limit = 2;
    const selectedType = e.target.name;

    if (isSelected) {
      if (values.types.length < limit) {
        setValues({ ...values, types: [...values.types, selectedType] });
      } else {
        e.preventDefault();
        setNotValid({
          ...notValid,
          types: 'You can only select up to two types.',
        });
        e.currentTarget.checked = false;
      }
    } else {
      setNotValid({ ...notValid, types: '' });
      setValues({
        ...values,
        types: values.types.filter((t) => t !== selectedType),
      });
    }
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) return <Loading />;

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            className={notValid.name && s.danger}
            type="text"
            name="name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
          />
          {notValid.name && <span className={s.danger}> {notValid.name}</span>}
        </div>
        <Slider
          name="hp"
          min="1"
          max="255"
          value={values.hp}
          handleChange={handleChange}
        />
        <Slider
          name="attack"
          min="1"
          max="255"
          value={values.attack}
          handleChange={handleChange}
        />
        <Slider
          name="defense"
          min="1"
          max="255"
          value={values.defense}
          handleChange={handleChange}
        />
        <Slider
          name="speed"
          min="1"
          max="200"
          value={values.speed}
          handleChange={handleChange}
        />
        <Slider
          name="height"
          min="1"
          max="255"
          value={values.height}
          handleChange={handleChange}
        />
        <Slider
          name="weight"
          min="1"
          max="255"
          value={values.weight}
          handleChange={handleChange}
        />
        <label className={notValid.types && s.danger}>
          Select your Pokemon's types
        </label>
        {notValid.types && <span className={s.danger}> {notValid.types}</span>}
        <div name="types">
          {types &&
            types.map((t) => (
              <label key={t.id}>
                <input type="checkbox" name={t.name} onChange={handleChecked} />
                {t.name.charAt(0).toUpperCase() + t.name.substring(1)}
              </label>
            ))}
        </div>
        <button type="submit">Create Pokemon</button>
      </form>
    </div>
  );
}
