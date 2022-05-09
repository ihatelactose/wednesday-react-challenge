/**
 *
 * Track Details
 *
 */
import { trackDetailsContainerCreators } from '@app/containers/TrackDetailsContainer/reducer';
import { createStructuredSelector } from 'reselect';
import trackDetailsContainerSaga from '@app/containers/TrackDetailsContainer/saga';
import { useRouter } from '@app/utils/useRouter';
import PropTypes from 'prop-types';
import If from '@components/If/index';
import { T } from '@components/T/index';
import { Button, Card as AntDCard, Image as AntDImage } from 'antd';
import { isEmpty } from 'lodash';
import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import styled from 'styled-components';
import {
  selectGetDetails,
  selectGetDetailsError,
  selectGetDetailsLoading
} from '@app/containers/TrackDetailsContainer/selectors';

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

const Image = styled(AntDImage)`
  margin-bottom: ${(props) => props.mb}px;
  margin-top: ${(props) => props.mt}px;
  margin-left: ${(props) => props.ml}px;
  margin-right: ${(props) => props.mr}px;
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const FColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export function TrackDetails({ dispatchGetDetails, details, error, loading }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const audioRef = useRef(null);

  const { resultCount, results } = details;

  useEffect(() => {
    if (router.query.trackId) {
      dispatchGetDetails(router.query.trackId);
    }
  }, [router]);

  function handleOnPlay(evt) {
    evt.preventDefault();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  if (loading) {
    return (
      <Container data-testid="track-details" maxwidth={600} padding={20}>
        <Card data-testid="loading-card">
          <T id="loading" />
        </Card>
      </Container>
    );
  }

  if (!resultCount) {
    return (
      <Container data-testid="track-details" maxwidth={600} padding={20}>
        <Card data-testid="no-data-card">
          <T id="track_not_found" />
        </Card>
      </Container>
    );
  }

  const track = results[0];

  return (
    <Container data-testid="track-details" maxwidth={600} padding={20}>
      <If condition={error}>
        <Card data-testid="error">{error}</Card>
      </If>
      <If condition={details}>
        <Card data-testid="track-details-card">
          <Flex>
            <If
              condition={!isEmpty(track.artworkUrl100)}
              otherwise={<T data-testid="artwork-unavailable" id="artwork_unavailable" />}
            >
              <Image style={{ paddingRight: '20px' }} height={200} src={track.artworkUrl100} />
            </If>
            <FColumn>
              <If
                condition={!isEmpty(track.collectionName)}
                otherwise={<T data-testid="collection-name-unavailable" id="collection_name_unavailable" />}
              >
                <T
                  data-testid="collection-name"
                  id="collection_name"
                  values={{ collectionName: track.collectionName }}
                />
              </If>
              <If
                condition={!isEmpty(track.previewUrl)}
                otherwise={<T data-testid="preview-audio-unavailable" id="preview_audio_unavailable" />}
              >
                <Button data-testid="preview-audio-button" onClick={handleOnPlay} type="primary">
                  {isPlaying ? 'Pause preview' : 'Play Preview'}
                </Button>
                <audio data-testid="preview-audio" ref={audioRef} src={track.previewUrl} />
              </If>
            </FColumn>
          </Flex>
          <If
            condition={!isEmpty(track.artistName)}
            otherwise={<T data-testid="artist-name-unavailable" id="artist_name_unavailable" />}
          >
            <T data-testid="artist-name" id="artist_name" values={{ artistName: track.artistName }} />
          </If>
          <If condition={!isEmpty(track.artistViewUrl)}>
            <a href={details.artistViewUrl} rel="noreferrer" target="_blank">
              <T id="to_artist" />
            </a>
          </If>
          <If
            condition={!isNaN(track.collectionPrice)}
            otherwise={<T data-testid="collection-price-unavailable" id="collection_price_unavailable" />}
          >
            <T
              data-testid="collection-price"
              id="collection_price"
              values={{ currency: track.currency, collectionPrice: track.collectionPrice }}
            />
          </If>
          <If
            condition={!isEmpty(track.releaseDate)}
            otherwise={<T data-testid="release-date-unavailable" id="release_date_unavailable" />}
          >
            <T
              data-testid="release-date"
              id="release_date"
              values={{ releaseDate: new Date(track.releaseDate).toDateString() }}
            />
          </If>
        </Card>
      </If>
    </Container>
  );
}

TrackDetails.propTypes = {
  details: PropTypes.object,
  error: PropTypes.string,
  dispatchGetDetails: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  details: selectGetDetails(),
  error: selectGetDetailsError(),
  loading: selectGetDetailsLoading()
});

export function mapDispatchToProps(dispatch) {
  const { getDetails } = trackDetailsContainerCreators;

  return {
    dispatchGetDetails: (trackId) => dispatch(getDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  memo,
  withConnect,
  injectSaga({
    key: 'trackDetailsSaga',
    saga: trackDetailsContainerSaga
  })
)(TrackDetails);
