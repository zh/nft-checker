import React from 'react';
import styled from 'styled-components';
import { CardMedia, CardContent, Typography } from '@material-ui/core';
import NFT from '../services/nft.service';

const MediaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MediaPayload = (props) => {
  const { token, groups, size } = props;

  return (
    <>
      {token.type === 65 && (
        <MediaWrapper>
          <CardMedia
            image={NFT.imageURI(token, groups, size)}
            title={token.name}
            style={{
              height: `300px`,
              width: `300px`,
            }}
          />
        </MediaWrapper>
      )}
      {NFT.onIPFS(token) && (
        <CardContent>
          <Typography variant="subtitle2">
            IPFS:{' '}
            <a
              href={NFT.imageURI(token, groups, size)}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {token.uri}
            </a>
          </Typography>
        </CardContent>
      )}
    </>
  );
};

export default MediaPayload;
