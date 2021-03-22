import React from 'react';
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';

const explorerUri = 'https://simpleledger.info/#token/';

const NftCard = (props) => {
  const { token, groups, size } = props;

  if (!token || !token.id) return <div>No such token</div>;

  const CardImage = (token, size = 128) => {
    const waifuPrefix = `https://icons.waifufaucet.com/${size}/`;
    const ipfsPrefix = 'https://ipfs.io/ipfs/';
    if (token.symbol.toLowerCase() === 'waifu')
      return `${waifuPrefix}${token.id}.png`;
    if (token.uri && token.uri.startsWith('Qm'))
      return `${ipfsPrefix}${token.uri}`;
    if (token.uri && token.uri.startsWith('ipfs://')) {
      return `${ipfsPrefix}${token.uri.substr(7, token.uri.length)}`;
    }
    if (validGroup() && token.type === 65) {
      const tokenGroup = groups.filter((g) => g.id === token.parent.id);
      let uri = tokenGroup[0].imagesUri;
      if (uri.substr(-1) !== '/') uri += '/';
      return `${uri}${size}/${token.id}.png`;
    }
    return `https://via.placeholder.com/${size}.png`;
  };

  const validGroup = () => {
    if (!token) return false;
    const tokenId = token.type === 65 ? token.parent.id : token.id;
    const groupIds = Object.keys(groups).map((g) => groups[g].id);
    return groupIds.includes(tokenId);
  };

  const token2header = (token) => {
    let text = token.symbol;
    if (token.type === 65) {
      text = `${text} (${token.parent.name})`;
    }
    return text;
  };

  const groupColor = validGroup() ? green[500] : red[600];

  return (
    <Card>
      <CardActionArea>
        <CardHeader
          title={token.name}
          subheader={token2header(token)}
          style={{ color: groupColor }}
        />
        {token.type === 65 && (
          <CardMedia
            image={CardImage(token)}
            title={token.name}
            style={{
              height: `${size}px`,
              width: `${size}px`,
            }}
          />
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
