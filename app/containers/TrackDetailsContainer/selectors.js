import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { get } from 'lodash';

/**
 *
 * Selects the ArtistsContainer main state container
 *
 */

export const selectTrackDetailsContainerDomain = (state) => state.trackDetailsContainer || initialState;

/**
 * Selects the details for the current track
 * @returns {object} returns the selected details
 */
export const selectGetDetails = () =>
  createSelector(selectTrackDetailsContainerDomain, (substate) => get(substate, 'getDetails'));

/**
 * Selects the getDetails error if occured
 * @returns {string} returns the selected getDetails error
 */
export const selectGetDetailsError = () =>
  createSelector(selectTrackDetailsContainerDomain, (substate) => get(substate, 'getDetailsError'));

/**
 * Selects the loading state for the getDetails
 * @returns {boolean} returns if the data is loading
 */
export const selectGetDetailsLoading = () =>
  createSelector(selectTrackDetailsContainerDomain, (substate) => get(substate, 'loading'));
