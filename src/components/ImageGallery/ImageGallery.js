import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchGallery, PER_PAGE } from 'api/fetch';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
export class ImageGallery extends Component {
  state = {
    images: [],

    status: 'idle',
    page: 10,
    maxPage: 1,
    showModal: false,
    modalImg: '',
  };
  componentDidUpdate(prevProps, prevState) {
    const prevSearchValue = prevProps.searchValue.trim();
    const curentSearchValue = this.props.searchValue.trim();

    if (
      (prevSearchValue !== curentSearchValue && this.startSearch()) ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      fetchGallery(curentSearchValue, this.state.page)
        .then(resp => {
          this.setState({
            images: [...this.state.images, ...resp.hits],
            status: 'resolved',
            maxPage: resp.totalHits / PER_PAGE,
          });
        })
        .catch(error => {
          console.log('error :>> ', error);
          this.setState({ status: 'rejected' });
        });
    }
  }
  startSearch = searchValue => {
    this.setState({
      page: 1,
      images: [],
      maxPage: 1,
      modalImg: '',
    });
  };
  loadNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  handleClickImg = index => {
    this.setState({
      showModal: true,
      modalImg: index,
    });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { status, images, page, maxPage, showModal, modalImg } = this.state;

    if (status === 'pending') return <Loader />;
    if (status === 'resolved') {
      return (
        <div>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={images[modalImg].largeImageURL} alt=""></img>
            </Modal>
          )}
          <List>
            {images.map(({ id, webformatURL }, index) => (
              <ImageGalleryItem
                key={id}
                onClick={() => this.handleClickImg(index)}
                webformatURL={webformatURL}
              />
            ))}
          </List>
          {page < maxPage && (
            <Button onClick={this.loadNextPage}>Load more</Button>
          )}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
//   render() {
//     const { images } = this.state;
//     return (
//       <div>
//         <ul className="gallery">
//           {images.map(({ id, webformatURL }, index) => (
//             <ImageGalleryItem
//               key={id}
//               onClick={() => this.handleClickImg(index)}
//               webformatURL={webformatURL}
//             />
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }
