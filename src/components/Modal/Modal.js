import { Component } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, Window } from './Modal.styled';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <Window>{this.props.children}</Window>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
