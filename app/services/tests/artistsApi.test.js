import { getApiClient } from '@utils/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import { getArtists } from '../artistsApi';

describe('ArtistsApi', () => {
  const artistsName = 'Stromae';

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
});
