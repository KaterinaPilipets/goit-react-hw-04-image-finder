import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, Window } from './Modal.styled';

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <Window>{children}</Window>
    </Backdrop>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
