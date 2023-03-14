import axios from 'axios';

const API_KEY = '32867517-775a58f450fa05e0fc64e3e7e';
const URL = 'https://pixabay.com/api/';
export const PER_PAGE = 12;

export function fetchGallery(searchValue, page = 1) {
  return axios
    .get(URL, {
      params: {
        page,
        key: API_KEY,
        per_page: PER_PAGE,
        q: searchValue,
        image_type: 'photo',
      },
    })
    .then(resp => {
      return resp.data;
    });
}
