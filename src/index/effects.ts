export function enterConference(roomType: string, roomName: string) {
  location.href = `conf.html/#!/${roomType}/${roomName}`;
}
