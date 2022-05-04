import ArtistCard from '@app/components/ArtistCard/index';
import For from '@app/components/For/index';
import If from '@app/components/If/index';
import { T } from '@app/components/T/index';
import { Card as AntDCard, Input, Skeleton } from 'antd';
import { debounce, get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { artistsContainerCreators } from './reducer';
import artistsContainerSaga from './saga';
import { selectArtistsData, selectArtistsError, selectArtistsName } from './selectors';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;

const Card = styled(AntDCard)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

export function ArtistsContainer({
  maxwidth,
  padding,
  artistsData,
  artistsError,
  artistsName,
  intl,
  dispatchGetArtists,
  dispatchClearArtists
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoaded = get(artistsData, 'results', null) || artistsError;
    if (isLoaded) {
      setLoading(false);
    }
  }, [artistsData]);

  useEffect(() => {
    if (artistsName && !artistsData?.results?.length) {
      dispatchGetArtists(artistsName);
      setLoading(true);
    }
  }, []);

  function onSearchValueChange(value) {
    if (!isEmpty(value)) {
      dispatchGetArtists(value);
      setLoading(true);
    } else {
      dispatchClearArtists();
    }
  }

  const debouncedOnSearchValueChange = debounce(onSearchValueChange, 400);

  const renderArtistsList = () => {
    const data = get(artistsData, 'results', []);
    const count = get(artistsData, 'resultCount', 0);

    return (
      <If condition={!isEmpty(data) || loading}>
        <Card>
          <Skeleton loading={loading} active>
            <If condition={!isEmpty(artistsName)}>
              <div>
                <T id="search_query" values={{ repoName: artistsName }} />
              </div>
            </If>
            <If condition={count !== 0}>
              <div>
                <T id="matching_tracks" values={{ count }} />
              </div>
            </If>
            <For
              of={data}
              ParentComponent={Container}
              renderItem={(item) => <ArtistCard key={item.trackId} {...item} />}
            />
          </Skeleton>
        </Card>
      </If>
    );
  };

  const renderErrors = () => {
    let searchError;
    if (artistsError) {
      searchError = artistsError;
    } else if (isEmpty(artistsName)) {
      searchError = 'artist_search_default';
    }

    return (
      !loading &&
      searchError && (
        <Card color={artistsError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'artist_list' })}>
          <If condition={artistsError} otherwise={<T data-testid="default-artist-message" id={searchError} />}>
            <T data-testid="error-message" text={searchError} />
          </If>
        </Card>
      )
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <Card title={intl.formatMessage({ id: 'artist_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_artist_details" />
        <Input.Search
          data-testid="artist-search-bar"
          defaultValue={artistsName}
          type="text"
          placeholder="Enter artists name or search term here..."
          onChange={(evt) => debouncedOnSearchValueChange(evt.target.value)}
          onSearch={(userInput) => debouncedOnSearchValueChange(userInput)}
        />
      </Card>
      {renderArtistsList()}
      {renderErrors()}
    </Container>
  );
}

ArtistsContainer.propTypes = {
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  artistsData: PropTypes.shape({
    resultsCount: PropTypes.number,
    results: PropTypes.array
  }),
  artistsName: PropTypes.string,
  artistsError: PropTypes.string,
  intl: PropTypes.object,
  dispatchGetArtists: PropTypes.func,
  dispatchClearArtists: PropTypes.func
};

ArtistsContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  artistsData: {},
  artistsError: null
};

const mapStateToProps = createStructuredSelector({
  artistsData: selectArtistsData(),
  artistsName: selectArtistsName(),
  artistsError: selectArtistsError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetArtists, clearArtists } = artistsContainerCreators;

  return {
    dispatchGetArtists: (artistsName) => dispatch(requestGetArtists(artistsName)),
    dispatchClearArtists: () => dispatch(clearArtists())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({
    key: 'artistsContainer',
    saga: artistsContainerSaga
  })
)(ArtistsContainer);

export const ArtistsContainerTest = compose(injectIntl)(ArtistsContainer);
