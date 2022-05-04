/**
 *
 * Artist Card
 *
 */

import { Card, Image } from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import If from '../If/index';
import { T } from '../T/index';

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

export function ArtistCard({
  artistName,
  artistViewUrl,
  artworkUrl100,
  collectionName,
  collectionPrice,
  currency,
  releaseDate,
  previewUrl
}) {
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
        condition={!isEmpty(artistName)}
        otherwise={<T data-testid="preview-audio-unavailable" id="preview_audio_unavailable" />}
      >
        <audio src={previewUrl} controls />
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

ArtistCard.propTypes = {
  artistName: PropTypes.string,
  artistViewUrl: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.number,
  country: PropTypes.string,
  currency: PropTypes.string,
  releaseDate: PropTypes.string,
  previewUrl: PropTypes.string
};

export default ArtistCard;
