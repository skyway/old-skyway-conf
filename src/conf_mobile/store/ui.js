import { decorate, observable, computed } from 'mobx';
import { isValidRoomName, isValidRoomType } from '../../shared/util/validate';

class UiStore {
  constructor() {
    this.roomType = '';
    this.roomName = '';

    this.isAppReady = false;

    this.isWelcomeOpen = true;
    this.isSettingOpen = true;
    this.isChatOpen = false;
    this.isRoomJoin = false;

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

  setRoom({ roomType, roomName }) {
    if (!isValidRoomName(roomName) || !isValidRoomType(roomType)) {
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

decorate(UiStore, {
  roomType: observable,
  roomName: observable,
  isAppReady: observable,
  isWelcomeOpen: observable,
  isSettingOpen: observable,
  isChatOpen: observable,
  isRoomJoin: observable,
  isUserError: observable,
  isAppError: observable,
  confUrl: computed,
  isError: computed,
});
export default UiStore;
