/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
import TrackCard from '../index';
import { renderWithIntl, timeout } from '@app/utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { translate } from '@app/components/IntlGlobalProvider/index';
import { BrowserRouter } from 'react-router-dom';

describe('<TrackCard />', () => {
  jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});

  it('should render and match with the snapshot', () => {
    const baseComponent = renderWithIntl(
      <BrowserRouter>
        <TrackCard />
      </BrowserRouter>
    );
    expect(baseComponent).toMatchSnapshot();
  });

  it('contains a TrackCard component', () => {
    const { getAllByTestId } = renderWithIntl(
      <BrowserRouter>
        <TrackCard />
      </BrowserRouter>
    );
    expect(getAllByTestId('artist-card').length).toBe(1);
  });

  it('renders the artists details inside the mounted component', () => {
    const artistName = 'Stromae';
    const artworkUrl100 =
      'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/71/3a/d3/713ad3a8-54b1-0c6e-f978-71fc540daed5/source/100x100bb.jpg';
    const artistViewUrl = 'https://music.apple.com/us/artist/stromae/270954369?uo=4';
    const collectionName = 'Multitude';
    const collectionPrice = 14.99;
    const currency = 'USD';
    const releaseDate = '2022-01-09T12:00:00Z';

    const { getByTestId } = renderWithIntl(
      <BrowserRouter>
        <TrackCard
          artistName={artistName}
          artistViewUrl={artistViewUrl}
          artworkUrl100={artworkUrl100}
          collectionName={collectionName}
          collectionPrice={collectionPrice}
          currency={currency}
          releaseDate={releaseDate}
        />
      </BrowserRouter>
    );

    expect(getByTestId('collection-name')).toHaveTextContent(collectionName);
    expect(getByTestId('artist-name')).toHaveTextContent(artistName);
    expect(getByTestId('collection-price')).toHaveTextContent(collectionPrice);
    expect(getByTestId('release-date')).toHaveTextContent(new Date(releaseDate).toDateString());
  });

  it('renders the error messages if the artist details are not passed', () => {
    const artistName = translate('artist_name_unavailable');
    const artworkUrl100 = translate('artwork_url_unavailable');
    const collectionName = translate('collection_name_unavailable');
    const collectionPrice = translate('collection_price_unavailable');
    const releaseDate = translate('release_date_unavailable');

    const { getByTestId } = renderWithIntl(
      <BrowserRouter>
        <TrackCard />
      </BrowserRouter>
    );

    expect(getByTestId('artwork-url-unavailable')).toHaveTextContent(artworkUrl100);
    expect(getByTestId('artist-name-unavailable')).toHaveTextContent(artistName);
    expect(getByTestId('collection-name-unavailable')).toHaveTextContent(collectionName);
    expect(getByTestId('collection-price-unavailable')).toHaveTextContent(collectionPrice);
    expect(getByTestId('release-date-unavailable')).toHaveTextContent(releaseDate);
  });

  it('plays and pauses the song when the play/pause preview button is clicked', () => {
    const clickSpy = jest.fn();
    const previewUrl =
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/a8/e1/fd/a8e1fd7c-b8af-3c54-6665-26f7093c29b6/mzaf_16989964717297819293.plus.aac.p.m4a';
    const trackId = 12345;
    const { getByTestId } = renderWithIntl(
      <BrowserRouter>
        <TrackCard previewUrl={previewUrl} trackId={trackId} dispatchCurrentlyPlaying={clickSpy} />
      </BrowserRouter>
    );

    const audioPreviewButton = getByTestId('preview-audio-button');

    fireEvent.click(audioPreviewButton);
    expect(clickSpy).toBeCalledWith(trackId);

    fireEvent.click(audioPreviewButton);
    expect(clickSpy).toBeCalledWith(null);
  });

  it('should auto-pause the track if the currentlyPlaying trackId is not equal to the selected trackId', async () => {
    const trackId = 12345;
    const currentlyPlaying = 54321;
    const previewUrl =
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/a8/e1/fd/a8e1fd7c-b8af-3c54-6665-26f7093c29b6/mzaf_16989964717297819293.plus.aac.p.m4a';
    const { getByTestId } = renderWithIntl(
      <BrowserRouter>
        <TrackCard previewUrl={previewUrl} trackId={trackId} currentlyPlaying={currentlyPlaying} />
      </BrowserRouter>
    );

    await timeout(500);
    const audioElement = getByTestId('preview-audio');

    expect(audioElement.src).toEqual(previewUrl);
  });
});
