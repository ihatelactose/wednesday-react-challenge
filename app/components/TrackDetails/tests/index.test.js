/**
 *
 * Tests for TrackDetails
 *
 */
import React from 'react';
import { renderWithIntl, timeout } from '@app/utils/testUtils';
import TrackDetails from '../index';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('<TrackDetails />', () => {
  const history = createMemoryHistory();

  it('should render and match snapshot', () => {
    const baseComponent = renderWithIntl(
      <BrowserRouter location={history.location} navigator={history}>
        <TrackDetails />
      </BrowserRouter>
    );
    expect(baseComponent).toMatchSnapshot();
  });

  it('should contain only only one TrackDetials Component', () => {
    const { getAllByTestId } = renderWithIntl(
      <BrowserRouter location={history.location} navigator={history} query={{ trackId: 12345 }}>
        <TrackDetails />
      </BrowserRouter>
    );
    expect(getAllByTestId('track-details').length).toBe(1);
  });

  it('should render loading when the page is initally loaded', () => {
    const { getByTestId } = renderWithIntl(
      <BrowserRouter location={history.location} navigator={history} query={{ trackId: 12345 }}>
        <TrackDetails />
      </BrowserRouter>
    );

    expect(getByTestId('loading-card')).toBeInTheDocument();
  });

  it('should render "track not found" when the trackId is associated with nothing', async () => {
    const { getByTestId } = renderWithIntl(
      <BrowserRouter location={history.location} navigator={history} query={{ trackId: 12345 }}>
        <TrackDetails />
      </BrowserRouter>
    );

    await timeout(500);
    expect(getByTestId('no-data-card')).toBeInTheDocument();
  });
});
