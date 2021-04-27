import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const explorerUri = 'https://simpleledger.info/#token/';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: (props) => ({
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: props.headingColor,
  }),
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const NftGroupInfo = (props) => {
  const { group, withTxid, index, color } = props;
  const groupColors = {
    headingColor: color,
  };
  const classes = useStyles(groupColors);

  return (
    <Accordion key={group.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}a-content`}
        id={`panel${index}a-header`}
      >
        <Typography className={classes.heading}>{group.symbol}</Typography>
        <Typography className={classes.secondaryHeading}>
          {group.name}
        </Typography>
      </AccordionSummary>
      {withTxid && (
        <AccordionDetails>
          <Typography className={classes.heading}>TXID</Typography>
          <Typography className={classes.secondaryHeading}>
            <a
              href={`${explorerUri}${group.id}`}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {group.id}
            </a>
          </Typography>
        </AccordionDetails>
      )}
      <AccordionDetails>
        <Typography className={classes.heading}>Doc URI</Typography>
        <Typography className={classes.secondaryHeading}>
          {group.uri}
        </Typography>
      </AccordionDetails>
      <AccordionDetails>
        <Typography className={classes.heading}>Images URI</Typography>
        <Typography className={classes.secondaryHeading}>
          {group.imagesUri}
        </Typography>
      </AccordionDetails>
      <AccordionDetails>
        <Typography className={classes.heading}>Quantity</Typography>
        <Typography className={classes.secondaryHeading}>
          {group.quantity}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default NftGroupInfo;
