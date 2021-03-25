import React from 'react';
import { CardMedia, CardContent, Typography } from '@material-ui/core';
import NFT from '../services/nft.service';

const MediaPayload = (props) => {
  const { token, groups, size } = props;

  return (
    <>
      {token.type === 65 && (
        <CardMedia
          image={NFT.imageURI(token, groups, size)}
          title={token.name}
          style={{
            height: `${size}px`,
            width: `${size}px`,
          }}
        />
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
