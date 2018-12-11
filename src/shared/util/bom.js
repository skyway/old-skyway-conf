function getOsName(ua) {
  switch (true) {
    case /Android/.test(ua):
      return 'Android';
    case /iPhone|iPad|iPod/.test(ua):
      return 'iOS';
    case /Windows/.test(ua):
      return 'Windows';
    case /Mac OS X/.test(ua):
      return 'Mac';
    case /Linux/.test(ua):
      return 'Linux';
    case /CrOS/.test(ua):
      return 'CromeOS';
    case /Firefox/.test(ua):
      return 'FirefoxOS';
    default:
      return '';
  }
}

function getBrowserName(ua) {
  switch (true) {
    case /CriOS/.test(ua):
      return 'iOSChrome';
    case /Edge/.test(ua):
      return 'Edge';
    case /Chrome/.test(ua):
      return 'Chrome';
    case /Firefox/.test(ua):
      return 'Firefox';
    case /MSIE|Trident/.test(ua):
      return 'IE';
    case /Safari\//.test(ua):
      return 'Safari';
    case /AppleWebKit/.test(ua):
      return 'Webkit';
    default:
      return '';
  }
}

let ctx = null;
function getAudioCtx(global) {
  if (ctx !== null) {
    return ctx;
  }

  const audioCtx = new (global.webkitAudioContext || global.AudioContext)();
  ctx = audioCtx;
  return ctx;
}

function setLocationHref(url) {
  location.href = url;
}

export default {
  getOsName,
  getBrowserName,
  getAudioCtx,
  setLocationHref,
};
