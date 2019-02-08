import { decorate, observable, computed } from 'mobx';
import validate from '../../shared/util/validate';

class UiStore {
  constructor() {
    this.roomType = '';
    this.roomName = '';

    this.isAppReady = false;

    this.isSettingOpen = true;
    this.isInviteOpen = false;
    this.isChatOpen = false;
    this.isChatSending = false;
    this.isRoomJoin = false;
    this.isScreenSharing = false;
    this.isScreenShareIntroOpen = false;

    // only for Firefox
    this.isFirefoxAndScreenShareTriggerNeeded = false;
    this.isScreenShareTriggerOpen = false;

    this.isUserError = false;
    this.isAppError = false;
  }

  get confUrl() {
    const hash = `#!/${this.roomType}/${this.roomName}`;
    return `${location.origin}${location.pathname}${hash}`;
  }

  get isError() {
    return this.isUserError || this.isAppError;
  }

  setRoom({ roomType, roomName, isFirefoxAndScreenShareTriggerNeeded }) {
    if (
      !validate.isValidRoomName(roomName) ||
      !validate.isValidRoomType(roomType)
    ) {
      this.isUserError = true;
      return;
    }

    this.roomType = roomType;
    this.roomName = roomName;
    this.isFirefoxAndScreenShareTriggerNeeded = isFirefoxAndScreenShareTriggerNeeded;
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

decorate(UiStore, {
  roomType: observable,
  roomName: observable,
  isAppReady: observable,
  isSettingOpen: observable,
  isInviteOpen: observable,
  isChatOpen: observable,
  isChatSending: observable,
  isRoomJoin: observable,
  isScreenSharing: observable,
  isScreenShareIntroOpen: observable,
  isFirefoxAndScreenShareTriggerNeeded: observable,
  isScreenShareTriggerOpen: observable,
  isUserError: observable,
  isAppError: observable,
  confUrl: computed,
  isError: computed,
});
export default UiStore;
