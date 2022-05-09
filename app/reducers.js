/**
 * Combine all reducers in this file and export the combined reducers.
 */

import homeContainerReducer from 'containers/HomeContainer/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { combineReducers } from 'redux';
import { artistsContainerReducer } from '@containers/ArtistsContainer/reducer';
import { trackDetailsContainerReducer } from '@containers/TrackDetailsContainer/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer,
    language: languageProviderReducer,
    homeContainer: homeContainerReducer,
    artistsContainer: artistsContainerReducer,
    trackDetailsContainer: trackDetailsContainerReducer
  });

  return rootReducer;
}
