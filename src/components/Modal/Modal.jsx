import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ image, onClose, alt }) => {
  useEffect(() => {
    const escFunction = e => {
      if (e.code === 'Escape') {
        return onClose();
      }
    };

    window.addEventListener('keydown', escFunction);

    return () => {
      window.removeEventListener('keydown', escFunction);
    };
  }, [onClose]);

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img src={image} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string,
  onClose: PropTypes.func,
  alt: PropTypes.string,
};
