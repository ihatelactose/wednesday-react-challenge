import { getArtists } from '@app/services/artistsApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { artistsContainerCreators, artistsContainerTypes } from './reducer';

const { REQUEST_GET_ARTISTS } = artistsContainerTypes;
const { successGetArtists, failureGetArtists } = artistsContainerCreators;

export function* getArtistsByTerm(action) {
  const response = yield call(getArtists, action.artistsName, 20);
  const { data, ok } = response;

  if (ok) {
    yield put(successGetArtists(data));
  } else {
    yield put(failureGetArtists(data));
  }
}

export default function* artistsContainerSaga() {
  yield takeLatest(REQUEST_GET_ARTISTS, getArtistsByTerm);
}
