/**
 *
 * Tests for ArtistsContainer
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ArtistsContainerTest as ArtistsContainer, mapDispatchToProps } from '../index';
import { artistsContainerTypes } from '../reducer';
import { translate } from '@app/components/IntlGlobalProvider/index';

describe('<ArtistsContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ArtistsContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearArtists when the search bar is empty', async () => {
    const getArtistsSpy = jest.fn();
    const clearArtistsSpy = jest.fn();

    const { getByTestId } = renderProvider(
      <ArtistsContainer dispatchGetArtists={getArtistsSpy} dispatchClearArtists={clearArtistsSpy} />
    );

    fireEvent.change(getByTestId('artist-search-bar'), {
      target: { value: 'stromae' }
    });

    await timeout(500);
    expect(getArtistsSpy).toBeCalled();

    fireEvent.change(getByTestId('artist-search-bar'), {
      target: { value: '' }
    });

    await timeout(500);
    expect(clearArtistsSpy).toBeCalled();
  });

  it('should call dispatchGetArtists on key presses and when the enter key is pressed', async () => {
    const artist = 'Stromae';
    const { getByTestId } = renderProvider(<ArtistsContainer dispatchGetArtists={submitSpy} />);
    const searchBar = getByTestId('artist-search-bar');

    fireEvent.change(searchBar, {
      target: { value: artist }
    });

    await timeout(500);
    expect(submitSpy).toBeCalledWith(artist);

    fireEvent.keyDown(searchBar, {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
    expect(submitSpy).toBeCalledWith(artist);
  });

  it('should call dispatchGetArtists on component mount if the artistsName is already persisted', async () => {
    const artist = 'Stromae';
    renderProvider(<ArtistsContainer artistsData={null} artistsName={artist} dispatchGetArtists={submitSpy} />);

    await timeout(1000);
    expect(submitSpy).toBeCalledWith(artist);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchSearchArtistsSpy = jest.fn();
    const artist = 'Stromae';
    const actions = {
      dispatchGetArtists: { artistsName: artist, type: artistsContainerTypes.REQUEST_GET_ARTISTS },
      dispatchClearArtists: { type: artistsContainerTypes.CLEAR_ARTISTS }
    };

    const props = mapDispatchToProps(dispatchSearchArtistsSpy);
    props.dispatchGetArtists(artist);
    expect(dispatchSearchArtistsSpy).toHaveBeenCalledWith(actions.dispatchGetArtists);

    await timeout(500);
    props.dispatchClearArtists();
    expect(dispatchSearchArtistsSpy).toHaveBeenCalledWith(actions.dispatchClearArtists);
  });

  it('should render default error message when something goes wrong with the search', async () => {
    const defaultError = translate('something_went_wrong');
    const { getByTestId } = renderProvider(<ArtistsContainer artistsError={defaultError} />);
    const errorContainer = getByTestId('error-message');

    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer.textContent).toBe(defaultError);
  });

  it('should render the default messsage when error is null and search box is empty', () => {
    const defaultMessage = translate('artist_search_default');
    const { getByTestId } = renderProvider(<ArtistsContainer />);
    const defaultMessageContainer = getByTestId('default-artist-message');

    expect(defaultMessageContainer).toBeInTheDocument();
    expect(defaultMessageContainer.textContent).toBe(defaultMessage);
  });

  it('should render the data once it has been recieved and the components done loading', async () => {
    const artistsData = { results: [{ collectionName: 'Multitude' }] };
    const { getByTestId } = renderProvider(
      <ArtistsContainer artistsData={artistsData} dispatchGetArtists={submitSpy} />
    );

    expect(getByTestId('for')).toBeInTheDocument();
  });

  it('renders correct number of artistCards', async () => {
    const count = 5;
    const artistsData = {
      resultCount: count,
      results: [
        {
          collectionName: 'Multitude'
        },
        {
          collectionName: 'Cheese'
        },
        {
          collectionName: 'Racine Caree'
        },
        {
          collectionName: 'Alors on Danse'
        },
        {
          collectionName: 'Ce Parti'
        }
      ]
    };

    const { getAllByTestId } = renderProvider(
      <ArtistsContainer artistsData={artistsData} dispatchGetArtists={submitSpy} />
    );
    expect(getAllByTestId('artist-card').length).toBe(count);
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const artist = 'Stromae';
    const { getByTestId, baseElement } = renderProvider(
      <ArtistsContainer dispatchGetArtists={submitSpy} artistsName={artist} />
    );
    fireEvent.change(getByTestId('artist-search-bar'), { target: { value: artist } });
    await timeout(500);
    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });
});
