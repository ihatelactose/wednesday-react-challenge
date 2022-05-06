/**
 *
 * Test trackDetailsContainer sagas
 *
 */
import { takeLatest, call, put } from 'redux-saga/effects';
import trackDetailsContainerSaga, { getDetailsById } from '../saga';
import { trackDetailsContainerTypes } from '../reducer';
import { getDetails } from '@app/services/artistsApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('TrackContainer saga tests', () => {
  const generator = trackDetailsContainerSaga();
  const artistId = 1234;
  let getDetailsGenerator = getDetailsById({ trackId: artistId });

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackDetailsContainerTypes.GET_DETAILS, getDetailsById));
  });

  it('should dispatch FAILURE_GET_DETAILS once the request fails', () => {
    const res = getDetailsGenerator.next().value;
    expect(res).toEqual(call(getDetails, artistId));

    const errorReponse = {
      errorMessage: "Something went wrong, we're working on it."
    };

    expect(getDetailsGenerator.next(apiResponseGenerator(false, errorReponse)).value).toEqual(
      put({
        type: trackDetailsContainerTypes.FAILURE_GET_DETAILS,
        error: errorReponse
      })
    );
  });

  it('should dispatch SUCCESS_GET_DETAILS once the request succeeds', () => {
    getDetailsGenerator = getDetailsById({ trackId: artistId });
    const res = getDetailsGenerator.next().value;
    expect(res).toEqual(call(getDetails, artistId));

    const response = {
      resultCount: 1,
      results: [
        {
          collectionName: 'Multitude'
        }
      ]
    };

    expect(getDetailsGenerator.next(apiResponseGenerator(true, response)).value).toEqual(
      put({
        type: trackDetailsContainerTypes.SUCCESS_GET_DETAILS,
        data: response
      })
    );
  });
});
