import { getApiClient } from '@utils/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import { getArtists, getDetails } from '../artistsApi';

describe('ArtistsApi', () => {
  const artistsName = 'Stromae';
  const artistsId = 12345;

  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ artistsName }]
      }
    ];

    mock.onGet(`/search?term=${artistsName}`).reply(200, data);
    const res = await getArtists(artistsName);
    expect(res.data).toEqual(data);
  });

  it('should make the api call to "/lookup?id="', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        result: [{ artistsName }]
      }
    ];

    mock.onGet(`/lookup?id=${artistsId}`).reply(200, data);
    const res = await getDetails(artistsId);
    expect(res.data).toEqual(data);
  });
});
