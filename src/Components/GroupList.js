import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import NftGroupInfo from './NftGroupInfo';
import Pagination from './Pagination';
import API from '../services/api.service';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-begin;

  button {
    margin-bottom: 10px;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    margin-top: 10px;
    margin-left: 2px;
    margin-bottom: 10px;
  }
`;

const GroupList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
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
    setGroups(list);
    return list;
  };

  const setNewOffset = async (newOffset) => {
    setOffset(newOffset);
    setLoading(true);
    const txids = Array.from(groups.keys());
    const slice = txids.slice(newOffset, newOffset + perPage);
    const info = await API.getGroupsInfo(slice, groups);
    if (info) setGroupsInfo(info);
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <ActionsWrapper>
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
          </ActionsWrapper>
          {groupsInfo.map((row, index) => (
            <NftGroupInfo group={row} index={index} withTxid={true} />
          ))}
          <PaginationWrapper>
            Pages:{' '}
            <Pagination
              data={Array.from(groups.keys())}
              setOffset={setNewOffset}
              offset={offset}
              perPage={perPage}
            />
          </PaginationWrapper>
        </>
      )}
    </div>
  );
};

export default GroupList;
