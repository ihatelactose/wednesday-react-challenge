/**
 *
 * Track Details
 *
 */
import { useRouter } from '@app/hooks/useRouter';
import { getDetails } from '@app/services/artistsApi';
import If from '@components/If/index';
import { T } from '@components/T/index';
import { Button, Card as AntDCard, Image as AntDImage } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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

export function TrackDetails() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(undefined);
  const [length, setLength] = useState(undefined);
  const router = useRouter();
  const audioRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const fetchDetails = async () => {
        try {
          const { trackId } = router.query;
          const data = await getDetails(trackId);
          setDetails(data.data.results[0]);
          setLength(data.data.resultCount);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };

      fetchDetails();
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

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

  const renderErrors = () => {
    return (
      !loading &&
      error && (
        <Card color="red">
          <If condition={error} otherwise={<T data-testid="default-artist-message" id={'something_went_wrong'} />}>
            <T data-testid="error-message" text={error} />
          </If>
        </Card>
      )
    );
  };

  if (loading) {
    return (
      <Container data-testid="track-details" maxwidth={600} padding={20}>
        <Card data-testid="loading-card">Loading...</Card>
      </Container>
    );
  }

  if (!length) {
    return (
      <Container data-testid="track-details" maxwidth={600} padding={20}>
        <Card data-testid="no-data-card">No such track found.</Card>
      </Container>
    );
  }

  return (
    <Container data-testid="track-details" maxwidth={600} padding={20}>
      <If condition={details}>
        <Card data-testid="track-details-card">
          <Flex>
            <If
              condition={!isEmpty(details.artworkUrl100)}
              otherwise={<T data-testid="artwork-unavailable" id="artwork_unavailable" />}
            >
              <Image style={{ paddingRight: '20px' }} height={200} src={details.artworkUrl100} />
            </If>
            <FColumn>
              <If
                condition={!isEmpty(details.collectionName)}
                otherwise={<T data-testid="collection-name-unavailable" id="collection_name_unavailable" />}
              >
                <T
                  data-testid="collection-name"
                  id="collection_name"
                  values={{ collectionName: details.collectionName }}
                />
              </If>
              <If
                condition={!isEmpty(details.previewUrl)}
                otherwise={<T data-testid="preview-audio-unavailable" id="preview_audio_unavailable" />}
              >
                <Button data-testid="preview-audio-button" onClick={handleOnPlay} type="primary">
                  {isPlaying ? 'Pause preview' : 'Play Preview'}
                </Button>
                <audio data-testid="preview-audio" ref={audioRef} src={details.previewUrl} />
              </If>
            </FColumn>
          </Flex>
          <If
            condition={!isEmpty(details.artistName)}
            otherwise={<T data-testid="artist-name-unavailable" id="artist_name_unavailable" />}
          >
            <T data-testid="artist-name" id="artist_name" values={{ artistName: details.artistName }} />
          </If>
          <If condition={!isEmpty(details.artistViewUrl)}>
            <a href={details.artistViewUrl} rel="noreferrer" target="_blank">
              Check out the artist!
            </a>
          </If>
          <If
            condition={!isNaN(details.collectionPrice)}
            otherwise={<T data-testid="collection-price-unavailable" id="collection_price_unavailable" />}
          >
            <T
              data-testid="collection-price"
              id="collection_price"
              values={{ currency: details.currency, collectionPrice: details.collectionPrice }}
            />
          </If>
          <If
            condition={!isEmpty(details.releaseDate)}
            otherwise={<T data-testid="release-date-unavailable" id="release_date_unavailable" />}
          >
            <T
              data-testid="release-date"
              id="release_date"
              values={{ releaseDate: new Date(details.releaseDate).toDateString() }}
            />
          </If>
        </Card>
      </If>
      {renderErrors()}
    </Container>
  );
}

export default TrackDetails;
