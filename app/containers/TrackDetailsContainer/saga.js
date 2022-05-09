import { getDetails } from '@app/services/artistsApi';
import { put, call, takeLatest } from 'redux-saga/effects';
import { trackDetailsContainerCreators, trackDetailsContainerTypes } from './reducer';

const { GET_DETAILS } = trackDetailsContainerTypes;
const { successGetDetails, failureGetDetails } = trackDetailsContainerCreators;

export function* getDetailsById(action) {
  const response = yield call(getDetails, action.trackId);
  const { data, ok } = response;

  if (ok) {
    yield put(successGetDetails(data));
  } else {
    yield put(failureGetDetails(data));
  }
}

export default function* trackDetailsContainerSaga() {
  yield takeLatest(GET_DETAILS, getDetailsById);
}
