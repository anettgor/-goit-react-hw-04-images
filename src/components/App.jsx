import { useState, useEffect } from 'react';
import axios from 'axios';
import { Notify } from 'notiflix';

import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [modal, setModal] = useState(false);
  const [alt, setAlt] = useState('');
  const [largeImg, setLargeImg] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const KEY = '33187861-b0f031d63d8289b7509252611';
  const PER_PAGE = 12;

  useEffect(() => {
    async function fetch() {
      await axios
        .get(
          `https://pixabay.com/api/?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
        )
        .then(res => {
          if (!res || res.data.hits.length === 0) {
            Notify.warning('There are no matches for this query. Try again.');
          } else if (query === '') {
            return;
          } else if (!isLoaded) {
            setIsLoaded(true);
            setItems(prevItems => [...prevItems, ...res.data.hits]);
          }
        })
        .catch(err => {
          console.warn(err);
        });
    }

    let timeout = setTimeout(() => {
      fetch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, isLoaded, page]);

  const handleSubmit = submitQuery => {
    if (submitQuery !== query) {
      setIsLoaded(false);
      setPage(1);
      setItems([]);
      setQuery(submitQuery);
    } else {
      Notify.info('You are already looking at results of this query');
    }
  };

  const showModal = (url, alt) => {
    setModal(true);
    setLargeImg(url);
    setAlt(alt);
  };

  const hideModal = () => {
    setModal(false);
  };

  const loadMore = e => {
    setIsLoaded(false);
    e.preventDefault();
    setPage(page + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplatColumns: '1fr',
        gridGap: 16,
        paddingBbottom: 24,
      }}
    >
      <Searchbar onSubmit={handleSubmit} />
      {!isLoaded && query !== '' && <Loader />}

      {items.length !== 0 && (
        <ImageGallery>
          <ImageGalleryItem hits={items} onClick={showModal} />
        </ImageGallery>
      )}

      {items.length > PER_PAGE - 1 && <Button onClick={loadMore} />}
      {modal && <Modal image={largeImg} alt={alt} onClose={hideModal} />}
    </div>
  );
};
