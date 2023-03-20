import { useState } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
export const App = () => {
  const [shearchValue, setShearchValue] = useState('');

  const handleSubmit = shearchValue => {
    setShearchValue(shearchValue);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      {shearchValue && <ImageGallery searchValue={shearchValue}></ImageGallery>}
    </div>
  );
};
