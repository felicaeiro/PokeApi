import React, { useState } from 'react';
import PokemonForm from '../../components/PokemonForm/PokemonForm';
import s from './EditPokemon.module.css';

function EditPokemon({
  valuesToUpdate,
  handleEditClose,
  handleEdit,
  allPokemon,
  allTypes,
}) {
  const [valuesUpdated, setValuesUpdated] = useState(valuesToUpdate);
  const [notValid, setNotValid] = useState({});

  const handleChange = (e) => {
    setValuesUpdated({ ...valuesUpdated, [e.target.name]: e.target.value });
    setNotValid((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleChecked = (e) => {
    let isSelected = e.currentTarget.checked;
    const limit = 2;
    const selectedType = e.target.name;

    if (isSelected) {
      if (valuesUpdated.types.length < limit) {
        setValuesUpdated({
          ...valuesUpdated,
          types: [...valuesUpdated.types, selectedType],
        });
      } else {
        setNotValid({
          ...notValid,
          types: 'You can only select up to two types.',
        });
        e.currentTarget.checked = false;
      }
    } else {
      setNotValid({ ...notValid, types: '' });
      setValuesUpdated({
        ...valuesUpdated,
        types: valuesUpdated.types.filter((t) => t !== selectedType),
      });
    }
  };

  const validate = () => {
    let formIsValid = true;
    if (!/^[A-Z-]+$/gi.test(valuesUpdated.name)) {
      setNotValid((prev) => ({
        ...prev,
        name: 'The name can only have letters.',
      }));
      formIsValid = false;
    }
    if (valuesUpdated.name.length > 10 || valuesUpdated.name.length < 3) {
      setNotValid((prev) => ({
        ...prev,
        name: `The name should be 3-10 characters.`,
      }));
      formIsValid = false;
    }
    if (valuesUpdated.name !== valuesToUpdate.name) {
      if (allPokemon.some((p) => p.name === valuesUpdated.name.toLowerCase())) {
        setNotValid((prev) => ({
          ...prev,
          name: `There's already a Pokémon with that name`,
        }));
        formIsValid = false;
      }
    }
    if (
      valuesUpdated.hp > 255 ||
      valuesUpdated.hp < 1 ||
      !/^[0-9]+$/gi.test(valuesUpdated.hp)
    ) {
      setNotValid((prev) => ({
        ...prev,
        hp: `HP should be between 1 and 255`,
      }));
      formIsValid = false;
    }
    if (
      valuesUpdated.attack > 200 ||
      valuesUpdated.attack < 1 ||
      !/^[0-9]+$/gi.test(valuesUpdated.attack)
    ) {
      setNotValid((prev) => ({
        ...prev,
        attack: `Attack should be between 1 and 200`,
      }));
      formIsValid = false;
    }
    if (
      valuesUpdated.specialAttack > 200 ||
      valuesUpdated.specialAttack < 1 ||
      !/^[0-9]+$/gi.test(valuesUpdated.specialAttack)
    ) {
      setNotValid((prev) => ({
        ...prev,
        specialAttack: `Special Attack should be between 1 and 200`,
      }));
      formIsValid = false;
    }
    if (
      valuesUpdated.defense > 255 ||
      valuesUpdated.defense < 1 ||
      !/^[0-9]+$/gi.test(valuesUpdated.defense)
    ) {
      setNotValid((prev) => ({
        ...prev,
        defense: `Defense should be between 1 and 255`,
      }));
      formIsValid = false;
    }
    if (
      valuesUpdated.specialDefense > 255 ||
      valuesUpdated.specialDefense < 1 ||
      !/^[0-9]+$/gi.test(valuesUpdated.specialDefense)
    ) {
      setNotValid((prev) => ({
        ...prev,
        specialDefense: `Special Defense should be between 1 and 255`,
      }));
      formIsValid = false;
    }
    if (
      valuesUpdated.speed > 200 ||
      valuesUpdated.speed < 1 ||
      !/^[0-9]+$/gi.test(valuesUpdated.speed)
    ) {
      setNotValid((prev) => ({
        ...prev,
        speed: `Speed should be between 1 and 200`,
      }));
      formIsValid = false;
    }
    if (
      valuesUpdated.height > 20 ||
      valuesUpdated.height < 0.1 ||
      !/^([0-9]*[.])?[0-9]+$/gi.test(valuesUpdated.height)
    ) {
      setNotValid((prev) => ({
        ...prev,
        height: `Height should be between 0.1 m. and 20 m.`,
      }));
      formIsValid = false;
    }
    if (
      valuesUpdated.weight > 1000 ||
      valuesUpdated.weight < 0.1 ||
      !/^([0-9]*[.])?[0-9]+$/gi.test(valuesUpdated.weight)
    ) {
      setNotValid((prev) => ({
        ...prev,
        weight: `Weight should be between 0.1 kg. and 1000 kg.`,
      }));
      formIsValid = false;
    }
    if (!valuesUpdated.types.length) {
      setNotValid((prev) => ({ ...prev, types: 'Please select a type' }));
      formIsValid = false;
    }
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (valuesToUpdate.name === valuesUpdated.name) {
        setValuesUpdated(delete valuesUpdated.name);
      }
      setNotValid({});
      handleEdit(valuesUpdated);
    }
  };
  return (
    <div className={s.container}>
      <button className={s.closeButton} onClick={handleEditClose}>
        X
      </button>
      <PokemonForm
        values={valuesUpdated}
        notValid={notValid}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChecked={handleChecked}
        types={allTypes}
        selectedTypes={valuesUpdated.types}
        button={'Edit Pokémon'}
      />
    </div>
  );
}

export default EditPokemon;
