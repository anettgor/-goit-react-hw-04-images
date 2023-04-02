import { Grid } from 'react-loader-spinner';
import React from 'react';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <Grid
        className={css.loader}
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
