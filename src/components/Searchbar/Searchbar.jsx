import { useState } from 'react';
import css from './Searchbar.module.css';
import { Notify } from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    if (value.trim() !== '') {
      onSubmit(value);
    } else {
      Notify.warning('Please provide a query');
      return;
    }
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onHandleSubmit}>
        <button className={css['searchForm-button']} type="submit">
          <span className={css['searchForm-button-label']}>Search</span>
        </button>
        <input
          onChange={handleChange}
          className={css['searchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
