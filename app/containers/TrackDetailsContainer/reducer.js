/**
 *
 * TrackDetailsContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const { Types: trackDetailsContainerTypes, Creators: trackDetailsContainerCreators } = createActions({
  getDetails: ['trackId'],
  successGetDetails: ['data'],
  failureGetDetails: ['error']
});

export const initialState = {
  getDetails: {},
  getDetailsError: null,
  loading: true
};

export const trackDetailsContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackDetailsContainerTypes.GET_DETAILS: {
        draft.loading = true;
        break;
      }

      case trackDetailsContainerTypes.SUCCESS_GET_DETAILS: {
        draft.getDetails = action.data;
        draft.loading = false;
        break;
      }

      case trackDetailsContainerTypes.FAILURE_GET_DETAILS: {
        draft.getDetailsError = action.error;
        draft.loading = false;
        break;
      }
    }
  });
