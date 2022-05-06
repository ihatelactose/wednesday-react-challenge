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
  getDetailsError: null
};

export const trackDetailsContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackDetailsContainerTypes.SUCCESS_GET_DETAILS: {
        draft.getDetails = action.data;
        break;
      }

      case trackDetailsContainerTypes.FAILURE_GET_DETAILS: {
        draft.getDetailsError = action.error;
        break;
      }
    }
  });
