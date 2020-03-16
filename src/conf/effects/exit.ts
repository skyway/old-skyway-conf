import debug from "debug";
const log = debug("effect:exit");

export const exitRoom = () => () => {
  log("exitRoom()");

  const yes = confirm("Are you sure to exit?");
  if (!yes) {
    log("canceled");
    return;
  }

  location.href = "/index.html";
};
