function RoomAction({ uiStore }) {
  return {
    onBoot() {
      console.log(uiStore);
    },
  };
}

export default RoomAction;
