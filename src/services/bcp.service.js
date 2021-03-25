import {
  BCP,
  BCP_SRC_URL,
  BCP_SRC_IPFS,
  BCP_SRC_TXID,
  BCP_SRC_ADDR,
  BCP_TYPE_AUDIO,
  BCP_TYPE_VIDEO,
  BCP_TYPE_TEXT,
} from 'bcp-js';

const ipfsPrefix = 'https://ipfs.io/ipfs/';

const fromTx = (tx) => {
  try {
    if (!tx) return null;
    const bcp = new BCP();
    const obj = bcp.create(
      parseInt(tx.h2, 10),
      parseInt(tx.h3, 10),
      Buffer.from(tx.h4, 'hex')
    );
    if (!obj) return null;
    return bcp.parse(obj);
  } catch (error) {
    console.error('error in getBCP(): ', error);
    return null;
  }
};

const dataStr = (bcp) => {
  if (!bcp || !bcp.data) return '';
  if (bcp.source === BCP_SRC_TXID) return bcp.data.tokenId.toString();
  if (bcp.source === BCP_SRC_URL) return bcp.data.url.toString();
  if (bcp.source === BCP_SRC_IPFS)
    return `${ipfsPrefix}${bcp.data.hash.toString()}`;
  // convert legacy, slp etc.?
  if (bcp.source === BCP_SRC_ADDR) return bcp.data.address.toString();
  return bcp.data.toString();
};

const typeStr = (bcp) => {
  if (!bcp || !bcp.type) return '';
  if (bcp.type === BCP_TYPE_TEXT) return 'text';
  if (bcp.type === BCP_TYPE_AUDIO) return 'audio';
  if (bcp.type === BCP_TYPE_VIDEO) return 'video';
  return 'image';
};

const onIPFS = (bcp) => bcp.source === BCP_SRC_IPFS;

// eslint-disable-next-line import/no-anonymous-default-export
export default { fromTx, dataStr, typeStr, onIPFS };
