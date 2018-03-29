export function isValidRoomType(type) {
  if (type === 'sfu' || type === 'mesh') {
    return true;
  }
  return false;
}

export function isValidRoomName(name) {
  return /^[0-9a-z_-]{4,32}$/.test(name);
}
