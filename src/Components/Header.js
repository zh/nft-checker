import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

const navLinks = [{ title: `groups`, path: `/#/groups` }];

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <Link href={'/#/'} key="Home" className={classes.linkText}>
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home fontSize="large" />
            </IconButton>
          </Link>

          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex} // this
          >
            {navLinks.map(({ title, path }) => (
              <Link href={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
