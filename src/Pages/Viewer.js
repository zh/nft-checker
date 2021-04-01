import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import API from '../services/api.service';
import NftCard from '../Components/NftCard';
import Disclaimer from '../Components/Disclaimer';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin-left: 15px;
  }
`;

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
  const [reload, setReload] = useState(0);

  React.useEffect(() => {
    (async () => {
      if (!txid || txid === '') return;
      setLoading(true);
      setToken(null);
      let data = await API.getTokenInfo(txid);
      setLoading(false);
      if (!data || !data.name) return;
      setToken(data);
      setLoading(true);
      data = await API.getGroupsList();
      setLoading(false);
      if (!data) return;
      setGroups(data);
    })();
  }, [txid, setToken, reload]);

  return (
    <Container className={classes.root}>
      <Typography color="textPrimary" gutterBottom variant="h2" align="center">
        NFT Viewer
      </Typography>
      {token && token.name && (
        <>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <ButtonWrapper>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setReload(reload + 1);
                  }}
                >
                  <i className="fa fa-refresh"></i>
                  &nbsp;Refresh
                </Button>
              </ButtonWrapper>
            </Paper>
          </Grid>

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
