import { getArtists, getDetails } from '@app/services/artistsApi';
import { put, call, takeLatest } from 'redux-saga/effects';
import { artistsContainerCreators, artistsContainerTypes } from './reducer';

const { REQUEST_GET_ARTISTS, GET_DETAILS } = artistsContainerTypes;
const { successGetArtists, failureGetArtists, successGetDetails, failureGetDetails } = artistsContainerCreators;

export function* getArtistsByTerm(action) {
  const response = yield call(getArtists, action.artistsName);
  const { data, ok } = response;

  if (ok) {
    yield put(successGetArtists(data));
  } else {
    yield put(failureGetArtists(data));
  }
}

export function* getDetailsById(action) {
  const response = yield call(getDetails, action.trackId);
  const { data, ok } = response;

  if (ok) {
    yield put(successGetDetails(data));
  } else {
    yield put(failureGetDetails(data));
  }
}

export default function* artistsContainerSaga() {
  yield takeLatest(REQUEST_GET_ARTISTS, getArtistsByTerm);
  yield takeLatest(GET_DETAILS, getDetailsById);
}
