import { initialState } from '../reducer';
import { selectArtistsContainerDomain, selectArtistsData, selectArtistsError, selectArtistsName } from '../selectors';

describe('ArtistsContainer selector tests', () => {
  let mockedState;
  let artistsData;
  let artistsName;
  let artistsError;

  beforeEach(() => {
    artistsName = 'Stromae';
    artistsError = 'Sorry,  something went wrong!';
    artistsData = {
      resultCount: 1,
      results: [{ collectionName: 'Multitude' }]
    };

    mockedState = {
      artistsContainer: {
        artistsData,
        artistsError,
        artistsName
      }
    };
  });

  it('should select the artistsData', () => {
    const selector = selectArtistsData();
    expect(selector(mockedState)).toEqual(artistsData);
  });

  it('should select the artistsName', () => {
    const selector = selectArtistsName();
    expect(selector(mockedState)).toEqual(artistsName);
  });

  it('should select the artistsError', () => {
    const selector = selectArtistsError();
    expect(selector(mockedState)).toEqual(artistsError);
  });

  it('should select the globalState', () => {
    const selector = selectArtistsContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
