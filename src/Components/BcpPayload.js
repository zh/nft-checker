import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { CardMedia, CardContent, Typography } from '@material-ui/core';
// import { AudioCard } from 'material-ui-player';
import API from '../services/api.service';
import BCP from '../services/bcp.service';
// import AudioPlayer from './AudioPlayer';

const imagePayload = (token, bcp, size) => {
  return (
    <CardMedia
      image={BCP.dataStr(bcp)}
      title={token.name}
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  );
};

const textPayload = (bcp) => {
  return (
    <CardContent>
      <Typography variant="subtitle2">Type: {BCP.typeStr(bcp)}</Typography>
      <Typography variant="subtitle2">Payload: {BCP.dataStr(bcp)}</Typography>
    </CardContent>
  );
};

const mediaPayload = (bcp) => {
  return (
    <CardMedia component={BCP.typeStr(bcp)} src={BCP.dataStr(bcp)} controls />
  );
};

const BcpPayload = (props) => {
  const { token, size } = props;
  const [loading, setLoading] = useState(true);
  const [bcp, setBcp] = useState([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await API.getBCP(token.uri);
      setLoading(false);
      if (!data) return;
      setBcp(data);
      setLoading(false);
    })();
  }, [token, setBcp]);

  return (
    <>
      {loading || !bcp ? (
        <CircularProgress />
      ) : (
        <>
          {BCP.typeStr(bcp) === 'image' && imagePayload(token, bcp, size)}
          {['audio', 'video'].includes(BCP.typeStr(bcp)) && mediaPayload(bcp)}
          {BCP.typeStr(bcp) === 'image' && textPayload(bcp)}
        </>
      )}
    </>
  );
};

export default BcpPayload;
