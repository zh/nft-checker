import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
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

const Home = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState(null);
  const [token, setToken] = useState({});
  const [groups, setGroups] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'txid') setTx(value);
  };

  const setAllGroups = async () => {
    const list = await API.getGroupsList();
    if (!list) return [];
    setGroups(list);
    return list;
  };

  const handleSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        if (!tx || tx === '') return;
        setLoading(true);
        setToken(null);
        const groupsList = await setAllGroups();
        const data = await API.getTokenInfo(tx, groupsList);
        setLoading(false);
        if (!data || !data.name) return;
        setToken(data);
      } catch (error) {
        console.error(error);
      }
    },
    [tx]
  );

  return (
    <Container maxWidth="md">
      <Typography color="textPrimary" gutterBottom variant="h2" align="center">
        NFT Info
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              id="txid"
              label="Tx ID"
              name="txid"
              size="small"
              variant="outlined"
              error={tx === ''}
              helperText={tx === '' ? 'Please enter valid txid' : ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
            >
              Fetch Info...
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {loading ? (
              <CircularProgress />
            ) : token && token.name ? (
              <NftCard token={token} groups={groups} size="original" />
            ) : (
              <div>Please enter txid</div>
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
    </Container>
  );
};

export default Home;
