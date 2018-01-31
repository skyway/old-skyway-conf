function isSupported(ua) {
  switch (true) {
    case /Edge/.test(ua):
      return false;
    case /Chrome/.test(ua):
      return true;
    case /Firefox/.test(ua):
      return true;
    case /Safari\//.test(ua):
      return false;
    default:
      return false;
  }
}

export default {
  isSupported,
};
