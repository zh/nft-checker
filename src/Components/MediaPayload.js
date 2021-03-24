import React from 'react';
import { CardMedia } from '@material-ui/core';
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
    </>
  );
};

export default MediaPayload;
