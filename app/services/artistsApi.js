import { generateApiClient } from '@utils/apiUtils';

const itunesApi = generateApiClient('itunes');

export const getArtists = (artistName, limit) =>
  itunesApi.get(`/search?term=${artistName}${limit ? `&limit=${limit}` : ''}`);
export const getDetails = (id) => itunesApi.get(`/lookup?id=${id}`);
