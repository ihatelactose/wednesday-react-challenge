/**
 *
 * Test artistsContainer sagas
 *
 */
import { takeLatest, call, put } from 'redux-saga/effects';
import artistsContainerSaga, { getArtistsByTerm } from '../saga';
import { artistsContainerTypes } from '../reducer';
import { getArtists } from '@app/services/artistsApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('ArtistsContainer saga tests', () => {
  const generator = artistsContainerSaga();
  const artistName = 'Stromae';
  let getArtistsGenerator = getArtistsByTerm({ artistsName: artistName });

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(artistsContainerTypes.REQUEST_GET_ARTISTS, getArtistsByTerm));
  });

  it('should dispatch FAILURE_GET_ARTISTS once the request fails', () => {
    const res = getArtistsGenerator.next().value;
    expect(res).toEqual(call(getArtists, artistName));

    const errorReponse = {
      errorMessage: "Something went wrong, we're working on it."
    };

    expect(getArtistsGenerator.next(apiResponseGenerator(false, errorReponse)).value).toEqual(
      put({
        type: artistsContainerTypes.FAILURE_GET_ARTISTS,
        error: errorReponse
      })
    );
  });

  it('should dispatch SUCCESS_GET_ARTISTS once the request succeeds', () => {
    getArtistsGenerator = getArtistsByTerm({ artistsName: artistName });
    const res = getArtistsGenerator.next().value;
    expect(res).toEqual(call(getArtists, artistName));

    const response = {
      resultCount: 1,
      results: [
        {
          collectionName: 'Multitude'
        }
      ]
    };

    expect(getArtistsGenerator.next(apiResponseGenerator(true, response)).value).toEqual(
      put({
        type: artistsContainerTypes.SUCCESS_GET_ARTISTS,
        data: response
      })
    );
  });
});
