import React from 'react';
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import NFT from '../services/nft.service';
import MediaPayload from './MediaPayload';
import BcpPayload from './BcpPayload';
import NftGroupInfo from './NftGroupInfo';

const explorerUri = 'https://simpleledger.info/#token/';

const NftCard = (props) => {
  const { token, groups, size } = props;

  if (!token || !token.id) return <div>No such token</div>;

  const groupColor = NFT.validGroup(token, groups) ? green[500] : red[600];

  return (
    <Card>
      <CardActionArea>
        <CardHeader title={token.name} style={{ color: groupColor }} />
        {token.type === 65 && (
          <CardContent>
            <NftGroupInfo group={token.parent} index={1} withTxid={false} />
          </CardContent>
        )}
        {NFT.hasBCP(token) ? (
          <BcpPayload token={token} size={size} />
        ) : (
          <MediaPayload token={token} groups={groups} size={size} />
        )}
        <CardContent>
          {token.uri && (
            <Typography style={{ color: groupColor }} variant="subtitle2">
              Document URI: {token.uri}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a
          href={`${explorerUri}${token.id}`}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          Token Info
        </a>
        {token.type === 65 && (
          <a
            href={`${explorerUri}${token.parent.id}`}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Group Info
          </a>
        )}
      </CardActions>
    </Card>
  );
};

export default NftCard;
