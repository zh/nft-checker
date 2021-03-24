import axios from 'axios';
import BCP from '../services/bcp.service';

const slpdbUri = 'https://slpdb.fountainhead.cash/q/';
const bitdbUri = 'https://bitdb.fountainhead.cash/q/';

const btoa = function (str) {
  return Buffer.from(str).toString('base64');
};

const info2obj = (info) => {
  const details = info.tokenDetails;
  const { tokenIdHex: id, versionType: type, name, symbol } = details;
  const quantity = type === 129 ? details.genesisOrMintQuantity : '1';
  const obj = { id, type, name, symbol, quantity };
  if (type === 65) obj.parent = info.nftParentId;
  if (details.documentUri) obj.uri = details.documentUri;
  if (details.documentSha256) obj.hash = details.documentSha256;
  return obj;
};

const queryDB = async (uri, q) => {
  const b64 = btoa(JSON.stringify(q));
  const url = uri + b64;
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    url,
  };
  const result = await axios(options);
  return result.data ? result.data : null;
};

const querySlpDB = async (q) => {
  return queryDB(slpdbUri, q);
};

const queryBitDB = async (q) => {
  return queryDB(bitdbUri, q);
};

const getGroupsList = async () => {
  const url =
    'https://raw.githubusercontent.com/blockparty-sh/slp-explorer/master/public/group_icon_repos.json';
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    url,
  };
  const result = await axios(options);
  let list = [];
  if (result.data) {
    for (const d in result.data) {
      list.push(d);
    }
    const info = await getTokensInfo(list);
    list = []; // reuse list
    for (const t in info) {
      let groupInfo = info2obj(info[t]);
      groupInfo.imagesUri = result.data[groupInfo.id];
      list.push(groupInfo);
    }
  }
  return list;
};

const getTokensInfo = async (txids) => {
  try {
    const query = {
      v: 3,
      q: {
        db: ['t'],
        find: {
          'tokenDetails.tokenIdHex': {
            $in: txids,
          },
        },
        limit: txids.length,
      },
    };
    const result = await querySlpDB(query);
    if (!result || !result.t || result.t.length === 0) return [];
    return result.t;
  } catch (error) {
    console.error('error in getTokensInfo(): ', error);
  }
};

const getTokenInfo = async (txid) => {
  try {
    const query = {
      v: 3,
      q: {
        db: ['t'],
        find: {
          'tokenDetails.tokenIdHex': txid,
        },
        limit: 1,
      },
    };
    const result = await querySlpDB(query);
    if (!result || !result.t || result.t.length === 0) return [];
    const details = info2obj(result.t[0]);
    if (details.type === 65) {
      details.parent = await getTokenInfo(details.parent);
    }
    return details;
  } catch (error) {
    console.error('error in getTokensInfo(): ', error);
  }
};

const getBCP = async (txid) => {
  try {
    const query = {
      v: 3,
      q: {
        find: {
          'tx.h': txid,
          $text: { $search: 'BCP' },
        },
      },
    };
    const result = await queryBitDB(query);
    if (!result || !result.c || result.c.length === 0) return null;
    return BCP.fromTx(result.c[0].out[0]);
  } catch (error) {
    console.error('error in getBCP(): ', error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getTokenInfo, getTokensInfo, getGroupsList, getBCP };
