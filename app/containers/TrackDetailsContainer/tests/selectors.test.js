import { initialState } from '../reducer';
import { selectTrackDetailsContainerDomain, selectGetDetails, selectGetDetailsError } from '../selectors';

describe('TrackDetailsContainer selector tests', () => {
  let mockedState;
  let getDetails;
  let getDetailsError;

  beforeEach(() => {
    getDetailsError = 'Sorry,  something went wrong!';
    getDetails = {
      resultCount: 1,
      results: [{ collectionName: 'Multitude' }]
    };

    mockedState = {
      trackDetailsContainer: {
        getDetails,
        getDetailsError
      }
    };
  });

  it('should select the getDetails', () => {
    const selector = selectGetDetails();
    expect(selector(mockedState)).toEqual(getDetails);
  });

  it('should select the getDetailsError', () => {
    const selector = selectGetDetailsError();
    expect(selector(mockedState)).toEqual(getDetailsError);
  });

  it('should select the globalState', () => {
    const selector = selectTrackDetailsContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
