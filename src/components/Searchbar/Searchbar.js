import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  SearchbarContainer,
  SearchInput,
  Button,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const onChange = e => {
    setValue(e.currentTarget.value.trim());
  };
  const handleSubmit = e => {
    e.preventDefault();
    value ? onSubmit(value) : console.log('Enter data in the search field!');
  };

  return (
    <SearchbarContainer>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ImSearch />
        </Button>
        <SearchInput
          onChange={onChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarContainer>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
