import { artistsContainerReducer, artistsContainerTypes, initialState } from '../reducer';

describe('ArtistsContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(artistsContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_ARTISTS is dispatched', () => {
    const artistsName = 'Mohammed Ali Chherawalla';
    const expectedResult = { ...state, artistsName };
    expect(
      artistsContainerReducer(state, {
        type: artistsContainerTypes.REQUEST_GET_ARTISTS,
        artistsName
      })
    ).toEqual(expectedResult);
  });

  it('should return data when an action of type SUCCESS_GET_ARTISTS is dispatched', () => {
    const data = { collectionName: 'Stromae' };
    const expectedResult = { ...state, artistsData: data };
    expect(
      artistsContainerReducer(state, {
        type: artistsContainerTypes.SUCCESS_GET_ARTISTS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should return error when an action of type FAILURE_GET_ARTISTS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, artistsError: error };
    expect(
      artistsContainerReducer(state, {
        type: artistsContainerTypes.FAILURE_GET_ARTISTS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state once the CLEAR_ARTISTS is dispatched', () => {
    expect(
      artistsContainerReducer(state, {
        type: artistsContainerTypes.CLEAR_ARTISTS
      })
    ).toEqual(initialState);
  });

  it('should update the currently playing state if the CURRENTLY_PLAYING is dispatched', () => {
    const currentlyPlaying = 12345;
    const expectedResult = { ...state, currentlyPlaying };

    expect(
      artistsContainerReducer(state, {
        type: artistsContainerTypes.CURRENTLY_PLAYING,
        trackId: currentlyPlaying
      })
    ).toEqual(expectedResult);
  });
});
