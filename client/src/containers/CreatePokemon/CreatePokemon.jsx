import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPokemon,
  deletePokemon,
  getAllPokemon,
  getAllTypes,
  resetFilters,
} from '../../redux/actions';
import s from './CreatePokemon.module.css';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import CreatedPokemon from '../../components/CreatedPokemon/CreatedPokemon';
import { useHistory } from 'react-router-dom';
import PokemonForm from '../../components/PokemonForm/PokemonForm';

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getAllPokemon());
    dispatch(getAllTypes());
  }, [dispatch]);

  const { allPokemon, types, createdPokemon, loading, error } = useSelector(
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
    if (!/^[A-Z-]+$/gi.test(values.name)) {
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
      values.height < 0.1 ||
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
      values.weight < 0.1 ||
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
      height: 0,
      weight: 0,
      types: [],
    });
    if (e.target.name === 'create') setSuccess(false);
  };
  const handleDelete = (id) => {
    dispatch(deletePokemon(id));
    dispatch(resetFilters());
    history.push('/home');
    window.location.reload();
  };
  if (loading) return <Loading />;
  if (error) return <Error />;
  if (success) {
    return (
      <CreatedPokemon
        handleDelete={handleDelete}
        poke={createdPokemon}
        handleClick={handleCreatedClick}
      />
    );
  }
  return (
    <div className={s.container}>
      <h1 className={s.title}>Create your Pokémon!</h1>
      <PokemonForm
        values={values}
        notValid={notValid}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChecked={handleChecked}
        types={types}
        button={'Create Pokémon'}
      />
    </div>
  );
}
