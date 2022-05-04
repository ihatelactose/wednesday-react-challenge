/**
 *
 * Tests for ArtistCard
 *
 */

import React from 'react';
import ArtistCard from '../index';
import { renderWithIntl } from '@app/utils/testUtils';
import { translate } from '@app/components/IntlGlobalProvider/index';

describe('<ArtistCard />', () => {
  it('should render and match with the snapshot', () => {
    const baseComponent = renderWithIntl(<ArtistCard />);
    expect(baseComponent).toMatchSnapshot();
  });

  it('contains a ArtistCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ArtistCard />);
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
      <ArtistCard
        artistName={artistName}
        artistViewUrl={artistViewUrl}
        artworkUrl100={artworkUrl100}
        collectionName={collectionName}
        collectionPrice={collectionPrice}
        currency={currency}
        releaseDate={releaseDate}
      />
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

    const { getByTestId } = renderWithIntl(<ArtistCard />);

    expect(getByTestId('artwork-url-unavailable')).toHaveTextContent(artworkUrl100);
    expect(getByTestId('artist-name-unavailable')).toHaveTextContent(artistName);
    expect(getByTestId('collection-name-unavailable')).toHaveTextContent(collectionName);
    expect(getByTestId('collection-price-unavailable')).toHaveTextContent(collectionPrice);
    expect(getByTestId('release-date-unavailable')).toHaveTextContent(releaseDate);
  });
});
