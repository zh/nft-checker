import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import GroupList from '../Components/GroupList';
import Disclaimer from '../Components/Disclaimer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  groups: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    itemsAlign: 'center',
  },
  disclaimer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
}));

const Groups = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography color="textPrimary" gutterBottom variant="h2" align="center">
        NFT Groups Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.groups}>
            <GroupList />
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

export default Groups;
