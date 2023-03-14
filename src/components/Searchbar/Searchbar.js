import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  SearchbarContainer,
  SearchInput,
  Button,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    value: '',
  };
  onChange = e => {
    this.setState({ value: e.currentTarget.value.trim() });
  };
  handleSubmit = e => {
    e.preventDefault();

    const { value } = this.state;

    value
      ? this.props.onSubmit(value)
      : console.log('Enter data in the search field!');
  };
  render() {
    return (
      <SearchbarContainer>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ImSearch />
          </Button>
          <SearchInput
            onChange={this.onChange}
            // id="searchInput"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarContainer>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
