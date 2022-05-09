/**
 *
 * ArtistsContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const { Types: artistsContainerTypes, Creators: artistsContainerCreators } = createActions({
  requestGetArtists: ['artistsName'],
  successGetArtists: ['data'],
  failureGetArtists: ['error'],
  currentlyPlaying: ['trackId'],
  clearArtists: {}
});

export const initialState = {
  artistsName: null,
  artistsData: {},
  artistsError: null,
  currentlyPlaying: null
};

export const artistsContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case artistsContainerTypes.REQUEST_GET_ARTISTS: {
        draft.artistsName = action.artistsName;
        break;
      }

      case artistsContainerTypes.SUCCESS_GET_ARTISTS: {
        draft.artistsData = action.data;
        break;
      }

      case artistsContainerTypes.FAILURE_GET_ARTISTS: {
        draft.artistsError = action.error;
        break;
      }

      case artistsContainerTypes.CURRENTLY_PLAYING: {
        draft.currentlyPlaying = action.trackId;
        break;
      }

      case artistsContainerTypes.CLEAR_ARTISTS: {
        draft.artistsData = {};
        draft.artistsError = null;
        draft.artistsName = null;
        break;
      }
    }
  });
