import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchGallery, PER_PAGE } from 'api/fetch';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
export const ImageGallery = searchValue => {
  console.log(searchValue);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  useEffect(() => {
    setStatus('idle');
    setPage(1);
  }, [searchValue]);
  useEffect(() => {
    setStatus('pending');
    fetchGallery(searchValue, page)
      .then(resp => {
        setMaxPage(resp.totalHits / PER_PAGE);
        setStatus('resolved');
        setImages(prevState => [...prevState, ...resp.hits]);
      })
      .catch(error => {
        console.log('error :>> ', error);
        setStatus('rejected');
      });
  }, [searchValue, page]);

  const loadNextPage = () => {
    setPage(prevState => prevState + 1);
  };
  const handleClickImg = index => {
    setModalImg(index);
  };
  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <div>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={images[modalImg].largeImageURL} alt=""></img>
        </Modal>
      )}

      <List>
        {images.map(({ id, webformatURL }, index) => (
          <ImageGalleryItem
            key={id}
            onClick={() => handleClickImg(index)}
            webformatURL={webformatURL}
          />
        ))}
      </List>
      {status === 'pending' && <Loader />}
      {page < maxPage && <Button onClick={loadNextPage}>Load more</Button>}
    </div>
  );
  // }
};

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
