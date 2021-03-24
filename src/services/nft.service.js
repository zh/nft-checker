const validGroup = (token, groups) => {
  if (!token) return false;
  if (!groups) return true;
  const tokenId = token.type === 65 ? token.parent.id : token.id;
  const groupIds = Object.keys(groups).map((g) => groups[g].id);
  return groupIds.includes(tokenId);
};

const imageURI = (token, groups, size = 128) => {
  const waifuPrefix = `https://icons.waifufaucet.com/${size}/`;
  const ipfsPrefix = 'https://ipfs.io/ipfs/';
  if (token.symbol.toLowerCase() === 'waifu')
    return `${waifuPrefix}${token.id}.png`;
  if (token.uri && token.uri.startsWith('Qm'))
    return `${ipfsPrefix}${token.uri}`;
  if (token.uri && token.uri.startsWith('ipfs://')) {
    return `${ipfsPrefix}${token.uri.substr(7, token.uri.length)}`;
  }
  if (validGroup(token, groups) && token.type === 65) {
    const tokenGroup = groups.filter((g) => g.id === token.parent.id);
    let uri = tokenGroup[0].imagesUri;
    if (uri.substr(-1) !== '/') uri += '/';
    return `${uri}${size}/${token.id}.png`;
  }
  return `https://via.placeholder.com/${size}.png`;
};

// TODO: check also for valid payload (parse)
const hasBCP = (token) => {
  if (token.type === 65 && token.symbol.startsWith('BCP.')) return true;
  return false;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { validGroup, imageURI, hasBCP };
