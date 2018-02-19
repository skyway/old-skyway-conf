import { extendObservable } from 'mobx';
import util from '../../shared/util';

class UiStore {
  constructor() {
    extendObservable(this, {
      roomType: '',
      roomName: '',

      isAppReady: false,

      isSettingOpen: true,
      isInviteOpen: false,
      isChatOpen: false,
      isRoomJoin: false,
      isScreenSharing: false,
      isScreenShareIntroOpen: false,

      isUserError: false,
      isAppError: false,

      get confUrl() {
        const hash = `#!/${this.roomType}/${this.roomName}`;
        return `${location.origin}${location.pathname}${hash}`;
      },
      get isError() {
        return this.isUserError || this.isAppError;
      },
    });
  }

  setRoom({ roomType, roomName }) {
    if (!util.isValidRoomName(roomName) || !util.isValidRoomType(roomType)) {
      this.isUserError = true;
      return;
    }

    this.roomType = roomType;
    this.roomName = roomName;
  }

  handleGetUserMediaError(err) {
    switch (err.name) {
      case 'OverconstrainedError':
      case 'NotFoundError':
        this.isAppError = true;
        break;
      default:
        this.isUserError = true;
    }
    console.error(err);
  }

  handleAppError(err) {
    this.isAppError = true;
    console.error(err);
  }

  handleUserError(err) {
    this.isUserError = true;
    console.error(err);
  }
}

export default UiStore;
