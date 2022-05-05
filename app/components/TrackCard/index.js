/**
 *
 * Track Card
 *
 */

import { Card, Image, Button } from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import If from '@components/If/index';
import { T } from '@components/T/index';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export function TrackCard({
  artistName,
  artistViewUrl,
  artworkUrl100,
  collectionName,
  collectionPrice,
  currency,
  releaseDate,
  previewUrl,
  currentlyPlaying,
  trackId,
  dispatchCurrentlyPlaying
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef) {
      if (currentlyPlaying !== trackId) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [currentlyPlaying]);

  function handleOnPlay(evt) {
    evt.preventDefault();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      dispatchCurrentlyPlaying(null);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      dispatchCurrentlyPlaying(trackId);
    }
  }

  return (
    <CustomCard data-testid="artist-card">
      <Flex>
        <If
          condition={!isEmpty(artworkUrl100)}
          otherwise={<T data-testid="artwork-url-unavailable" id="artwork_url_unavailable" />}
        >
          <div style={{ marginRight: '10px' }}>
            <Image src={artworkUrl100} alt={collectionName} width={100} />
          </div>
        </If>
        <If
          condition={!isEmpty(collectionName)}
          otherwise={<T data-testid="collection-name-unavailable" id="collection_name_unavailable" />}
        >
          <T data-testid="collection-name" id="collection_name" values={{ collectionName }} />
        </If>
      </Flex>
      <If
        condition={!isEmpty(previewUrl)}
        otherwise={<T data-testid="preview-audio-unavailable" id="preview_audio_unavailable" />}
      >
        <Button data-testid="preview-audio-button" onClick={handleOnPlay} type="primary">
          {isPlaying ? 'Pause preview' : 'Play Preview'}
        </Button>
        <audio data-testid="preview-audio" ref={audioRef} src={previewUrl} />
      </If>
      <If
        condition={!isEmpty(artistName)}
        otherwise={<T data-testid="artist-name-unavailable" id="artist_name_unavailable" />}
      >
        <T data-testid="artist-name" id="artist_name" values={{ artistName }} />
      </If>
      <If condition={!isEmpty(artistViewUrl)}>
        <a href={artistViewUrl} rel="noreferrer" target="_blank">
          Check out the artist!
        </a>
      </If>
      <If
        condition={!isNaN(collectionPrice)}
        otherwise={<T data-testid="collection-price-unavailable" id="collection_price_unavailable" />}
      >
        <T data-testid="collection-price" id="collection_price" values={{ currency, collectionPrice }} />
      </If>
      <If
        condition={!isEmpty(releaseDate)}
        otherwise={<T data-testid="release-date-unavailable" id="release_date_unavailable" />}
      >
        <T
          data-testid="release-date"
          id="release_date"
          values={{ releaseDate: new Date(releaseDate).toDateString() }}
        />
      </If>
    </CustomCard>
  );
}

TrackCard.propTypes = {
  artistName: PropTypes.string,
  artistViewUrl: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.number,
  country: PropTypes.string,
  currency: PropTypes.string,
  releaseDate: PropTypes.string,
  previewUrl: PropTypes.string,
  currentlyPlaying: PropTypes.number,
  dispatchCurrentlyPlaying: PropTypes.func,
  trackId: PropTypes.number
};

export default TrackCard;
