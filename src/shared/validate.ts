export function isValidRoomType(type: string): boolean {
  if (type === "sfu" || type === "mesh") {
    return true;
  }
  return false;
}

export const maxRoomNameLength = 16;
export const roomNameRe = "^[0-9a-z_-]{4,16}$";
export function isValidRoomName(name: string): boolean {
  return new RegExp(roomNameRe).test(name);
}
