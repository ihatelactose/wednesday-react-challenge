import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { get } from 'lodash';

/**
 *
 * Selects the ArtistsContainer main state container
 *
 */

export const selectArtistsContainerDomain = (state) => state.artistsContainer || initialState;

/**
 * Selects the artists data
 * @returns {object} returns the selected artists data
 */
export const selectArtistsData = () =>
  createSelector(selectArtistsContainerDomain, (substate) => get(substate, 'artistsData'));

/**
 * Selects the artists name
 * @returns {string} returns the selected artists name
 */
export const selectArtistsName = () =>
  createSelector(selectArtistsContainerDomain, (substate) => get(substate, 'artistsName'));

/**
 * Selects the artists error if occured
 * @returns {string} returns the selected artists error
 */
export const selectArtistsError = () =>
  createSelector(selectArtistsContainerDomain, (substate) => get(substate, 'artistsError'));
