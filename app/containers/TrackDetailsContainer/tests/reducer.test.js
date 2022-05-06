import { trackDetailsContainerReducer, trackDetailsContainerTypes, initialState } from '../reducer';

describe('TrackDetailsContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(trackDetailsContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return loading true when an action of type GET_DETAILS is dispatched', () => {
    const expectedResult = { ...state, loading: true };

    expect(
      trackDetailsContainerReducer(state, {
        type: trackDetailsContainerTypes.GET_DETAILS
      })
    ).toEqual(expectedResult);
  });

  it('should return data when an action of type SUCCESS_GET_DETAILS is dispatched', () => {
    const data = { collectionName: 'Stromae' };
    const expectedResult = { ...state, getDetails: data, loading: false };

    expect(
      trackDetailsContainerReducer(state, {
        type: trackDetailsContainerTypes.SUCCESS_GET_DETAILS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should return error when an action of type FAILURE_GET_DETAILS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, getDetailsError: error, loading: false };

    expect(
      trackDetailsContainerReducer(state, {
        type: trackDetailsContainerTypes.FAILURE_GET_DETAILS,
        error
      })
    ).toEqual(expectedResult);
  });
});
