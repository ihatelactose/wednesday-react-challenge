import configureStore from '@app/configureStore';
import history from '@app/utils/history';
import { waitFor } from '@testing-library/react';
import { renderProvider, renderWithIntl } from '@utils/testUtils';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../index';

const initialState = {};

const { store } = configureStore(initialState, history);

describe('<App /> container tests', () => {
  it('should render and match the snapshot', () => {
    const { container } = renderWithIntl(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should redirect to redirect_uri query params if given in url', async () => {
    history.location.search = '?redirect_uri=/repos';
    renderProvider(<App />, history);
    await waitFor(() => expect(history.location.pathname).toBe('/repos'));
  });
});
