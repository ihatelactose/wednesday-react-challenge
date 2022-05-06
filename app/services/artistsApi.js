import { generateApiClient } from '@utils/apiUtils';

const itunesApi = generateApiClient('itunes');

export const getArtists = (artistName) => itunesApi.get(`/search?term=${artistName}`);
export const getDetails = (id) => itunesApi.get(`/lookup?id=${id}`);
