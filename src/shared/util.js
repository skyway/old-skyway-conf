function isValidRoomType(type) {
  if (type === 'sfu' || type === 'mesh') {
    return true;
  }
  return false;
}

function isValidRoomName(name) {
  return /^[0-9a-z_-]{4,32}$/.test(name);
}

function supportOs(ua) {
  switch (true) {
    case /Android/.test(ua):
      return false;
    case /iPhone|iPad|iPod/.test(ua):
      return false;
    case /Windows/.test(ua):
      return true;
    case /Mac OS X/.test(ua):
      return true;
    case /CrOS/.test(ua):
      return false;
    case /Firefox/.test(ua):
      return false;
    default:
      return false;
  }
}

function supportBrowser(ua) {
  switch (true) {
    case /CriOS/.test(ua):
      return false;
    case /Edge/.test(ua):
      return false;
    case /Chrome/.test(ua):
      return true;
    case /Firefox/.test(ua):
      return true;
    case /MSIE|Trident/.test(ua):
      return false;
    case /Safari\//.test(ua):
      return false;
    case /AppleWebKit/.test(ua):
      return false;
    default:
      return false;
  }
}

export default {
  isValidRoomType,
  isValidRoomName,
  supportOs,
  supportBrowser,
};
