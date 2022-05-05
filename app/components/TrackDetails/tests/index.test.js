/**
 *
 * Tests for TrackDetails
 *
 */
import React from 'react';
import { renderWithIntl, timeout } from '@app/utils/testUtils';
import TrackDetails from '../index';
import { MemoryRouter } from 'react-router-dom';

describe('<TrackDetails />', () => {
  const MockTrackDetails = () => {
    return (
      <MemoryRouter query={{ trackId: 12345 }}>
        <TrackDetails />
      </MemoryRouter>
    );
  };

  it('should render and match snapshot', () => {
    const baseComponent = renderWithIntl(<MockTrackDetails />);
    expect(baseComponent).toMatchSnapshot();
  });

  it('should contain only only one TrackDetials Component', () => {
    const { getAllByTestId } = renderWithIntl(<MockTrackDetails />);
    expect(getAllByTestId('track-details').length).toBe(1);
  });

  it('should render loading when the page is initally loaded', () => {
    const { getByTestId } = renderWithIntl(<MockTrackDetails />);

    expect(getByTestId('loading-card')).toBeInTheDocument();
  });

  it('should render "track not found" when the trackId is associated with nothing', async () => {
    const { getByTestId } = renderWithIntl(<MockTrackDetails />);

    await timeout(500);
    expect(getByTestId('no-data-card')).toBeInTheDocument();
  });
});
