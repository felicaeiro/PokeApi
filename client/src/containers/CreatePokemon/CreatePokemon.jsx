import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getAllPokemon, getAllTypes } from '../../redux/actions';
import s from './CreatePokemon.module.css';
import SelectStats from '../../components/SelectStats/SelectStats';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import CreatedPokemon from '../../components/CreatedPokemon/CreatedPokemon';

export default function CreatePokemon() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPokemon());
    dispatch(getAllTypes());
  }, [dispatch]);

  const { allPokemon, types, loading, error } = useSelector(
    (state) => state.data
  );

  const [notValid, setNotValid] = useState({});
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    name: '',
    hp: 1,
    attack: 1,
    specialAttack: 1,
    defense: 1,
    specialDefense: 1,
    speed: 1,
    height: 0,
    weight: 0,
    types: [],
  });

  const validate = () => {
    let formIsValid = true;
    if (!/^[A-Z\-]+$/gi.test(values.name)) {
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
    if (allPokemon.some((p) => p.name === values.name.toLowerCase())) {
      setNotValid((prev) => ({
        ...prev,
        name: `There's already a Pokémon with that name`,
      }));
      formIsValid = false;
    }
    if (values.hp > 255 || values.hp < 1 || !/^[0-9]+$/gi.test(values.hp)) {
      setNotValid((prev) => ({
        ...prev,
        hp: `HP should be between 1 and 255`,
      }));
      formIsValid = false;
    }
    if (
      values.attack > 200 ||
      values.attack < 1 ||
      !/^[0-9]+$/gi.test(values.attack)
    ) {
      setNotValid((prev) => ({
        ...prev,
        attack: `Attack should be between 1 and 200`,
      }));
      formIsValid = false;
    }
    if (
      values.specialAttack > 200 ||
      values.specialAttack < 1 ||
      !/^[0-9]+$/gi.test(values.specialAttack)
    ) {
      setNotValid((prev) => ({
        ...prev,
        specialAttack: `Special Attack should be between 1 and 200`,
      }));
      formIsValid = false;
    }
    if (
      values.defense > 255 ||
      values.defense < 1 ||
      !/^[0-9]+$/gi.test(values.defense)
    ) {
      setNotValid((prev) => ({
        ...prev,
        defense: `Defense should be between 1 and 255`,
      }));
      formIsValid = false;
    }
    if (
      values.specialDefense > 255 ||
      values.specialDefense < 1 ||
      !/^[0-9]+$/gi.test(values.specialDefense)
    ) {
      setNotValid((prev) => ({
        ...prev,
        specialDefense: `Special Defense should be between 1 and 255`,
      }));
      formIsValid = false;
    }
    if (
      values.speed > 200 ||
      values.speed < 1 ||
      !/^[0-9]+$/gi.test(values.speed)
    ) {
      setNotValid((prev) => ({
        ...prev,
        speed: `Speed should be between 1 and 200`,
      }));
      formIsValid = false;
    }
    if (
      values.height > 20 ||
      values.height < 0 ||
      !/^([0-9]*[.])?[0-9]+$/gi.test(values.height)
    ) {
      setNotValid((prev) => ({
        ...prev,
        height: `Height should be between 0.1 m. and 20 m.`,
      }));
      formIsValid = false;
    }
    if (
      values.weight > 1000 ||
      values.weight < 0 ||
      !/^([0-9]*[.])?[0-9]+$/gi.test(values.weight)
    ) {
      setNotValid((prev) => ({
        ...prev,
        weight: `Weight should be between 0.1 kg. and 1000 kg.`,
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

    setValues((prev) => ({ ...prev, name: values.name }));

    if (validate()) {
      dispatch(createPokemon(values));
      setNotValid({});
      setSuccess(true);
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
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setNotValid((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleCreatedClick = (e) => {
    setValues({
      name: '',
      hp: 1,
      attack: 1,
      specialAttack: 1,
      defense: 1,
      specialDefense: 1,
      speed: 1,
      height: 1,
      weight: 1,
      types: [],
    });
    if (e.target.name === 'create') setSuccess(false);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (success) {
    return <CreatedPokemon poke={values} handleClick={handleCreatedClick} />;
  }
  return (
    <div className={s.container}>
      <h1 className={s.title}>Create your Pokémon!</h1>
      <form className={s.content} onSubmit={handleSubmit}>
        <div className={s.nameInput}>
          <label className={s.formLabel}>Name: </label>
          <input
            className={(notValid.name && s.dangerInput) || s.input}
            type="text"
            name="name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className={s.alertName}>
          {notValid.name && <span className={s.danger}> {notValid.name}</span>}
        </div>
        <div className={s.heightWeight}>
          <div>
            <label className={s.formLabel}>Height: </label>
            <input
              className={(notValid.height && s.dangerInput) || s.input}
              type="text"
              name="height"
              autoComplete="off"
              value={values.height}
              onChange={handleChange}
            />
            <span> m.</span>
          </div>

          <div>
            <label className={s.formLabel}>Weight: </label>
            <input
              className={(notValid.weight && s.dangerInput) || s.input}
              type="text"
              name="weight"
              autoComplete="off"
              value={values.weight}
              onChange={handleChange}
            />
            <span> kg.</span>
          </div>
        </div>
        <div className={s.alertHeightWeight}>
          <span className={s.danger}>
            {notValid.height && <span> {notValid.height}</span>}
          </span>
          <span className={s.danger}>
            {notValid.weight && (
              <span className={s.danger}> {notValid.weight}</span>
            )}
          </span>
        </div>
        <div className={s.stats}>
          <SelectStats
            label="HP"
            name="hp"
            min="1"
            max="255"
            value={values.hp}
            notValid={notValid.hp}
            handleChange={handleChange}
          />
          <SelectStats
            label="Attack"
            name="attack"
            min="1"
            max="200"
            value={values.attack}
            notValid={notValid.attack}
            handleChange={handleChange}
          />
          <SelectStats
            label="Special Attack"
            name="specialAttack"
            min="1"
            max="200"
            value={values.specialAttack}
            notValid={notValid.specialAttack}
            handleChange={handleChange}
          />
          <SelectStats
            label="Defense"
            name="defense"
            min="1"
            max="255"
            value={values.defense}
            notValid={notValid.defense}
            handleChange={handleChange}
          />
          <SelectStats
            label="Special Defense"
            name="specialDefense"
            min="1"
            max="200"
            value={values.specialDefense}
            notValid={notValid.specialDefense}
            handleChange={handleChange}
          />
          <SelectStats
            label="Speed"
            name="speed"
            min="1"
            max="200"
            value={values.speed}
            notValid={notValid.speed}
            handleChange={handleChange}
          />
        </div>
        <div className={s.alertSliders}>
          <span>
            {notValid.hp && <span className={s.danger}> {notValid.hp}</span>}
          </span>
          <span>
            {notValid.attack && (
              <span className={s.danger}> {notValid.attack}</span>
            )}
          </span>
          <span>
            {notValid.specialAttack && (
              <span className={s.danger}> {notValid.specialAttack}</span>
            )}
          </span>
          <span>
            {notValid.defense && (
              <span className={s.danger}> {notValid.defense}</span>
            )}
          </span>
          <span>
            {notValid.specialDefense && (
              <span className={s.danger}> {notValid.specialDefense}</span>
            )}
          </span>
          <span>
            {notValid.speed && (
              <span className={s.danger}> {notValid.speed}</span>
            )}
          </span>
        </div>
        <label className={(notValid.types && s.danger) || s.formLabel}>
          Select your Pokémon's types
        </label>
        {notValid.types && <span className={s.danger}> {notValid.types}</span>}
        <div className={s.types}>
          {types &&
            types.map((t) => (
              <label key={t.id} className={s.checkLabel}>
                <input
                  className={s.checkbox}
                  type="checkbox"
                  name={t.name}
                  onChange={handleChecked}
                />
                {t.name.charAt(0).toUpperCase() + t.name.substring(1)}
              </label>
            ))}
        </div>
        <div className={s.button}>
          <button type="submit">Create Pokémon</button>
        </div>
      </form>
    </div>
  );
}
