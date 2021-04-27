import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
  Button,
  CircularProgress,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from './Pagination';
import API from '../services/api.service';

const explorerUri = 'https://simpleledger.info/#token/';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  currentHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: green[500],
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  currentSecondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: green[500],
  },
}));

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-begin;

  button {
    margin-right: 10px;
  }

  button {
    margin-right: 10px;
  }
`;

const GroupList = (props) => {
  const { token } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [groupsList, setGroupsList] = useState([]);
  const [groupsInfo, setGroupsInfo] = useState([]);
  const [reload, setReload] = useState(0);
  // pagination
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(20);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await setAllGroups();
      const txids = Array.from(list.keys());
      const slice = txids.slice(offset, offset + perPage);
      const info = await API.getGroupsInfo(slice, list);
      if (info) setGroupsInfo(info);
      setLoading(false);
    })();
  }, [reload, offset, perPage]);

  const setAllGroups = async () => {
    const list = await API.getGroupsList();
    if (!list) return [];
    setGroupsList(list);
    return list;
  };

  const setNewOffset = async (newOffset) => {
    setOffset(newOffset);
    setLoading(true);
    const txids = Array.from(groupsList.keys());
    const slice = txids.slice(newOffset, newOffset + perPage);
    const info = await API.getGroupsInfo(slice, groupsList);
    if (info) setGroupsInfo(info);
    setLoading(false);
  };

  const currentGroup = (id) => {
    if (!token) return false;
    const tokenId = token.type === 65 ? token.parent.id : token.id;
    return id === tokenId;
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <ButtonsWrapper>
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
            Pages:{' '}
            <Pagination
              data={Array.from(groupsList.keys())}
              setOffset={setNewOffset}
              offset={offset}
              perPage={perPage}
            />
          </ButtonsWrapper>
          {groupsInfo.map((row, index) => (
            <Accordion key={row.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography
                  className={
                    currentGroup(row.id)
                      ? classes.currentHeading
                      : classes.heading
                  }
                >
                  {row.symbol}
                </Typography>
                <Typography
                  className={
                    currentGroup(row.id)
                      ? classes.currentSecondaryHeading
                      : classes.secondaryHeading
                  }
                >
                  {row.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.heading}>TXID</Typography>
                <Typography className={classes.secondaryHeading}>
                  <a
                    href={`${explorerUri}${row.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    {row.id}
                  </a>
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.heading}>Doc URI</Typography>
                <Typography className={classes.secondaryHeading}>
                  {row.uri}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.heading}>Images URI</Typography>
                <Typography className={classes.secondaryHeading}>
                  {row.imagesUri}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.heading}>Quantity</Typography>
                <Typography className={classes.secondaryHeading}>
                  {row.quantity}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </div>
  );
};

export default GroupList;
