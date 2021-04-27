import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import API from '../services/api.service';
import NftCard from '../Components/NftCard';
import Disclaimer from '../Components/Disclaimer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '557px',
    itemsAlign: 'center',
    color: theme.palette.text.secondary,
  },
  disclaimer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
}));

const Viewer = (props) => {
  const txid = props.match.params.txid;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState({});
  const [groups, setGroups] = useState([]);

  const setAllGroups = async () => {
    const list = await API.getGroupsList();
    if (!list) return [];
    setGroups(list);
    return list;
  };

  React.useEffect(() => {
    (async () => {
      if (!txid || txid === '') return;
      setLoading(true);
      setToken(null);
      const groupsList = await setAllGroups();
      const data = await API.getTokenInfo(txid, groupsList);
      setLoading(false);
      if (!data || !data.name) return;
      setToken(data);
    })();
  }, [txid, setToken]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography color="textPrimary" gutterBottom variant="h2" align="center">
        NFT Viewer
      </Typography>
      {token && token.name && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <NftCard token={token} groups={groups} size={128} />
                )}
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.disclaimer}>
                <Disclaimer />
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Viewer;
