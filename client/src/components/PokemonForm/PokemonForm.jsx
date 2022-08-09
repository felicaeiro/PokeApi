import React from 'react';
import SelectStats from '../SelectStats/SelectStats';
import s from './PokemonForm.module.css';

function PokemonForm({
  values,
  notValid,
  handleChange,
  handleSubmit,
  handleChecked,
  types,
  button,
  selectedTypes,
}) {
  return (
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
                checked={
                  selectedTypes && selectedTypes.includes(String(t.name))
                }
                name={t.name}
                onChange={handleChecked}
              />
              {t.name.charAt(0).toUpperCase() + t.name.substring(1)}
            </label>
          ))}
      </div>
      <div className={s.button}>
        <button type="submit">{button}</button>
      </div>
    </form>
  );
}

export default PokemonForm;
