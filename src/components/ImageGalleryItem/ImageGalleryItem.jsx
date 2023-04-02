import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ hits, onClick }) => {
  return hits.map(hit => (
    <li
      className={css.imageGalleryItem}
      key={hit.id}
      onClick={() => onClick(hit.largeImageURL, hit.tags)}
    >
      <img
        alt={hit.tags}
        src={hit.webformatURL}
        className={css['imageGalleryItem-image']}
      ></img>
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  hits: PropTypes.array,
  onClick: PropTypes.func,
};
