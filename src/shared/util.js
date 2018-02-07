function isValidRoomType(type) {
  if (type === 'sfu' || type === 'mesh') {
    return true;
  }
  return false;
}

function isValidRoomName(name) {
  return /^[0-9a-z_-]{4,32}$/.test(name);
}

function randomId() {
  return `${Math.random()}`.slice(2);
}

export default {
  isValidRoomType,
  isValidRoomName,
  randomId,
};
